import React from 'react'
import styles from './Form.module.css';

export default function Form({children,submitHandler,btnText}) {

  return (
<div>
    <form onSubmit={submitHandler}>
     {children}
     <button type='submit' >{btnText}</button>
    </form>

</div>



  )
}
