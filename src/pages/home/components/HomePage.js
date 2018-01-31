import React from 'react'
import PropTypes from 'prop-types'
import Layout from '../../layout'
import Loader from './Loader'
// import TopicEntry from '../../components/TopicEntry'

import Instruction from './Instruction'
import SubjectBanner from './SubjectBanner'
import ArticleCover from './ArticleCover'
import styles from './styles'

export default class HomePage extends React.Component {
  static propTypes = {
    // articles: PropTypes.array.isRequired,
  }

  constructor(...args) {
    super(...args)

    this.state = {
      showMenu: false
    }
  }

  componentWillMount() {
    const { initialize, content } = this.props
    const { fetching, issue, articles } = content
    if (!(fetching || (issue && articles))) {
      initialize()
    }
  }

  render() {
    const { title, welcome, description, mainImg, content } = this.props
    const { issue, articles } = content
    if (content.fetching || !issue || !articles) {
      return (
        <div>
          <Layout>
            <div style={styles.loaderContainer}>
              <Loader />
            </div>
          </Layout>
        </div>
      )
    }

    const articleColumns = Object.keys(articles)
    const issueColumns = Object.keys(issue.content)

    return (
      <div>
        <Layout>
          <div>
            {articleColumns.map(column => (
              <div key={`articles-${column}`}>
                <SubjectBanner {...{ lText: column[0], rText: column[1] }} />

                {Object.keys(articles[column]).map(article => {
                  return <ArticleCover key={`articles-${column}-${article}`} {...articles[column][article]} />
                })}
              </div>
            ))}
          </div>

          <div>
            <div style={styles.imageContainer}>
              <img src={mainImg} style={styles.image} />
            </div>

            <Instruction {...{ title, welcome, description, mainImg }} />
          </div>

          <div>
            {issueColumns.map(column => (
              <div key={`issue-${column}`}>
                <SubjectBanner {...{ lText: column[0], rText: column[1] }} />

                {Object.keys(issue.content[column]).map(article => {
                  return <ArticleCover key={`issue-${column}-${article}`} {...issue.content[column][article]} />
                })}
              </div>
            ))}
          </div>
        </Layout>
      </div>
    )
  }
}
