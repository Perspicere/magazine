import React, { PropTypes } from 'react'

import Layout from '../../components/Layout'
// import TopicEntry from '../../components/TopicEntry'
import s from './styles.css'

export default class HomePage extends React.Component {

  static propTypes = {
    articles: PropTypes.array.isRequired,
  }

  constructor(...args) {
    super(...args)

    this.state = {
      showMenu: false,
    }

    this.toggleMenu = this.toggleMenu.bind(this)
  }
  getStyles() {
    return {
      imageContainer: {
        height: 295,
      },
      image: {
        maxWidth: '100%',
      },
    }
  }
  toggleMenu() {
    this.setState({ showMenu: !this.state.showMenu })
    console.log('menu toggled')
  }
  render() {
    console.log(this.props)

    const {
      title,
      welcome,
      description,
      mainImg,
      contents,

    } = this.props

    const styles = this.getStyles()
    return (
      <div>
        <Layout
          mainImg={mainImg}
          toggleMenu={this.toggleMenu}
        >
          <div style={styles.imageContainer}>
            <img src={mainImg} style={styles.image} />
          </div>

        </Layout>
      </div>
    )
  }

}
