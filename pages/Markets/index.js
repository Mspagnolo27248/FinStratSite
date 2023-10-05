import { useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';
import StockCard from '../../components/stock-card/StockCard'
import styles from '../../styles/Markets/index.module.css'

export default  function Markets() {
const SYMBOLS = ['SPY','DIA','QQQ',"VXZ","SHY","IEF","TLT","GLD",]
const [isLoading,setIsloading] = useState(false);

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
    setIsloading(true);
    try {
      const responses = await Promise.all(
        SYMBOLS.map(async item => {
          try {
            const response = await fetch(`/api/YahooApi`, {
              method: 'POST',
              body: JSON.stringify({ symbol: item }),
            });

            if (!response.ok) {
              throw new Error(`Request failed with status: ${response.status}`);
            }

            return response.json();
          } catch (error) {
            console.error(`Error fetching data for ${item}:`, error);
            return null; // Return null for failed requests
          }
        })
      );

      const formattedData = responses
        .filter(item => item !== null) // Filter out failed requests
        .map((item, index) => ({
          isPositive: item.regularMarketChange > 0,
          itemName: item.shortName,
          itemPrice: item.regularMarketPrice,
          priceDelta: (item.regularMarketChange || 0).toFixed(2),
          percentDelta: (item.regularMarketChangePercent ).toFixed(2),
          volume: item.regularMarketVolume || 0,
          index: index,
        }));

      setCardData(formattedData.sort((a, b) => a.index - b.index));
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
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
