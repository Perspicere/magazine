import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'

import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

import store from './store'

// todo 组件数目若太多改为按需加载？
import Home from './pages/home'
import About from './pages/about'
import Articles from './pages/articles'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Route path="/" component={Home}  />
        <Route path="/about" component={About}  />
        <Route path="/articles/:module/:name" component={Articles}  />
      </div>
    </BrowserRouter>
  </Provider>, document.getElementById('root'))
registerServiceWorker()
