import { Fragment } from 'react'
import '../styles/globals.css'
import Sidebar from '../components/Sibebar/Sidebar'

function MyApp({ Component, pageProps }) {
  return (
  <Fragment>
       <Sidebar logoUrl={'finstrat-trader-logo.png'}/>
       <Component {...pageProps} />
  </Fragment>
  )
}

export default MyApp
