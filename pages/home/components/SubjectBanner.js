import React, { PropTypes } from 'react'

export default class SubjectBanner extends React.Component {
  static propTypes = {
    lText: PropTypes.string,
    rText: PropTypes.string

  }
  render() {
    const { lText, rText, styles } = this.props
    return (
      <div style={styles.wrap}>
          <div style={styles.left}>{lText}</div>
          <div style={styles.split}></div>
          <div style={styles.right}>{rText}</div>
      </div>
    )
  }
}


SubjectBanner.defaultProps = {
  styles: {
    wrap: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '40px',
      marginTop: '40px',
      fontSize: '15px',

      marginBottom: '5px',
    },
    left: {
      display: 'flex',
      height: '100%',
    },
    right: {
      display: 'flex',
      height: '100%',
      alignItems: 'flex-end',
    },
    split: {
      borderLeft: 'solid 1px #000',
      width: '8px',
      height: '40px',
      marginLeft: '8px',
    },
  },
}
