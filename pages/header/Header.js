// external import
import React from 'react';
import PropTypes from 'prop-types';

import Headroom from 'react-headroom';

// local import
// import Link from '../Link'
import styles from './styles.js';


const Header = ({showNavigation, common, header}) => (
  <Headroom style={styles.TopBar}>
    <div style={styles.title}> {header.title || common.name}</div>
    <div onClick={showNavigation} style={{ zIndex: 1000, position: 'fixed', width: '24px', height: '20px', right: '20px', top: '15px'}}>
      <span>
      <span style={{ position: 'absolute', height: '20%', left: '0px', right: '0px', top: '0%', opacity: 1, background: '#aaa'}}></span>
      <span style={{ position: 'absolute', height: '20%', left: '0px', right: '0px', top: '40%',opacity: 1, background: '#aaa'}}></span>
      <span style={{ position: 'absolute', height: '20%', left: '0px', right: '0px', top: '80%',opacity: 1, background: '#aaa'}}></span>
    </span>
    </div>

  </Headroom>
);

Header.propTypes = {
  showNavigation: PropTypes.func,
};

export default Header;

