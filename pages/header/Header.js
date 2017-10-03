// external import
import React from 'react'
import PropTypes from 'prop-types'

// internal import
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui/svg-icons/navigation/menu'

// local import
// import Link from '../Link'
import styles from './styles.js'


const Header = ({ showNavigation, common, header }) => (
  <AppBar
    style={styles.TopBar}
    iconElementLeft={<div/>}
    title={header.title || common.name}
    titleStyle={styles.title}
    iconElementRight={
      <IconButton>
        <MenuIcon color={'white'} />
      </IconButton>}
    iconStyleRight={{marginTop: 0}}
    onRightIconButtonTouchTap={showNavigation}
  >
  </AppBar>
)

Header.propTypes = {
  showNavigation: PropTypes.func,
}

export default Header

