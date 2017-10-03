import { connect } from 'react-redux'

import Header from './Header'

import { showNavigation } from '../navigation/actions'

const mapStateToProps = (state) => {
  const { common } = state

  return {
    common,
  }
}

export default connect(
  mapStateToProps,
  { showNavigation }
)(Header)
