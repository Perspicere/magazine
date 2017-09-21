import React, { PropTypes } from 'react'

import Layout from '../../components/Layout'
import TopicEntry from '../../components/TopicEntry'
import s from './styles.css'
import { title, html } from './index.md'

import mainImg from '../../docs/卷首语/1.jpg'

class HomePage extends React.Component {

  static propTypes = {
    articles: PropTypes.array.isRequired,
  }

  constructor(...args) {
    super(...args)

    this.state = {
      showMenu: false
    }

    this._toggleMenu = this._toggleMenu.bind(this)
  }

  _toggleMenu() {
    this.setState({showMenu: !this.state.showMenu})
    console.log('menu toggled')
  }

  render() {
    return (
      <div>
        <Layout
          mainImg={mainImg}
          toggleMenu={this._toggleMenu}
        >
          <div dangerouslySetInnerHTML={{ __html: html }} />
          <h4>Articles</h4>
          <ul>
            {this.props.articles.map((article, i) =>
              <li key={i}><a href={article.url}>{article.title}</a> by {article.author}</li>
            )}
          </ul>
          <p>
            <br /><br />
          </p>
        </Layout>
      </div>
    )
  }

}

export default HomePage;
