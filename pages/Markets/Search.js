
import { useEffect, useState } from 'react';
import QuoteDetail from '../../components/Markets/QuoteDetail/QuoteDetail'
import SearchInput from '../../components/SearchInput/SearchInput'
import { SetChartData, SetChartOptions } from '../../Utilities/chart-js-wrapper';
import LineChartLarge from "../../components/chart/LineChartLarge";
import { convertFullStringDateToShortDate, getPastDate, getTodaysDate } from '../../Utilities/data-conversions';
import styles from  '../../styles/Markets/search.module.css';
import { BeatLoader } from 'react-spinners';

export default function Search(props){
  const [quoteDetails,setQuoteDetails] = useState();
  const [stockTickerText,setStockTickerText] = useState('SPY'); 
  const [currentChartOptions, setCurrentChartOptions] = useState(SetChartOptions(stockTickerText));
  const [isLoading,setIsLoading]  = useState(true);
  const [currentChartData, setCurrentChartData] = useState(
    SetChartData(
      [],
     [],
      "$"
    )
  );




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
  


useEffect(()=>{  
  submitHandler()
  .then(()=>
  setIsLoading(false)
  )

},[]);

  return (
    <>
     <div>
     <SearchInput {...searchInputProps}/>
     </div>
     {isLoading&&    <div style={{textAlign:"center",marginTop:"2rem"}}>
    <BeatLoader color="blueviolet" />
    </div>}
     {!isLoading&&<QuoteDetail {...quoteDetails}>   
        <div className={styles['page-chart-container']}>
        <LineChartLarge
            chartData={currentChartData}
            chartOptions={currentChartOptions}
        />

        </div>     
  
   </QuoteDetail>}
     
  
    </>

   
  )
}

export async function getServerSideProps({req}){

  const baseUrl =
  process.env.NODE_ENV === 'production'
    ? `https://${req.headers.host}/api/`
    : `http://${req.headers.host}/api/`;

 
  return {
    props:{
      baseUrl:baseUrl,
  }}

}
