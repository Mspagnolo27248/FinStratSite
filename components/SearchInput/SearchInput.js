

import React, { useState } from 'react'
import styles from './SearchInput.module.css'
import {FaSearch} from 'react-icons/fa'
export default function SearchInput(props) {

   const {placeholder,onChange,onSubmit,value} = props;

  


  return (
    <div className={styles["group"]}>
    <input id={styles["input-text"]}  type="search" placeholder={placeholder} onChange={onChange}  value={value}/>
    <button id={styles["search-btn"]} type="reset" onClick={onSubmit}><FaSearch/></button>
    </div>   
  )
}
