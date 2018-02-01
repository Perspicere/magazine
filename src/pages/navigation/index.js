import { connect } from 'react-redux'

import Navigation from './Navigation'

import { hideNavigation } from './actions'

const mapStateToProps = state => {
  const { navigation } = state

  return {
    navigation
  }
}

export default connect(mapStateToProps, { hideNavigation })(Navigation)
