// external import
import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

// local import
import Header from './Header'
// import Footer from '../Footer'
import styles from './styles.js'

import Navigation from '../navigation'

export default class Layout extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.object,

  }

  render() {
    const { toggleMenu } = this.props
    return (
      <div style={styles.layoutWrap}>
        <div style={styles.LayoutContainer} className={this.props.className || ''}>
          <Header
            toggleMenu={toggleMenu}
          />
          { this.props.children }
        </div>


        <Navigation/>
      </div>

    )
  }
}
