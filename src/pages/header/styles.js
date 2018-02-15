import colors from '../../components/styles/colors'
import dims from '../../components/styles/dims'

export default {
  TopBar: {
    height: dims.topBar,
    backgroundColor: colors.white,
    borderBottom: `0.2px solid ${colors.black}`,
    display: 'flex'
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
  },
  menuIcon: {
    zIndex: 1000,
    position: 'fixed',
    width: 24,
    height: 20,
    right: 10,
    top: 15,
    display: 'flex',
    alignItems: 'center'
  }
}
