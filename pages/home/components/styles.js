export default {
  articleCover: {
    display: 'flex',
    width: '100%',
    height: 250
  },
  articleCoverImage: {
    objectFit: 'cover',
    width: '100%',
    height: '100%',
    zIndex: -99
  },
  coverShade: {
    position: 'absolute',
    background: 'rgba(0, 0, 0, 0.6)',
    width: 280,
    height: 160,
    paddingLeft: 28,
    paddingRight: 28,
    paddingTop: 20,
    paddingBottom: 20,
    color: 'white'
  },
  coverContent: {
    zIndex: 99
  },
  loaderContainer: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}
