import colors from '../styles/colors'
import dims from '../styles/dims'

export default {
  LayoutContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingTop: '50px',
  },
  TopBar: {
    position: 'absolute',
    height: dims.topBar,
    top: 0,
    backgroundColor: colors.darkOverlay,
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
  header: {
    display: 'flex'
  },
  content: {
    margin: "auto",
    maxWidth: 1000,
    width: "100%"
  },
}
