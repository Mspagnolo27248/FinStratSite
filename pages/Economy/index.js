import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Title from "../../components/Title/Title";
import styles from "../../styles/Economy/Home.module.css";
export default function Economy() {
  return (
    <>
      <Title titleText={"Economy"} />
   
      <div className={styles["links"]}>

        
          <div className={styles["link"]}>
          <Link href={'/Economy/FREDSeries'}>
            <p>Search</p>
            </Link>
          </div>
    

          <div className={styles["link"]}>
          <Link href={'/Economy/Employment'}>
            <p>Employment</p>
            </Link>
          </div>
       
     
          <div className={styles["link"]}>
          <Link href={'/Economy/GDP'}>
            <p>GDP</p>
            </Link>
          </div>
  
     
          <div className={styles["link"]}>
          <Link href={'/Economy/Inflation'}>
            <p>Inflation</p>
            </Link>
          </div>
   
     
          <div className={styles["link"]}>
          <Link href={'/Economy/InterestRates'}>
            <p>Rates</p>
            </Link>
          </div>
    
      </div>
    </>
  );
}
