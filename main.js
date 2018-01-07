import 'babel-polyfill'
import 'whatwg-fetch'

import React from 'react'
import ReactDOM from 'react-dom'
import FastClick from 'fastclick'
import { Provider } from 'react-redux'

import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

// material-ui related import, dark theme
import injectTapEventPlugin from 'react-tap-event-plugin'

import store from './store'
import routes from './routes'

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()


ReactDOM.render(
  <Provider store={store}>
    {/*<MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>*/}
      <Router history={history} routes={routes()}></Router>
    {/*</MuiThemeProvider>*/}
  </Provider>,
  document.getElementById('container')
)

// Eliminates the 300ms delay between a physical tap
// and the firing of a click event on mobile browsers
// https://github.com/ftlabs/fastclick
FastClick.attach(document.body)

// Enable Hot Module Replacement (HMR)
// if (module.hot) {
//   module.hot.accept('./routes.json', () => {
//     routes = require('./routes.json') // eslint-disable-line global-require
//     render(history.getCurrentLocation())
//   });
// }
