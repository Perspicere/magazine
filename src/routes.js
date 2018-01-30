import React, {PropTypes} from 'react'
import {Route, IndexRoute} from 'react-router'

// todo 组件数目若太多改为按需加载？
import Home from './pages/home'
import About from './pages/about'
import Articles from './pages/articles'

export default function router() {
  return (<Route>
      <Route path="/" component={Home}  />
      <Route path="/about" component={About}  />
      <Route path="/articles/:module/:name" component={Articles}  />
    </Route>
  )
}
