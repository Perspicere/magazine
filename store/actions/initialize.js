import { issues } from './utils'
import types from './types'
import store from '..'

const initialize = () => {
  store.dispatch({
    type: types.INITIALIZE,
    payload: issues.getAbstracts()
  })
}

export default initialize
