import { magazineStorage } from './utils'
import types from './types'

const createArticleAction = location => {
  return {
    type: types.ARTICLE,
    payload: magazineStorage.getContent(location)
  }
}

export default createArticleAction
