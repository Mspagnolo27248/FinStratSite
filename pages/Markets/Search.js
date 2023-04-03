
import { useEffect, useState } from 'react';
import QuoteDetail from '../../components/Markets/QuoteDetail/QuoteDetail'
import SearchInput from '../../components/SearchInput/SearchInput'
import { SetChartData, SetChartOptions } from '../../Utilities/chart-js-wrapper';
import LineChartLarge from "../../components/chart/LineChartLarge";
import { convertFullStringDateToShortDate, getPastDate, getTodaysDate } from '../../Utilities/data-conversions';
import styles from  '../../styles/Markets/search.module.css';

export default function Search(props){
  const [quoteDetails,setQuoteDetails] = useState({apiData:props.initalData});
  const [stockTickerText,setStockTickerText] = useState(''); 
  const [currentChartOptions, setCurrentChartOptions] = useState(SetChartOptions(props.ticker));

  const [currentChartData, setCurrentChartData] = useState(SetChartData(
      props.historyData.map((item) => item.adjClose),
      props.historyData.map((item) => item.date),
      "$"));




  const submitHandler = async ()=>{
    const data = await  fetch('/api/YahooApi', {
        method: 'POST',
        body: JSON.stringify({ symbol: stockTickerText })
      })
      .then(res => res.json());
          
   

    const yahooRawData = await fetch(`/api/YahooApi/StockHistory`,{
      method: 'POST',
        body: JSON.stringify({ 
        symbol: stockTickerText,
        from:getPastDate(-5),
        to:getTodaysDate(),
        period:'d'
     })})
     .then(res => res.json());
    const addDateData = yahooRawData.map((obj)=> { return {...obj,date:convertFullStringDateToShortDate(obj.date)}});
    addDateData.reverse();
    setCurrentChartData(
      SetChartData(
        addDateData.map((item) => item.adjClose),
        addDateData.map((item) => item.date),
        "$"));
    
        setCurrentChartOptions(
          SetChartOptions(stockTickerText));

          setQuoteDetails({apiData:data});
    };


    const searchInputProps = {
      placeholder:"Enter stock symbol",
      onChange:(e)=>setStockTickerText(e.target.value),
      value:stockTickerText,
      onSubmit:submitHandler};
  



  return (
    <>
     <div>
     <SearchInput {...searchInputProps}/>
     </div>
    
     <QuoteDetail {...quoteDetails}>   
        <div className={styles['page-chart-container']}>
        <LineChartLarge
            chartData={currentChartData}
            chartOptions={currentChartOptions}
        />

        </div>
      
  
   </QuoteDetail>
     
  
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


  const yahooRawData = await fetch(`${baseUrl}YahooApi/StockHistory`,{
  method: "POST",
  body: JSON.stringify({
    symbol: 'SPY',
    from:getPastDate(-5),
    to:getTodaysDate(),
    period:'d' // see the docs for the full list
  })}).then(res => res.json());
  const historyData = yahooRawData.map((obj)=> { return {...obj,date:convertFullStringDateToShortDate(obj.date)}});
  historyData.reverse();

  return {
    props:{
    initalData:data,
    historyData:historyData,
  ticker:'SPY'    }}

}
