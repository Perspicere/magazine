import { magazineStorage } from './utils'
import store from '..'
import types from './types'

const initialize = () => {
  return {
    type: types.INITIALIZE,
    payload: Promise.all([magazineStorage.getCurrentIssue(), magazineStorage.getAbstracts()])
  }
}

export default initialize
