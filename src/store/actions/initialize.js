import { magazineStorage, objectPromiseAll } from './utils'
import types from './types'

const initialize = () => {
  return {
    type: types.INITIALIZE,
    payload: objectPromiseAll({
      issue: magazineStorage.getIssueAbstract(),
      articles: magazineStorage.getArticleAbstract()
    })
  }
}

export default initialize
