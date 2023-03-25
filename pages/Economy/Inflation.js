import React, { Fragment, useEffect,useState } from 'react'
import LineChart from '../../components/chart/LineChart'
import {GetJsonFromFile, GetTestData} from '../../Utilities/fs_wrapper'
import {SetChartOptions} from '../../Utilities/chart-js-wrapper'
import { SetChartData } from '../../Utilities/chart-js-wrapper'
import { FetchReleaseData, FetchSeriesObservationData } from '../../Utilities/fetch-fred'
import { MonthOverMonthPercentMonthly, YearOverYearPercentMonthly } from '../../Utilities/tends-js'



export default function InflationPage(props) {

const cpiHeadlineYoyChartOptions = SetChartOptions('CPI Inflation year over year')
const cpiHeadlineYoyChartData =  SetChartData(
  props.headCpiYoy.observations.map((item)=>item.value),
  props.headCpiYoy.observations.map((item)=>item.date),
    '%'
    )

const cpiYoyChartOptions = SetChartOptions('CPI Inflation (Core) year over year')
const cpiYoyChartData =  SetChartData(
    props.coreCpiYoY.observations.map((item)=>item.value),
    props.coreCpiYoY.observations.map((item)=>item.date),
      '%'
      )
  
 

const coreCpiIndexChartOptions = SetChartOptions('CPI Inflation (Core) month over month')
const coreCpiIndexData = SetChartData(
    props.coreCpiMom.observations.map((item)=>item.value),
    props.coreCpiMom.observations.map((item)=>item.date),
      'Index'
      )

const headCpiMomIndexChartOptions = SetChartOptions(' CPI Inflation month over month ')
const headCpiMomIndexData = SetChartData(
    props.headCpiMom.observations.map((item)=>item.value),
    props.headCpiMom.observations.map((item)=>item.date),
      '% Chg.'
      )





  return (
    <Fragment>
    <div>    
    <LineChart chartData={cpiHeadlineYoyChartData} chartOptions={cpiHeadlineYoyChartOptions}/>  
    <LineChart chartData={cpiYoyChartData} chartOptions={cpiYoyChartOptions}/>
    </div>

    <div>    
    <LineChart chartData={headCpiMomIndexData} chartOptions={headCpiMomIndexChartOptions}/> 
    <LineChart chartData={coreCpiIndexData} chartOptions={coreCpiIndexChartOptions}/>
    </div>
 
    </Fragment>
  )
}
//getServerSideProps
export async function getServerSideProps(){
    const fredCodes = GetJsonFromFile("content/data", "FREDSeries.json");
    const now = new Date().toISOString().substring(0,10);
    const start_date = '2015-10-01';
    const end_date =    new Date().toISOString().split('T')[0];
    
    // const cpiMom =  await FetchSeriesObservationData(fredCodes.CpiChgPrevPeriord,start_date,end_date);
    // const cpiYoy =  await FetchSeriesObservationData(fredCodes.CpiPrevYear,start_date,end_date);
 
    const coreCpiIndex = await FetchSeriesObservationData(fredCodes.CpiIndexCore.series,start_date,end_date)
    const headCpiIndex = await FetchSeriesObservationData(fredCodes.CpiIndexHeadline.series,start_date,end_date)
    const coreCpiYoY = YearOverYearPercentMonthly(coreCpiIndex);
    const headCpiYoy = YearOverYearPercentMonthly(headCpiIndex);
    const headCpiMom =MonthOverMonthPercentMonthly(headCpiIndex);
    const coreCpiMom = MonthOverMonthPercentMonthly(coreCpiIndex);
        return{
            props:{
               
                coreCpiYoY:coreCpiYoY,
                headCpiYoy:headCpiYoy,
                coreCpiMom:coreCpiMom,
                headCpiMom:headCpiMom,              
            }
            
        }

    }



