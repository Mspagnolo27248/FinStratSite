import React from 'react'
import styles from './StockCard.module.css'


export default function StockCard(props) {
   const  {isPositive,itemName,itemPrice,priceDelta,percentDelta,volume} = props;
   const fontColorClassName = props.isPositive ? styles['positive-font-color'] : styles['negative-font-color'];
   const backgroundColorClassName = props.isPositive ? styles['positive-background-color'] : styles['negative-background-color'];

  return (
    <div className={styles["card-container"]}>
      <div className={`${styles["color-bar"]} ${backgroundColorClassName}`}/>
      <div className={styles["info-container"]}>
        <div className={`${styles["name-box"]} ${styles["gradient-text"]}`}>{itemName}</div>
        <div className={`${styles["price-box"]} ${styles["gradient-text"]}`}>{itemPrice}</div>
        <div className={`${styles["delta-container"]} ${fontColorClassName}`}>
          <div className={styles["price-delta"]}>{isPositive?`+${priceDelta}`:`${priceDelta}`}</div>
          <div className={styles["percent-delta"]}>{isPositive?`[+${percentDelta}%]`:`[${percentDelta}%]`}</div>
        </div>
        <div className={`${styles["volume"]} ${styles["gradient-text"]}`}>
          VOL: <b>{volume.toLocaleString("en-US")}</b>
        </div>
      </div>
    </div>
  );
}
