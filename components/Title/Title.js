import React from 'react'
import styles from './Title.module.css'
export default function Title({titleText}) {
  return (
    <div className={styles['title-container']}>
    <h2 className={styles['title-text']}>{titleText}</h2>
    </div>
  )
}
