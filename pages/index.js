import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <>

      <div>
        <div className={styles['page-link-container']}>

          <Link href="/Markets">
            <div className={styles['page-link']}>
            <span>Markets</span>
            </div>
          </Link>

          <Link href="/Economy">
            <div className={styles['page-link']}>
            <span>Economy</span>
            </div>
          </Link>


          <Link href="/Academy" >
            <div className={styles['page-link']} >
               <span>Finance</span>
            </div>
          </Link>

        </div>
      </div>

   
    </>

   
  )
}
