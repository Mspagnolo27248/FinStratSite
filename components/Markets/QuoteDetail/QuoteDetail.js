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
let fiftyTwoWeekLow = "";
let fiftyTwoWeekHigh = "";

if(apiData){
     stockName = apiData.shortName;
     stockPrice = (apiData.regularMarketPrice||0).toFixed(2);
     priceDelta = (apiData.regularMarketChange || 0).toFixed(2);
     percentDelta = (apiData.regularMarketChangePercent * 100).toFixed(2);
     volume = (apiData.regularMarketVolume || 0).toLocaleString();
     bid = apiData.bid;
     ask = apiData.ask;
     quoteTime = apiData.preMarketTime;
      previousClose = apiData.regularMarketPreviousClose;
      open = (apiData.regularMarketOpen||0).toFixed(2);
      bidSize= apiData.bidSize;
      askSize =apiData.askSize;
      marketCap = (apiData.marketCap||0).toLocaleString(); //price.marketCap
      daysHigh = apiData.regularMarketDayHigh; //price.regularMarketDayHigh
      daysLow = apiData.regularMarketDayLow; //price.regularMarketDayLow
      averageDailyVolume3Month = (apiData.averageDailyVolume3Month|| 0).toLocaleString();;//price.averageDailyVolume3Month
      divYield = (apiData.trailingAnnualDividendYield*100||0).toFixed(2);
      fiftyTwoWeekHigh = (apiData.fiftyTwoWeekHigh||0).toFixed(2);
      fiftyTwoWeekLow = (apiData.fiftyTwoWeekLow||0).toFixed(2);


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

        <div className={styles["chart-box"]}>{props.children}</div>

        <div className={styles["statistics-box"]}>
          <h2>Key Statistics</h2>
          <div className={styles["statistics-item"]}>
            <span className={styles["item-name"]}>Price</span>
            <span className={styles["item-value"]}>{stockPrice}</span>
          </div>
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
            <span className={styles["item-name"]}>52Wk Range</span>
            <span className={styles["item-value"]}>{fiftyTwoWeekHigh} - {fiftyTwoWeekLow}</span>
          </div>
          <div className={styles["statistics-item"]}>
            <span className={styles["item-name"]}>Div Yield</span>
            <span className={styles["item-value"]}>{divYield}%</span>
          </div>
         
          
        </div>
      </div>
    </>
  );
}
