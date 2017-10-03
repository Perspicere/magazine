import { connect } from 'react-redux'

import Header from './Header'

import { showNavigation } from '../navigation/actions'

const mapStateToProps = (state) => {
  const { common, header } = state

  return {
    common,
    header,
  }
}

export default connect(
  mapStateToProps,
  { showNavigation }
)(Header)
