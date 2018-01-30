export default {
  articleCover: {
    display: 'flex',
    width: '100%',
    height: 250,
    position: 'relative'
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
    width: '70%',
    height: '55%',
    padding: '3% 5%',
    color: 'white',
    fontSize: '12'
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
