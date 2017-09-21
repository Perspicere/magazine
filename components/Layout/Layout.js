// external import
import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

// local import
import Header from './Header'
import Footer from '../Footer'
import styles from './styles.js'



class Layout extends React.Component {

  static propTypes = {
    mainImg: PropTypes.string,
    toggleMenu: PropTypes.func,
    issueNumber: PropTypes.string,
    issueTitle: PropTypes.string,
    issueDisc: PropTypes.string,
  }

  render() {
    const { mainImg, toggleMenu } = this.props
    return (
      <div style={styles.LayoutContainer}>
        <Header
          toggleMenu={toggleMenu}
        />
        <div style={styles.imageContainer}>
          <img src={mainImg} style={styles.image}/>
        </div>
      </div>
    )
  }
}

export default Layout
