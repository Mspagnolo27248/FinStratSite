import Head from 'next/head'
import Image from 'next/image'
import StockCard from '../../components/stock-card/StockCard'

export default function Markets() {

  const stockCardData = {
    isPositive:1,
    itemName:"NASDAQ COMPOSITE",
    itemPrice:"10,616.20",
    priceDelta:"51.68",
    percentDelta:"0.49%",
    volume:"992,137,871"
  }
  return (
    <>
    <div><h1>Markets</h1></div>
    <StockCard {...stockCardData}/>
    </>

   
  )
}
