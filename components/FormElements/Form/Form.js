import React from 'react'
import styles from './Form.module.css';

export default function Form({children,submitHandler,btnText}) {

  return (
<div>
    <form onSubmit={submitHandler}>
     {children}
     <button className={styles['btn']} type='submit' >{btnText}</button>
    </form>

</div>



  )
}
