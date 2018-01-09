// external import
import React from 'react'
import PropTypes from 'prop-types'
// import cx from 'classnames'

import Header from '../header'
// import Footer from '../Footer'
import styles from './styles.js'
import Navigation from '../navigation'

export default class Layout extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.object
  }

  render() {
    return (
      <div style={styles.layoutWrap} id="outer-container">
        <Navigation />

        <div id="page-wrap" style={styles.LayoutContainer} className={this.props.className || ''}>
          <Header />
          {this.props.children}
        </div>
      </div>
    )
  }
}
