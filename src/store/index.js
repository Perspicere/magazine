// external
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
// import { routerReducer } from 'react-router-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import promiseMiddleware from 'redux-promise-middleware'
// local
import { types as actionTypes } from './actions'
import { common, createContentReducer, header, journalOne, navigation } from './reducers'

const appReducer = combineReducers({
  common,
  header,
  navigation,
  journalOne,
  // routing: routerReducer,
  content: createContentReducer(actionTypes.INITIALIZE),
  article: createContentReducer(actionTypes.ARTICLE)
})

const store = createStore(appReducer, composeWithDevTools(applyMiddleware(promiseMiddleware())))
export default store
