import axios from 'axios'
import { Base64 } from 'js-base64'
import fm from 'front-matter'

/** 从github调用并在本地缓存期刊内容，返回Promise。主要函数：
 * getContent: 调取特定期刊特定内容。如获取第1期“心智”子栏目中第2篇文章正文：getContent(['1', '心智', '2', 'article.md'])。
 * getCurrentIssue: 获取最新期刊号，无需参数。
 * getAbstracts: 获取所有文章简介，需要提供期刊号。
 */
class Issues {
  /**
   * 建立新期刊instance.
   * @param {string} owner - github项目有所有者
   * @param {string} PerspicereContent - github项目名称
   * @param {array} columns - 各子栏目列表
   */
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

  // parse responce, returns an object
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

  // locate leaf note in a tree
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

  /**
   * 调用期刊内容.
   * @param {string} location - 内容位置，描述目标repo文档结构。例如第1期“心智”子栏目中第2篇文章正文：['1', '心智', '2', 'article.md']。
   * @return {object} 目标内容
   */
  getContent = async location => {
    let contentNode = Issues.locateLeaf(this.content, location) || {}
    if (Object.keys(contentNode).length === 0 && contentNode.constructor === Object) {
      const data = await this.pullContent(location.join('/'))
      contentNode = Issues.parseData(data)
      this.content = Issues.appendLeaf(this.content, location, contentNode)
    }
    return contentNode
  }

  /**
   * 获取最新期刊号。
   * @return {int} 最新期刊号。
   */
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

  /**
   * 获取期刊所有文章简介。
   * @param {int} issue - 期刊号。
   * @return {object} 该期所有文章简介。
   */
  getAbstracts = async issue => {
    console.log('getAbstracts')
    // 默认获取最新一期
    let issueNumber = issue
    if (!issue) {
      issueNumber = await this.getCurrentIssue()
    }

    // 本期信息
    const meta = await this.getContent([issueNumber, 'meta.json'])

    const contents = await Promise.all(
      // 各栏目
      this.columns.map(async col => {
        // 栏目文章列表
        const colTable = await this.getContent([issueNumber, col])
        const items = await Promise.all(
          // 各文章元信息
          Object.keys(colTable).map(async article => {
            const source = await this.getContent([issueNumber, col, article, 'article.md'])
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
