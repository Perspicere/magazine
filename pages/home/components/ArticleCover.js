import React, { PropTypes } from 'react'

export default class ArticleCover extends React.Component {
  static propTypes = {
    lText: PropTypes.string,
    rText: PropTypes.string
  }
  render() {
    const { styles, title, description, author, time, img, link } = this.props
    // console.log({img})
    return (
      <a href={link} style={{ ...styles.wrap, backgroundImage: `url(${img})` }}>
        <div style={styles.innerWrap}>
          <p style={styles.title}>{title}</p>
          <div style={styles.description}>{description}</div>
          <div style={styles.bottomWrap}>
            <span style={styles.author}>{author}</span>
            <span style={styles.time}>{time}</span>
          </div>
        </div>
      </a>
    )
  }
}

ArticleCover.defaultProps = {
  styles: {
    wrap: {
      display: 'block',
      color: '#fff',
      textDecoration: 'none',
      height: '200px',
      backgroundColor: '#000'
    },
    innerWrap: {
      width: '200px',
      height: '120px',
      background: 'rgba(0, 0, 0, 0.6) none repeat scroll 0 0',
      color: '#fff',
      padding: '20px'
    },
    title: {
      fontWeight: 'bold',
      fontSize: '15px'
    },
    description: {
      fontSize: '11px'
    },
    bottomWrap: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  }
}
