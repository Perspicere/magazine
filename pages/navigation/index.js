import { connect } from 'react-redux'

import Navigation from './Navigation'

const mapStateToProps = (state) => {
  const { common, navigation } = state

  return {
    common,
    navigation,
  }
}

export default connect(
  mapStateToProps,
)(Navigation)

