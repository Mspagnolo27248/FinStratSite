import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { BeatLoader } from 'react-spinners';
import StockCard from '../../components/stock-card/StockCard'
import styles from '../../styles/Markets/index.module.css'

export default  function Markets() {

  const SYMBOLS = ['SPY','DOW','QQQ',"VXZ","SHY","IEF","TLT","GLD",]
  const [isLoading,setIsloading] = useState(true);

const [cardData,setCardData] = useState([{
  isPositive:0,
  itemName:"None",
  itemPrice:"",
  priceDelta:"0.00",
  percentDelta: "0.0%",
  volume:"0"
}]);

useEffect(() => {
  const fetchData = async () => {
    const data = await Promise.all(SYMBOLS.map(item => fetch('/api/YahooApi', {
      method: 'POST',
      body: JSON.stringify({ symbol: item })
    }).then(res => res.json())));
    setCardData(data.map((item, index) => ({
      isPositive: item.price.regularMarketChange > 0,
      itemName: item.price.shortName,
      itemPrice: item.price.regularMarketPrice,
      priceDelta: (item.price.regularMarketChange || 0).toFixed(2),
      percentDelta: (item.price.regularMarketChangePercent * 100).toFixed(2),
      volume: item.price.regularMarketVolume || 0,
      index: index,
    })).sort((a, b) => a.index - b.index));
  setIsloading(false);
  };
  fetchData();
}, []);




  return (
    <>
    <div className={styles['heading-container']}><h2 className={styles['heading-title']}>Markets Overview</h2></div>
    {isLoading&&
    <div style={{textAlign:"center",marginTop:"2rem"}}>
    <BeatLoader color="blueviolet" />
    </div>
    }
    {cardData.map((item,idx)=>{
      return item.itemPrice !=""&&<StockCard key={idx} {...item}/>
    })}
   
    </>

   
  )
}
