import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import { render } from 'react-dom';
import StockCard from '../../components/stock-card/StockCard'


export default  function Markets() {

  const SYMBOLS = ['SPY','QQQ']
 

const [cardData,setCardData] = useState([{
  isPositive:0,
  itemName:"None",
  itemPrice:"0.0",
  priceDelta:"0.00",
  percentDelta: "0.0%",
  volume:"0"
}]);


useEffect(()=>{
SYMBOLS.map(item=>{
  fetch('http://localhost:3000/api/YahooApi',
  {method: 'POST', 
  body:JSON.stringify({symbol:item})
  })
  .then(res => res.json())
  .then((data)=>{
    setCardData(prevArray => [...prevArray, {
      isPositive:data.price.regularMarketChange>0,
      itemName:data.price.shortName,
      itemPrice:data.price.regularMarketPrice,
      priceDelta:(data.price.regularMarketChange).toFixed(2),
      percentDelta:(data.price.regularMarketChangePercent*100).toFixed(2),
      volume:data.price.regularMarketVolume
    }]
    );
  })

})


  
},[]);




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
    <div><h1>Markets</h1></div>
    {cardData.map(item=>{
      return <StockCard {...item}/>
    })}
   
    </>

   
  )
}
