import React from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'

import { connect } from 'react-redux'

import Layout from '../layout'
import { Loader } from '../../components'
import styles from './styles.css'

class DetailPage extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired
  }

  componentDidMount() {
    const { createArticleAction, article, match, body, fetching } = this.props

    const regex = new RegExp(`\/?${process.env.PUBLIC_URL}\/?`)
    const articlePath = match.url.replace(regex, '/')
    if (!body && !fetching) {
      createArticleAction([articlePath, 'article.md'])
    }
  }

  render() {
    const { module, name, fetching, body, title } = this.props

    if (fetching || !body) {
      return <Loader />
    }

    return (
      <Layout className="articles-detail">
        <div className={styles.markdownWrap}>
          <h1 className={styles.h1}>{title}</h1>
          <ReactMarkdown source={body} />
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
