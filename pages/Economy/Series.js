import React, { Fragment } from 'react'
import { GetJsonFromFile, GetTestData } from '../../Utilities/fs_wrapper'
import Link from 'next/link'
import { FetchSeriesObservationData } from '../../Utilities/fetch-fred'
import classes from '../../styles/Economy/Series.module.css'



export default function ReleasePage
(props) {


  return (
  <Fragment>
    <div>
        <h1>Economic Release Data</h1>
        <h2>{new Date().toLocaleDateString()}</h2>
        <Link href='/releases/dates'>Upcoming Dates</Link>
    </div>

    <div className={classes.gridContainer}>
    <div className={`${classes.gridItem} ${classes.gridItem1} `} > Release Name </div>
        <div className={classes.gridItem}> Current Release </div>
        <div className={classes.gridItem} > Prior Release </div>
        <div className={classes.gridItem}>  Two Back Release  </div>
    {props.releaseData.map((item,idx)=>{
        return (
       <Fragment  key={idx}>
       <div className={`${classes.gridItem} ${classes.gridItem1} `} > {item.serries_id} </div>
        <div className={classes.gridItem}> {(+item.current).toLocaleString("en-US")}  </div>
        <div className={classes.gridItem} > {(+item.prior).toLocaleString("en-US")}  </div>
        <div className={classes.gridItem}>  {(+item.twoback).toLocaleString("en-US")}   </div>
       </Fragment>
       
 
        )
    })}
    </div>


  </Fragment>
  )
}


export async function getStaticProps(){
    //{"serries_id":"Gross Domestic Product","current":951,"prior":656,"twoback":989}
    const fredCodes = GetJsonFromFile("content/data", "FREDSeries.json");
    const fredArray = Object.values(fredCodes);
    // const now = new Date().toISOString().substring(0,10);
    const newDate = new Date()
    newDate.setFullYear(newDate.getFullYear() - 3);
    const start_date = newDate.toISOString().split('T')[0];
    const end_date =    new Date().toISOString().split('T')[0];
    const releaseData = []
     for(let item of fredArray){
       const allObservations = await FetchSeriesObservationData(item.series,start_date,end_date)

       const sortedDates = allObservations.observations.sort((a,b) => (a.date < b.date) ? 1 : ((b.date < a.date) ? -1 : 0));
       releaseData.push({serries_id:item.friendly,
        current:sortedDates[0].value,
        prior:sortedDates[1].value,
        twoback:sortedDates[2].value})

    };
   
        return{
            props:{
                releaseData:releaseData,
             

            }
        }
}