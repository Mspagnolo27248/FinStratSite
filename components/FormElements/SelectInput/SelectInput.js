import React from 'react';
import styles from './SelectInput.module.css'

const SelectInput = ({ label, name, value, options, onChange }) => {
  return (
    <div className={styles["input-group"]}>
    <div className={styles["input-container"]}>
    <select className={styles["input-box"]} id={name} name={name} value={value} onChange={onChange}>
         {options.map((option) => (
           <option key={option.value} value={option.value}>
             {option.label}
           </option>
         ))}
       </select>
  
      <label
       className={styles["input-label"]} 
       htmlFor={name
       }>{label}</label> 
        </div>
  </div>
    // <div>
    //   <label htmlFor={name}>{label}</label>
    //   <select id={name} name={name} value={value} onChange={onChange}>
    //     {options.map((option) => (
    //       <option key={option.value} value={option.value}>
    //         {option.label}
    //       </option>
    //     ))}
    //   </select>
    // </div>
  );
};

export default SelectInput;
