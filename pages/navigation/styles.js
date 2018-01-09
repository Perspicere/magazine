import colors from '../../components/styles/colors'
import dims from '../../components/styles/dims'

export default {
  show: {
    // todo 添加动画？
    display: 'block'
  },
  hide: {
    display: 'none'
  },
  navigationWrap: {
    position: 'relative',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    background: '#000',
    color: '#fff',
    zIndex: 2000,
    overflow: 'auto'
  },
  // TopBar: {
  //   position: 'absolute',
  //   height: dims.topBar,
  //   width: dims.topBar,
  //   top: '5px',
  //   right: '10px',
  //   backgroundColor: colors.black,
  // },
  content: {
    textAlign: 'left'
  },
  nav: {
    fontSize: '20px',
    fontWeight: 'bold',
    width: '70%',
    float: 'right'
  },
  title: {
    borderBottom: '1px solid #fff'
  },
  link: {
    display: 'block',
    lineHeight: '30px',
    borderBottom: '1px solid #fff'
  }
}
