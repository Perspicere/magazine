/*
调用并储存期刊内容
*/

import axios from 'axios'
import { Base64 } from 'js-base64'
import fm from 'front-matter'

class Issues {
  constructor(owner = 'Perspicere', repo = 'PerspicereContent', columns = ['心智', '此岸', '梦境']) {
    // github account settings
    this.owner = owner
    this.repo = repo

    // array of submodules
    this.columns = columns

    // get local storage
    this.storage = window.localStorage

    // github api
    this.github = axios.create({
      baseURL: 'https://api.github.com/',
      timeout: 10000
    })
  }

  // get content from local storage
  get content() {
    let content = this.storage.getItem('content')
    if (!content) {
      return {}
    }
    return JSON.parse(content)
  }

  // store content to local storage
  set content(tree) {
    this.storage.setItem('content', JSON.stringify(tree))
  }

  // helper function to parse responce, returns an object
  static parseData(data) {
    if (data.constructor === Array) {
      return data.reduce(
        (accumulated, current) => ({
          ...accumulated,
          [current.name]: Issues.parseData(current)
        }),
        {}
      )
    }

    let content = null
    if (data.content) {
      try {
        // try parsing it as json
        content = JSON.parse(Base64.decode(data.content))
      } catch (err) {
        // if not simply decode data
        content = Base64.decode(data.content)
      }
    } else if (data.type === 'dir') {
      // if we get a directory
      content = {}
    }

    return content
  }

  // helper function to location leaf note in a tree
  static locateLeaf(tree, location) {
    if (location.length === 0) {
      return tree
    }
    try {
      return Issues.locateLeaf(tree[location[0]], location.slice(1))
    } catch (err) {
      return null
    }
  }

  // helper function to return tree with an extra leaf node
  static appendLeaf(tree, location, leaf) {
    if (location.length === 0) {
      return leaf
    } else if (!tree) {
      tree = {}
    }

    return {
      ...tree,
      [location[0]]: Issues.appendLeaf(tree[location[0]], location.slice(1), leaf)
    }
  }

  // pull content from github with given path
  pullContent = async path => {
    try {
      const res = await this.github.get(`/repos/${this.owner}/${this.repo}/contents/${path}`)
      return res.data
    } catch (err) {
      console.log(err)
    }
  }

  // Get content from self. Pull and store if not available.
  getContent = async location => {
    let contentNode = Issues.locateLeaf(this.content, location) || {}
    if (Object.keys(contentNode).length === 0 && contentNode.constructor === Object) {
      const data = await this.pullContent(location.join('/'))
      contentNode = Issues.parseData(data)
      this.content = Issues.appendLeaf(this.content, location, contentNode)
    }
    return contentNode
  }

  // 获取最新期刊号
  getCurrentIssue = async () => {
    try {
      if (!this.currentIssue) {
        const data = await this.getContent([])
        this.currentIssue = Object.keys(data)
          .filter(
            entry => data[entry] && data[entry].constructor === Object // is a directory
          )
          .reduce((a, b) => Math.max(parseInt(a.name), parseInt(b.name)))
      }
      return this.currentIssue
    } catch (err) {
      console.log(err)
    }
  }

  // 获取期刊信息
  getAbstracts = async issue => {
    // 本期信息
    const meta = await this.getContent([issue, 'meta.json'])

    const contents = await Promise.all(
      // 各栏目
      this.columns.map(async col => {
        // 栏目文章列表
        const colTable = await this.getContent([issue, col])
        const items = await Promise.all(
          // 各文章元信息
          Object.keys(colTable).map(async article => {
            const source = await this.getContent([issue, col, article, 'article.md'])
            return fm(source).attributes
          })
        )
        return {
          name: col,
          items
        }
      })
    )

    return {
      ...meta,
      contents
    }
  }
}

export default Issues
