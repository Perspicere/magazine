import React from 'react'
import imgSrc from '../../docs/卷首语/1.jpg'
import styles from './styles'

function TopicEntry() {
  return (
    <div style={styles.container}>
      <img src={imgSrc} style={styles.image} />
    </div>
  )
}

export default TopicEntry
