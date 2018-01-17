// external
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { routerReducer } from 'react-router-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import promiseMiddleware from 'redux-promise-middleware'
// local
import { common, issues, header, journalOne, navigation } from './reducers'

const appReducer = combineReducers({
  common,
  header,
  navigation,
  issues,
  journalOne,
  routing: routerReducer
})

const store = createStore(appReducer, composeWithDevTools(applyMiddleware(promiseMiddleware())))
export default store
