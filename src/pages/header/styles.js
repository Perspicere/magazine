import colors from '../../components/styles/colors'
import dims from '../../components/styles/dims'

export default {
  TopBar: {
    height: dims.topBar,
    backgroundColor: colors.white,
    borderBottom: `1px solid ${colors.black}`
  },
  title: {
    color: colors.black,
    fontSize: 20,
    position: 'fixed',
    left: '50%',
    transform: 'translate(-50%, 0)',
    height: dims.topBar,
    display: 'flex',
    alignItems: 'center'
  }
}
