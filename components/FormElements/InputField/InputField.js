import React from 'react'
import styles from './InputField.module.css'

export default function InputField({labelValue,placeholder,inputName,changeHandler} ) {

  return (  <>   
  <div className={styles["input-group"]}>
  <div className={styles["input-container"]}>
    <input 
    type="text" 
    className={styles["input-box"]} 
    name={inputName} 
    placeholder={placeholder} 
    onChange={changeHandler}
     />

    <label
     className={styles["input-label"]} 
     htmlFor={inputName
     }>{labelValue}</label> 
      </div>
</div>
  
    </>
  )
}

