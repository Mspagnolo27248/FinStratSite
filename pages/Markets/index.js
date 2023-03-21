import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import { render } from 'react-dom';
import StockCard from '../../components/stock-card/StockCard'
import styles from '../../styles/Markets/index.module.css'

export default  function Markets() {

  const SYMBOLS = ['SPY','DOW','QQQ',"VXZ","SHY","IEF","TLT","GLD",]
 

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
    const data = await Promise.all(SYMBOLS.map(item => fetch('http://localhost:3000/api/YahooApi', {
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
  };
  fetchData();
}, []);


// useEffect(()=>{
// SYMBOLS.map(item=>{
//   fetch('http://localhost:3000/api/YahooApi',
//   {method: 'POST', 
//   body:JSON.stringify({symbol:item})
//   })
//   .then(res => res.json())
//   .then((data)=>{
//     setCardData(prevArray => [...prevArray, {
//       isPositive:data.price.regularMarketChange>0,
//       itemName:data.price.shortName,
//       itemPrice:data.price.regularMarketPrice,
//       priceDelta:(data.price.regularMarketChange||0).toFixed(2),
//       percentDelta:(data.price.regularMarketChangePercent*100).toFixed(2),
//       volume:data.price.regularMarketVolume||0
//     }]
//     );
//   })

// })  
// },[]);




  // const stockCardData = {
  //   isPositive:1,
  //   itemName:"NASDAQ COMPOSITE",
  //   itemPrice:"10,616.20",
  //   priceDelta:"51.68",
  //   percentDelta:"0.49%",
  //   volume:"992,137,871"
  // }
    
    


  return (
    <>
    <div className={styles['heading-container']}><h2 className={styles['heading-title']}>Markets Overview</h2></div>
    {cardData.map((item,idx)=>{
      return item.itemPrice !=""&&<StockCard key={idx} {...item}/>
    })}
   
    </>

   
  )
}
