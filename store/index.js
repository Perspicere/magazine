
import { createStore, combineReducers } from 'redux'

// 通用
import common from './common/common'
import navigation from './common/navigation'

// 每个期刊一个目录
import journalOne from './journalOne'

const appReducer = combineReducers({
  common,
  navigation,
  journalOne,
})


const store = createStore(
  appReducer,
  window.devToolsExtension ? window.devToolsExtension() : f => f
)

export default store
