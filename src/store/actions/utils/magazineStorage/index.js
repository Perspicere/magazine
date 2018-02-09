// external imports
import axios from 'axios'
import { Base64 } from 'js-base64'
import path from 'path'
import fm from 'front-matter'
// local imports
import zipObject from '../zipObject'
import decrypt from '../decrypt'

/** 从github调用并在本地缓存期刊内容，返回Promise。主要函数：
 * getContent: 调取特定期刊特定内容。如获取第1期“心智”子栏目中第2篇文章正文：getContent(['issues', '1', '心智', '2', 'article.md'])。
 * getCurrentIssue: 获取最新期刊号，无需参数。
 * getAbstracts: 获取所有文章简介，需要提供期刊号。
 */
class magazineStorage {
  /**
   * 建立新期刊instance.
   * @param {string} owner - github项目有所有者
   * @param {string} repo - github项目名称
   * @param {array} columns - 各子栏目列表
   */
  constructor(owner = 'Perspicere', repo = 'PerspicereContent', columns = ['心智', '此岸', '梦境']) {
    // github account settings
    this.owner = owner
    this.repo = repo

    // array of submodules
    this.columns = columns

    // grap window storage
    this.storage = window.sessionStorage

    // keys to be replaced with content
    this.urlReplace = ['img', 'image']

    // github api
    this.baseURL = 'https://api.github.com/'

    // github api
    // github 禁止使用明文储存access token，此处使用加密token
    // 新生成token之后可以通过encrypt函数加密
    // TODO: use OAuth?
    this.github = axios.create({
      baseURL: this.baseURL,
      auth: {
        username: 'guoliu',
        password: decrypt(
          '6a1975233d2505057cfced9c0c847f9c99f97f8f54df8f4cd90d4d3949d8dff02afdac79c3dec4a9135fad4a474f8288'
        )
      },
      timeout: 10000
    })
  }

  // get content from local storage
  // 总数据大小如果超过5mb限制，需要优化存储
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

  // build url for image
  imageURL = location => `https://github.com/${this.owner}/${this.repo}/raw/master/${path.join(...location)}`

  // pull content from github with given path
  pullContent = async location => {
    try {
      const res = await this.github.get(`/repos/${this.owner}/${this.repo}/contents/${path.join(...location)}`)
      return res.data
    } catch (err) {
      console.warn(`Error pulling data from [${location.join(', ')}], null value will be returned instead`, err)
      return null
    }
  }

  // parse responce, returns an object
  parseData = data => {
    if (!data) {
      return null
    }

    // if we get an array, parse every element
    if (data.constructor === Array) {
      return data.reduce(
        (accumulated, current) => ({
          ...accumulated,
          [current.name]: this.parseData(current)
        }),
        {}
      )
    }

    if (data.content) {
      const ext = path.extname(data.path)
      const content = Base64.decode(data.content)
      // if it's a markdown file, parse it and get meta info
      if (ext === '.md') {
        const { attributes, body } = fm(content)
        // replace image paths
        const bodyWithUrl = body.replace(
          /(!\[.*?\]\()(.*)(\)\s)/,
          (_, prev, url, post) => `${prev}${this.imageURL([...data.path.split('/').slice(0, -1), url])}${post}`
        )
        return {
          ...attributes,
          body: bodyWithUrl
        }
      }

      if (ext === '.json') {
        // if it's a json, parse it
        return JSON.parse(content)
      }
      return content
    }

    if (data.type === 'dir') {
      // if we get a directory
      return {}
    }

    return null
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
      const data = await this.pullContent(location)
      contentNode = this.parseData(data)

      // 将json中路径替换为url，例如图片
      if (contentNode && contentNode.constructor === Object && Object.keys(contentNode).length > 0) {
        const URLkeys = Object.keys(contentNode).filter(field => this.urlReplace.includes(field))
        const URLs = URLkeys.map(key => this.imageURL([...location.slice(0, -1), contentNode[key]]))
        contentNode = { ...contentNode, ...zipObject(URLkeys, URLs) }
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
    if (!this.currentIssue) {
      const data = await this.getContent(['issues'])
      this.currentIssue = Object.keys(data)
        .filter(
          entry => data[entry] && data[entry].constructor === Object // is a directory
        )
        .reduce((a, b) => Math.max(parseInt(a), parseInt(b)))
    }
    return this.currentIssue
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
        const articleList = Object.keys((await this.getContent(['articles', column])) || {})
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
