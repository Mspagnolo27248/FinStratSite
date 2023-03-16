import React, { useState } from "react";
import styles  from "./Sidebar.module.css";
import Image from 'next/image';
import {BsFillBarChartFill}  from 'react-icons/bs';
import {MdClear,MdArrowForwardIos,MdOutlineSearch} from 'react-icons/md'
export default function Sidebar(props) {
  const [isOpen, setIsOpen] = useState(false);
 const logoUrl = props.logoUrl;
  const toggleHandler = () => {
    setIsOpen(!isOpen);
  };
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
      
            <a href="/">Markets</a>
            <a href="/">Economy</a>
            <a href="/">Academy</a>
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
    <li><a href="#">Dashboard <MdArrowForwardIos/></a></li> 
    <li><a href="#">Markets <MdArrowForwardIos/></a>
    <div className={styles["sidebar-dropdown__content"]}>      
      <a href="/">Today</a>
      <a href="/"><MdOutlineSearch size={20}  style={{ height:'21px', width:'21px'}}/><span>Search</span> </a>
      <a href="/">Historical</a>
    </div>
    </li> 
    <li><a href="#">Economy <MdArrowForwardIos/></a></li>
    <li><a href="#">Academy <MdArrowForwardIos/></a></li>
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
