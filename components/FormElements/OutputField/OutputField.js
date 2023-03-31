import React from 'react'
import styles from '../InputField/InputField.module.css'

export default function OutputField({labelValue,placeholder,inputName,value} ) {

  return (  <>   
  <div className={styles["input-group"]}>
  <div className={styles["input-container"]}>
    <input 
    type="text" 
    className={styles["input-box"]} 
    name={inputName} 
    placeholder={placeholder} 
    readOnly={true}
    value={value}
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

