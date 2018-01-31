import { connect } from 'react-redux'
import DetailPage from './DetailPage'
import React from 'react'
import { Route } from 'react-router-dom'

import { createArticleAction } from '../../store/actions'

const article = () => (
  <Route path="/articles/:article" component={connect(state => state.article, { createArticleAction })(DetailPage)} />
)

export default article
