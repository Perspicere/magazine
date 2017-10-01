import { connect } from 'react-redux'
import get from 'lodash/get'

import HomePage from './HomePage'

const mapStateToProps = (state) => {
  const { common } = state
  const { homeJournal } = common  // 获取首页显示哪一期
  return {
    ...state[homeJournal],
  }
}

export default connect(
  mapStateToProps,
)(HomePage)
