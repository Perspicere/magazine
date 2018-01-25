import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles'

export default class ArticleCover extends React.Component {
  static propTypes = {
    lText: PropTypes.string,
    rText: PropTypes.string
  }
  render() {
    const { title, description, author, time, img, link } = this.props
    return (
      <a href={link}>
        <div style={styles.articleCover}>
          <img src={img} style={styles.articleCoverImage}/>
          <div style={styles.coverShade}>
            <p style={styles.title}>{title}</p>
            <div style={styles.description}>{description}</div>
            <div style={styles.bottomWrap}>
              <span style={styles.author}>{author}</span>
              <span style={styles.time}>{time}</span>
            </div>
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
