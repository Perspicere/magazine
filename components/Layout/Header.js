// external import
import React from 'react'
import PropTypes from 'prop-types'

// internal import
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'

// local import
import Link from '../Link'
import styles from './styles.js'

const Header = ({toggleMenu}) => (
  <AppBar
    style={styles.TopBar}
    iconElementLeft={<div/>}
    title={"视 角"}
    titleStyle={styles.title}
    iconElementRight={
      <IconButton>
        <MoreVertIcon color={'white'} />
      </IconButton>}
    iconStyleRight={{marginTop: 0}}
    onRightIconButtonTouchTap={toggleMenu}
    >
  </AppBar>
)

Header.propTypes = {
  showMore: PropTypes.func,
}

export default Header
