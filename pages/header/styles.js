import colors from '../../components/styles/colors'
import dims from '../../components/styles/dims'

export default {

  TopBar: {
    height: dims.topBar,
    backgroundColor: colors.black,
    color: colors.white,
  },
  title: {
    color: colors.white,
    fontSize: 20,
    position: 'fixed',
    left: '50%',
    transform: 'translate(-50%, 0)',
    height: dims.topBar,
    display: 'flex',
    alignItems: 'center',
  },
}
