import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import Layout from '../layout'
import styles from './styles.css'

class DetailPage extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired
  }

  componentDidMount() {
    const { createArticleAction, article, match } = this.props
    // const { fetching, issue, ...rest } = article
    if (!article) {
      createArticleAction([match.url, 'article.md'])
    }
    console.log({ match })
  }

  render() {
    const { module, name, article, match } = this.props

    // 动态加载？
    const title = 'test title'
    const html = '<div> test </div>'

    console.log(this.props)

    return (
      <Layout className="articles-detail">
        <div className={styles.markdownWrap}>
          <h1 className={styles.h1}>{title}</h1>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </Layout>
    )
  }
}

const mapStateToProps = state => {
  const { common } = state
  return {
    common
  }
}

export default connect(mapStateToProps)(DetailPage)
