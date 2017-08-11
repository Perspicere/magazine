import React from 'react'
import AppBar from 'material-ui/AppBar';

import Navigation from './Navigation'
import Link from '../Link'
import styles from './styles.js'
import imgSrc from '../../docs/卷首语/主题.jpg'

class Header extends React.Component {

  componentDidMount() {
    window.componentHandler.upgradeElement(this.root);
  }

  componentWillUnmount() {
    window.componentHandler.downgradeElements(this.root);
  }

  render() {
    return (
      <header
        className={`mdl-layout__header`}
        ref={node => (this.root = node)}
        style={styles.header}
      >
        <img src={imgSrc} style={styles.image}/>
        <AppBar className={`mdl-layout__header-row`} style={styles.TopBar}>
          <div
            style={styles.title}
          >
            视角
          </div>
          <div className="mdl-layout-spacer"></div>
          <Navigation />
        </AppBar>
      </header>
    );
  }

}

export default Header;
