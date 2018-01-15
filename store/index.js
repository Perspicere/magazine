import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { routerReducer } from 'react-router-redux'
import promiseMiddleware from 'redux-promise-middleware'

// 通用
import common from './common'
import header from './header'

import navigation from './navigation'

// 每个期刊一个目录
import journalOne from './journalOne'
import issues from './issues'

const appReducer = combineReducers({
  common,
  header,
  navigation,
  journalOne,
  routing: routerReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(appReducer, { loading: true }, composeEnhancers(applyMiddleware(promiseMiddleware)))
console.log({ state: store.getState() })
export default store
