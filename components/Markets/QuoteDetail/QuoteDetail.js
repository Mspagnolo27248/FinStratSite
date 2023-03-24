import React from "react";
import styles from './QuoteDetail.module.css';
export default function QuoteDetail(props) {
  const  {apiData} = props;

//   isPositive: item.price.regularMarketChange > 0,
//   itemName: item.price.shortName,
//   itemPrice: item.price.regularMarketPrice,
//   priceDelta: (item.price.regularMarketChange || 0).toFixed(2),
//   percentDelta: (item.price.regularMarketChangePercent * 100).toFixed(2),
//   volume: item.price.regularMarketVolume || 0,
//   index: index,

let stockName = "SPDR S&P 500"
let stockPrice = "393.17"
let priceDelta = "1.06";
let percentDelta ="0.27"
let volume = "116808017"
let bid = "393"
let ask = "394"
let quoteTime = "12:00"
let previousClose = "";
let open = "";
let bidSize= "";
let askSize = "";
let marketCap = ""; //price.marketCap
let daysHigh = ""; //price.regularMarketDayHigh
let daysLow = ""; //price.regularMarketDayLow
let averageDailyVolume3Month = ""//price.averageDailyVolume3Month
let divYield = "";

if(apiData.price){
     stockName = apiData.price.shortName;
     stockPrice = apiData.price.regularMarketPrice||0;
     priceDelta = (apiData.price.regularMarketChange || 0).toFixed(2);
     percentDelta = (apiData.price.regularMarketChangePercent * 100).toFixed(2);
     volume = (apiData.price.regularMarketVolume || 0).toLocaleString();
     bid = apiData.summaryDetail.bid;
     ask = apiData.summaryDetail.ask;
     quoteTime = apiData.preMarketTime;
      previousClose = apiData.price.regularMarketPreviousClose;
      open = apiData.price.regularMarketOpen;
      bidSize= apiData.summaryDetail.bidSize;
      askSize =apiData.summaryDetail.askSize;
      marketCap = (apiData.price.marketCap||0).toLocaleString(); //price.marketCap
      daysHigh = apiData.price.regularMarketDayHigh; //price.regularMarketDayHigh
      daysLow = apiData.price.regularMarketDayLow; //price.regularMarketDayLow
      averageDailyVolume3Month = (apiData.price.averageDailyVolume3Month|| 0).toLocaleString();;//price.averageDailyVolume3Month
      divYield = (apiData.summaryDetail.yield*100||0).toFixed(2);


}





  return (
    <>
      <div className={styles["main-container"]}>
        <div className={styles["top-box"]}>
          <div className={styles["stock-name"]}>{stockName}</div>
          <div>
            <span className={styles["price"]}>${stockPrice}</span>
            <span className={styles["price-delta positive-color"]}>{priceDelta} </span>
            <span className={styles["percent-delta positive-color"]}> {percentDelta}%</span>
          </div>
          <div className={styles["flex-row"]}>
            <div className={styles["flex-column"]}>
              <span>Bid</span> <span>{bid}</span>
            </div>
            <div className={styles["flex-column"]}>
              <span>Ask</span> <span>{ask}</span>
            </div>
            <div className={styles["flex-column"]}>
              <span>Vol</span> <span>{volume}</span>
            </div>
          </div>
          <div>{quoteTime}</div>
        </div>

        <div className={styles["chart-box"]}>This is a Chart</div>

        <div className={styles["statistics-box"]}>
          <h2>Key Statistics</h2>
          <div className={styles["statistics-item"]}>
            <span className={styles["item-name"]}>Previous Close</span>
            <span className={styles["item-value"]}>{previousClose}</span>
          </div>
          <div className={styles["statistics-item"]}>
            <span className={styles["item-name"]}>Open</span>
            <span className={styles["item-value"]}>{open}</span>
          </div>
          <div className={styles["statistics-item"]}>
            <span className={styles["item-name"]}>Bid x Size</span>
            <span className={styles["item-value"]}>{bid} x {bidSize}</span>
          </div>
          <div className={styles["statistics-item"]}>
            <span className={styles["item-name"]}>Ask x Size</span>
            <span className={styles["item-value"]}>{ask} x {askSize}</span>
          </div>
          <div className={styles["statistics-item"]}>
            <span className={styles["item-name"]}>Days Range</span>
            <span className={styles["item-value"]}>{daysHigh} - {daysLow}</span>
          </div>
          <div className={styles["statistics-item"]}>
            <span className={styles["item-name"]}>Volume</span>
            <span className={styles["item-value"]}>{volume}</span>
          </div>
          <div className={styles["statistics-item"]}>
            <span className={styles["item-name"]}>Avg. Volume</span>
            <span className={styles["item-value"]}>{averageDailyVolume3Month}</span>
          </div>
          <div className={styles["statistics-item"]}>
            <span className={styles["item-name"]}>Market Cap</span>
            <span className={styles["item-value"]}>{marketCap}</span>
          </div>
          <div className={styles["statistics-item"]}>
            <span className={styles["item-name"]}>Div Yield</span>
            <span className={styles["item-value"]}>{divYield}</span>
          </div>
         
          
        </div>
      </div>
    </>
  );
}
