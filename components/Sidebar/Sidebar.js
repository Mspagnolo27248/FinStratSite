import React, { useEffect, useState } from "react";
import styles  from "./Sidebar.module.css";
import Image from 'next/image';
import Link from 'next/link';
import {BsFillBarChartFill}  from 'react-icons/bs';
import {MdClear,MdArrowForwardIos,MdOutlineSearch} from 'react-icons/md'
import { useRouter } from "next/router";

export default function Sidebar(props) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
 const logoUrl = props.logoUrl;
  const toggleHandler = () => {
    setIsOpen(!isOpen);  
  };

  useEffect(() => {
    const handleRouteChange = () => {
      setIsOpen(false);
    };
    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router]);
  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles[`navbar-logo`]}><BsFillBarChartFill/> Finstrat Trader</div>
        <div className={styles["navbar-links"]}>
          <ul>
            <li>Home</li>
            <li>Details</li>
            <li>About</li>
            <li className={styles["dropdown"]}>
            Dropdown
          <div className={styles["dropdown-content"]}>      
            <Link href="/">Markets</Link>
            <Link href="/">Economy</Link>
            <Link href="/">Academy</Link>
          </div>
        </li>
          </ul>
        </div>

        <div className={styles["navbar-toggle"]} onClick={toggleHandler}>
          <span className={styles["line"]}></span>
          <span className={styles["line"]}></span>
          <span className={styles["line"]}></span>
        </div>
      </nav>

      <nav className={`${styles["nav-sidebar"]} ${isOpen?styles["open"]:""}`}>
<div className={styles['sidebar-header']}><BsFillBarChartFill/> Finstrat Trader </div>
  <ul>
    <li><Link href="/Dashboard">Dashboard <MdArrowForwardIos/></Link></li> 
    <li><Link href="/Markets">Markets <MdArrowForwardIos/></Link>
    <div className={styles["sidebar-dropdown__content"]}>      
      <Link href="/Markets/Today">Today</Link>
      <Link href="/Markets/Search"><MdOutlineSearch size={20}  style={{ height:'21px', width:'21px'}}/><span>Search</span> </Link>
      <Link href="/Markets/History">History</Link>
    </div>
    </li> 
    <li><Link href="/Economy">Economy <MdArrowForwardIos/></Link>
    <div className={styles["sidebar-dropdown__content"]}>      
      <Link href="/Economy">Snapshot</Link>
      <Link href="/Economy/FREDSeries">FRED Series</Link>
    </div>
    </li>
    <li><Link href="/Academy">Academy <MdArrowForwardIos/></Link>
    <div className={styles["sidebar-dropdown__content"]}>      
      <Link href="/Academy">Today</Link>
      <Link href="/Academy/FREDSeries">Today</Link>
    </div>
    </li>
  </ul>
  <div className={styles["toggler"]} onClick={toggleHandler}><MdClear 
  size={30}
  className="pdf-icon" 
  style={{ marginTop: '.8rem' }}
  /></div>
</nav>
    </>
  );
}
