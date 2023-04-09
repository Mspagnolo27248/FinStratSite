import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
import Title from "../../components/Title/Title";
import styles from "../../styles/Economy/Home.module.css";

export default function Academy() {
  return (
 
        <>
          <Title titleText={"Finance"} />
       
          <div className={styles["links"]}>
    
            
              <div className={styles["link"]}>
              <Link href={'/Academy/FutureValue'}>
                <p>Future Value</p>
                </Link>
              </div>
        
    
              <div className={styles["link"]}>
              <Link href={'/Academy/PresentValue'}>
                <p>Present Value</p>
                </Link>
              </div>
           
         
              <div className={styles["link"]}>
              <Link href={'/Academy/LoanPmt'}>
                <p>Loan Payment</p>
                </Link>
              </div>
      
         
              <div className={styles["link"]}>
              <Link href={'/Academy/FVAnnuityPmt'}>
                <p>FV Annuity</p>
                </Link>
              </div>
       
      
        
          </div>
        </>
   

   
  )
}
