/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react'
import PropTypes from 'prop-types'

import { scaleRotate as Menu } from 'react-burger-menu'

import stylesMenu from './styles.menu'

import styles from './styles'

export default class Navigation extends React.Component {
  static propTypes = {
    navigation: PropTypes.obj,
    hideNavigation: PropTypes.func
  }

  showSettings(event) {
    event.preventDefault()
  }

  render() {
    const { navigation, hideNavigation } = this.props

    return (
      <Menu
        pageWrapId="page-wrap"
        outerContainerId="outer-container"
        width={'80%'}
        isOpen={navigation.show}
        customBurgerIcon={false}
        right
        styles={stylesMenu}
      >
        <div style={styles.navigationWrap} className="navigation-wrap">
          {/*<div style={styles.TopBar}>*/}
          {/*<div onClick={hideNavigation}>*/}
          {/*<div color={'white'} />*/}
          {/*</div>*/}
          {/*</div>*/}
          <div style={styles.content}>
            {navigation.modules.map(module => {
              return (
                <nav style={styles.nav}>
                  <h2 style={styles.title}>{module.title}</h2>
                  {module.items.map(item => {
                    return (
                      <a key={item.title} style={styles.link} href={item.link}>
                        {' '}
                        {item.title}
                      </a>
                    )
                  })}
                </nav>
              )
            })}
          </div>
        </div>
      </Menu>
    )
  }
}
