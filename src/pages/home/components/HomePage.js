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
    const { title, welcome, description, mainImg, contents, content } = this.props
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

    const columns = Object.keys(articles)

    return (
      <div>
        <Layout>
          <div>
            {columns.map(column => (
              <div key={`articles-${column}`}>
                <SubjectBanner {...{ lText: column[0], rText: column[1] }} />

                {Object.keys(articles[column]).map(article => {
                  return <ArticleCover key={`articles-${column}-${article}`} {...articles[column][article]} />
                })}
              </div>
            ))}
          </div>

          <div style={styles.imageContainer}>
            <img src={mainImg} style={styles.image} />
          </div>

          <Instruction {...{ title, welcome, description, mainImg }} />

          {contents.map(group => {
            const chars = group.name.split('')

            return (
              <div key={group.name}>
                <SubjectBanner {...{ lText: chars[0], rText: chars[1] }} />

                {group.items.map(article => {
                  return <ArticleCover key={article.title} {...article} />
                })}
              </div>
            )
          })}
        </Layout>
      </div>
    )
  }
}
