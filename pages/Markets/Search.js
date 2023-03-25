
import { useState } from 'react';
import QuoteDetail from '../../components/Markets/QuoteDetail/QuoteDetail'
import SearchInput from '../../components/SearchInput/SearchInput'
import { SetChartData, SetChartOptions } from '../../Utilities/chart-js-wrapper';
import LineChartLarge from "../../components/chart/LineChartLarge";
import { convertFullStringDateToShortDate, getPastDate, getTodaysDate } from '../../Utilities/data-conversions';
import styles from  '../../styles/Markets/search.module.css';

export default function Search(props){
  const [currentChartOptions, setCurrentChartOptions] = useState(
    SetChartOptions('SPY')
  );

  const [currentChartData, setCurrentChartData] = useState(
    SetChartData(
      props.historyData.map((item) => item.adjClose),
      props.historyData.map((item) => item.date),
      "$"
    )
  );
  const [stockTickerText,setStockTickerText] = useState('');

  const submitHandler = async ()=>{
    const data = await  fetch('/api/YahooApi', {
        method: 'POST',
        body: JSON.stringify({ symbol: stockTickerText })
      })
      .then(res => res.json());
          
    setQuoteDetails({apiData:data});

    const yahooRawData = await fetch(`/api/YahooApi/StockHistory`,{
      method: 'POST',
        body: JSON.stringify({ 
        symbol: stockTickerText,
        startDate:getPastDate(-5),
        endDate:getTodaysDate()
     })})
     .then(res => res.json());
    const historyData = yahooRawData.map((obj)=> { return {...obj,date:convertFullStringDateToShortDate(obj.date)}});
    historyData.reverse();

    setCurrentChartData(
      SetChartData(
        historyData.map((item) => item.adjClose),
        historyData.map((item) => item.date),
        "$"
      )
    )

    setCurrentChartOptions(
      SetChartOptions(stockTickerText)
    );
   
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


  const yahooRawData = await fetch(`${baseUrl}YahooApi/StockHistory`).then(res => res.json());
  const historyData = yahooRawData.map((obj)=> { return {...obj,date:convertFullStringDateToShortDate(obj.date)}});
  historyData.reverse();

  return {
    props:{
    initalData:data,
    historyData:historyData
    }}

}
