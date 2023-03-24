import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import QuoteDetail from '../../components/Markets/QuoteDetail/QuoteDetail'
import SearchInput from '../../components/SearchInput/SearchInput'

export default function Search(props){

  const [stockTickerText,setStockTickerText] = useState('');

  const submitHandler = async ()=>{
    const data = await  fetch('/api/YahooApi', {
        method: 'POST',
        body: JSON.stringify({ symbol: stockTickerText })
      })
      .then(res => res.json());
          
    setQuoteDetails({apiData:data});
    };

  const searchInputProps = {
    placeholder:"Enter stock symbol",
    onChange:(e)=>setStockTickerText(e.target.value),
    value:stockTickerText,
    onSubmit:submitHandler};



const [quoteDetails,setQuoteDetails] = useState({apiData:props.initalData});





 



  return (
    <>
     <div>
     <SearchInput {...searchInputProps}/>
     </div>
    
     <QuoteDetail {...quoteDetails}/>
     
  
    </>

   
  )
}

export async function getServerSideProps({req}){

  const baseUrl =
  process.env.NODE_ENV === 'production'
    ? `https://${req.headers.host}/api/`
    : `http://${req.headers.host}/api/`;

  const data = await  fetch(`${baseUrl}YahooApi`, {
    method: 'POST',
    body: JSON.stringify({ symbol: 'SPY' })
  })
  .then(res => res.json());
  return {
    props:{
    initalData:data
    }}

}
