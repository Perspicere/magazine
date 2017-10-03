/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react'

// import Link from '../Link';
// import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import CloseIcon from 'material-ui/svg-icons/navigation/close'

import styles from './styles'

export default class Navigation extends React.Component {

  static propTypes = {
    navigation: PropTypes.obj,
    hideNavigation: PropTypes.func,

  }

  render() {
    const {
      navigation,
      // actions
      hideNavigation,
    } = this.props

    // console.log(this.props)
    if (!navigation.show) return <div></div>

    return (
      <div style={styles.navigationWrap} className="navigation-wrap">
        <div style={styles.TopBar}>
          <IconButton onClick={hideNavigation}>
            <CloseIcon color={'white'} />
          </IconButton>
        </div>

       <div style={styles.content}>
         {
           navigation.modules.map((module) => {
                return <nav style={styles.nav}>

                  <h2 style={styles.title}>{module.title}</h2>
                  {
                    module.items.map((item) => {
                      return <a style={styles.link} href={item.link}> {item.title}</a>
                    })
                  }
                </nav>
           })
         }

       </div>
      </div>

    );
  }
}
