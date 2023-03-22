import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react';
import QuoteDetail from '../../components/Markets/QuoteDetail/QuoteDetail'
import SearchInput from '../../components/SearchInput/SearchInput'

export default function Search(){
  const [stockTickerText,setStockTickerText] = useState('');
const submitHandler = ()=>{
  alert(stockTickerText)
}
  const searchInputProps = {
    placeholder:"Enter stock symbol",
    onChange:(e)=>setStockTickerText(e.target.value),
    value:stockTickerText,
    onSubmit:submitHandler}

  return (
    <>
     <div>
     <SearchInput {...searchInputProps}/>
     </div>
    
     <QuoteDetail/>
     
  
    </>

   
  )
}
