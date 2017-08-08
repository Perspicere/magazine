import React from 'react'
import Navigation from './Navigation'
import Link from '../Link'
import styles from './styles.js'

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
        <div className={`mdl-layout__header-row`} style={styles.row}>
          <Link
            className={`mdl-layout-title`}
            to="/"
            style={styles.title}
          >
            视角
          </Link>
          <div className="mdl-layout-spacer"></div>
          <Navigation />
        </div>
      </header>
    );
  }

}

export default Header;
