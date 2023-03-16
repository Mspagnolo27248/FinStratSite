import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <>

    <div>
      Hello 
      <button className={styles['btn']}>Click Me</button>
      <Link href={'/Markets'}>Markets</Link>
     
    </div>
    </>

   
  )
}
