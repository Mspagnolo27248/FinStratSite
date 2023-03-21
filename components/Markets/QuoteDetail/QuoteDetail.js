import React from "react";
import styles from './QuoteDetail.module.css';
export default function QuoteDetail() {
  return (
    <>
      <div className={styles["main-container"]}>
        <div className={styles["top-box"]}>
          <div className={styles["stock-name"]}>SPDR S&P 500</div>
          <div>
            <span className={styles["price"]}>$396.23</span>
            <span className={styles["price-delta positive-color"]}>+2.58</span>
            <span className={styles["percent-delta positive-color"]}>(0.69%)</span>
          </div>
          <div className={styles["flex-row"]}>
            <div className={styles["flex-column"]}>
              <span>Bid</span> <span>396.43</span>
            </div>
            <div className={styles["flex-column"]}>
              <span>Ask</span> <span>396.43</span>
            </div>
            <div className={styles["flex-column"]}>
              <span>Vol</span> <span>396.43</span>
            </div>
          </div>
          <div>03/21/2023 12:20 PM ET</div>
        </div>

        <div className={styles["chart-box"]}>This is a Chart</div>

        <div className={styles["statistics-box"]}>
          <h2>Key Statistics</h2>
          <div className={styles["statistics-item"]}>
            <span className={styles["item-name"]}>Previous Close</span>
            <span className={styles["item-value"]}>393.74</span>
          </div>
          <div className={styles["statistics-item"]}>
            <span className={styles["item-name"]}>Open</span>
            <span className={styles["item-value"]}>393.74</span>
          </div>
          <div className={styles["statistics-item"]}>
            <span className={styles["item-name"]}>Bid x Size</span>
            <span className={styles["item-value"]}>393.74</span>
          </div>
          <div className={styles["statistics-item"]}>
            <span className={styles["item-name"]}>Ask x Size</span>
            <span className={styles["item-value"]}>393.74</span>
          </div>
          <div className={styles["statistics-item"]}>
            <span className={styles["item-name"]}>Volume</span>
            <span className={styles["item-value"]}>393.74</span>
          </div>
          <div className={styles["statistics-item"]}>
            <span className={styles["item-name"]}>Market Cap</span>
            <span className={styles["item-value"]}>393.74</span>
          </div>
          <div className={styles["statistics-item"]}>
            <span className={styles["item-name"]}>Previous Close</span>
            <span className={styles["item-value"]}>393.74</span>
          </div>
        </div>
      </div>
    </>
  );
}
