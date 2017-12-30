import 'babel-polyfill'
import 'whatwg-fetch'

import React from 'react'
import ReactDOM from 'react-dom'
import FastClick from 'fastclick'
import { Provider } from 'react-redux'

import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import store from './store'
// import router from './core/router'
// import history from './core/history'

import Home from './pages/home'
import Error from './pages/error'

// material-ui related import, dark theme
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'


// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

import routes from './routes'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()


ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
      <Router history={history} routes={routes()}>


      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('container')
)


// let routes = require('./routes.json') // Loaded with utils/routes-loader.js
// const container = document.getElementById('container')
//
// // Wrapped with material-ui darkBaseTheme
// function renderComponent(component) {
//   ReactDOM.render(
//     <Provider store={store}>
//       <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
//         {component}
//       </MuiThemeProvider>
//     </Provider>,
//   container)
// }

// Find and render a web page matching the current URL path,
// if such page is not found then render an error page (see routes.json, core/router.js)
// function render(location) {
//   router.resolve(routes, location)
//     .then(renderComponent)
//     .catch(error => router.resolve(routes, { ...location, error }).then(renderComponent));
// }

// Handle client-side navigation by using HTML5 History API
// For more information visit https://github.com/ReactJSTraining/history/tree/master/docs#readme
// history.listen(render);
// render(history.getCurrentLocation())

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
