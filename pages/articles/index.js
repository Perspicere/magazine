
import { connect } from 'react-redux'

import DetailPage from './DetailPage'

const mapStateToProps = (state) => {
  const { common } = state
  return {
    common,
  }
}

export default connect(
  mapStateToProps,
)(DetailPage)
