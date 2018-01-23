// external imports
import axios from 'axios'
import { Base64 } from 'js-base64'
import path from 'path'
import fm from 'front-matter'
// local imports
import zipObject from '../zipObject'
import { decode } from 'punycode'

/** 从github调用并在本地缓存期刊内容，返回Promise。主要函数：
 * getContent: 调取特定期刊特定内容。如获取第1期“心智”子栏目中第2篇文章正文：getContent(['issues', '1', '心智', '2', 'article.md'])。
 * getCurrentIssue: 获取最新期刊号，无需参数。
 * getAbstracts: 获取所有文章简介，需要提供期刊号。
 */
class magazineStorage {
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

    // grap local storage
    this.storage = window.localStorage

    // keys to be replaced with content
    this.fileReplace = ['img', 'image']

    // github api
    this.github = axios.create({
      baseURL: 'https://api.github.com/',
      auth: {
        username: 'guoliu',
        password: '21c42382124aa13ea39a64d554617b19893ad9fa'
      },
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

  // cache content to local storage
  set content(tree) {
    this.storage.setItem('content', JSON.stringify(tree))
  }

  // get current issue number from local storage
  get currentIssue() {
    return this.storage.getItem('currentIssue')
  }

  // cache current issue number
  set currentIssue(issue) {
    this.storage.setItem('currentIssue', issue)
  }

  // parse responce, returns an object
  static parseData(data) {
    if (!data) {
      return null
    }

    // if we get an array, parse every element
    if (data.constructor === Array) {
      return data.reduce(
        (accumulated, current) => ({
          ...accumulated,
          [current.name]: magazineStorage.parseData(current)
        }),
        {}
      )
    }

    if (data.content) {
      const ext = path.extname(data.path)
      const content = Base64.decode(data.content)
      if (ext === '.md') {
        // if it's a markdown file, we need to parse it and get the meta info
        const { attributes, body } = fm(content)
        return {
          ...attributes,
          body
        }
      } else if (ext === '.json') {
        // if it's a json, parse it
        return JSON.parse(content)
      }
      return content
    } else if (data.type === 'dir') {
      // if we get a directory
      return {}
    }
    return null
  }

  // locate leaf note in a tree
  static locateLeaf(tree, location) {
    if (location.length === 0) {
      return tree
    }
    try {
      return magazineStorage.locateLeaf(tree[location[0]], location.slice(1))
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
      [location[0]]: magazineStorage.appendLeaf(tree[location[0]], location.slice(1), leaf)
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
   * @param {string} location - 内容位置，描述目标文档位置。例如第1期“心智”子栏目中第2篇文章正文：['issues', '1', '心智', '2', 'article.md']。
   * @return {object} 目标内容
   */
  getContent = async location => {
    // 尝试从本地获取
    let contentNode = magazineStorage.locateLeaf(this.content, location) || {}
    // 本地无值，从远程调用
    if (contentNode.constructor === Object && Object.keys(contentNode).length === 0) {
      const data = await this.pullContent(path.join(...location))
      contentNode = magazineStorage.parseData(data)
      const nodeFields = Object.keys(contentNode)

      // 将json中路径替换为文件内容，例如图片
      if (contentNode.constructor === Object && nodeFields.length > 0) {
        const replaceFields = nodeFields.filter(field => this.fileReplace.includes(field))
        const fileContents = await Promise.all(
          replaceFields.map(field => this.getContent([...location.slice(0, -1), field]))
        )
        contentNode = { ...contentNode, ...zipObject(replaceFields, fileContents) }
      }
      this.content = magazineStorage.appendLeaf(this.content, location, contentNode)
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
        const data = await this.getContent(['issues'])
        this.currentIssue = Object.keys(data)
          .filter(
            entry => data[entry] && data[entry].constructor === Object // is a directory
          )
          .reduce((a, b) => Math.max(parseInt(a), parseInt(b)))
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
  getIssueAbstract = async issue => {
    // 默认获取最新一期
    let issueNumber = issue
    if (!issue) {
      issueNumber = await this.getCurrentIssue()
    }

    const issueContent = await Promise.all(
      this.columns.map(async column => {
        // 栏目文章列表
        const articleList = Object.keys(await this.getContent(['issues', issueNumber, column]))
        // 各文章元信息
        const columnContent = await Promise.all(
          articleList.map(article => this.getContent(['issues', issueNumber, column, article, 'article.md']))
        )
        return zipObject(articleList, columnContent)
      })
    )
    // 各栏目

    // 本期信息
    const meta = await this.getContent(['issues', issueNumber, 'meta.json'])

    return {
      ...meta,
      content: zipObject(this.columns, issueContent)
    }
  }

  /**
   * 获取期刊所有单篇文章。
   * @return {object} 所有单篇文章。
   * TODO: 仅返回一定数量各子栏目最新文章
   */
  getArticleAbstract = async () => {
    // 各栏目
    const articlesContent = await Promise.all(
      this.columns.map(async column => {
        // 栏目文章列表
        const articleList = Object.keys(await this.getContent(['articles', column]))
        // 各文章元信息
        const columnContent = await Promise.all(
          articleList.map(article => this.getContent(['articles', column, article, 'article.md']))
        )
        return zipObject(articleList, columnContent)
      })
    )
    return zipObject(this.columns, articlesContent)
  }
}

export default new magazineStorage()
