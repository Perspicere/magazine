// external import
import React from 'react'
import PropTypes from 'prop-types'

import Headroom from 'react-headroom'

// local import
import Menu from './Menu'
import styles from './styles.js'

const Header = ({ showNavigation, common, header }) => (
  <Headroom style={styles.TopBar}>
    <div style={styles.title}> {header.title || common.name}</div>
    <div onClick={showNavigation} style={styles.menuIcon}>
      <Menu height="40px" width="40px" stroke="black" strokeWidth="1" />
    </div>
  </Headroom>
)

Header.propTypes = {
  showNavigation: PropTypes.func
}

export default Header
