// external import
import React from 'react'
import PropTypes from 'prop-types'

import Headroom from 'react-headroom'

// local import
// import Link from '../Link'
import styles from './styles.js'


const Header = ({ showNavigation, common, header }) => (
  <Headroom style={styles.TopBar}>
    <div style={styles.title}> {header.title || common.name}</div>
  </Headroom>
)

Header.propTypes = {
  showNavigation: PropTypes.func,
}

export default Header

