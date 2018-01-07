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
    children: PropTypes.object,

  }

  render() {
    console.log(this.props)
    return (
      <div style={styles.layoutWrap}>
        <Header/>
        <div style={styles.LayoutContainer} className={this.props.className || ''}>
          { this.props.children }
        </div>
        <Navigation/>
      </div>

    )
  }
}

