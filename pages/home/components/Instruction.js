import React, { PropTypes } from 'react'

export default class Instruction extends React.Component {
  static propTypes = {
    title: PropTypes.string
  }
  render() {
    const { styles, title, description } = this.props
    return (
      <div style={styles.instruction}>
        <span style={styles.topText}>第一期</span>
        <h2 style={styles.title}>{title}</h2>
        <p>{description}</p>
        <div style={styles.bottomText}>欢迎来到视角第一期 </div>
      </div>
    )
  }
}

Instruction.defaultProps = {
  styles: {
    topText: {
      color: 'yellow'
    },
    title: {
      textAlign: 'center',
      fontSize: '2em',
      marginTop: '5px'
    },
    instruction: {
      background: 'rgba(0, 0, 0, 0.8) none repeat scroll 0 0',
      color: '#fff',
      marginTop: '-90px',
      padding: '1em',
      height: '180px'
    },
    bottomText: {
      marginTop: '30px'
    }
  }
}
