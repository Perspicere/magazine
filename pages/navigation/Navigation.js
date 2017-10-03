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
// import Link from '../Link';
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import CloseIcon from 'material-ui/svg-icons/navigation/close'

import styles from './styles'
import layoutStyles from '../layout/styles'

export default class Navigation extends React.Component {

  componentDidMount() {
    // window.componentHandler.upgradeElement(this.root);
  }

  componentWillUnmount() {
    // window.componentHandler.downgradeElements(this.root);
  }

  render() {
    const { toggleMenu } = this.props
    const { common, navigation} = this.props

    console.log(this.props)
    return (
      <div style={styles.navigationWrap} className="navigation-wrap">
        <AppBar
          style={layoutStyles.TopBar}
          iconElementLeft={<div/>}
          titleStyle={styles.title}
          iconElementRight={
            <IconButton>
              <CloseIcon color={'white'} />
            </IconButton>}
          iconStyleRight={{ marginTop: 0}}
          onRightIconButtonTouchTap={toggleMenu}
        >
        </AppBar>

       <div style={styles.content}>
         {
           navigation.modules.map((module)=>{
                return <nav style={styles.nav}>

                  <h2 style={styles.title}>{module.title}</h2>
                  {
                    module.items.map((item)=>{
                      return <a  style={styles.link} href={item.link}> {item.title}</a>
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
