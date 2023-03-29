import React from 'react';
import styles from './DateInput.module.css'
const DateInput = ({ label, name, value, onChange }) => {
  return (
    <>   
  <div className={styles["input-group"]}>
  <div className={styles["input-container"]}>
    <input 
    type="date" 
    className={styles["input-box"]} 
    name={name} 
    value={value}
    onChange={onChange}
     />

    <label
     className={styles["input-label"]} 
     htmlFor={name
     }>{label}</label> 
      </div>
</div>
  
    </>
  );
};

export default DateInput;
