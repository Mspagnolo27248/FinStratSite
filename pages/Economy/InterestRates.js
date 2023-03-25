import React, { Fragment, useEffect,useState } from 'react'
import {GetJsonFromFile, GetTestData} from '../../Utilities/fs_wrapper'
import {SetChartOptions} from '../../Utilities/chart-js-wrapper'
import { SetChartData } from '../../Utilities/chart-js-wrapper'
import LineChart from '../../components/chart/LineChart';
import { FetchReleaseData, FetchSeriesObservationData } from '../../Utilities/fetch-fred';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'



export default function InterestRatesPage(props) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  )

const TenYearChartOptions = SetChartOptions('10 Year Treasury')
const TenYearChartData =  SetChartData(
props.tenYear.observations.map((item)=>item.value),
props.tenYear.observations.map((item)=>item.date),
'%'
)

const TwoYearChartOptions = SetChartOptions('2 Year Treasury')
const TwoYearChartData =  SetChartData(
props.twoYear.observations.map((item)=>item.value),
props.twoYear.observations.map((item)=>item.date),
'%'
)

const BreakEvenChartOptions = SetChartOptions('10year Breakevens (Inflation Expectations)')
const BreakevenChartData =  SetChartData(
props.breakevens.observations.map((item)=>item.value),
props.breakevens.observations.map((item)=>item.date),
'%'
)

const  FedFundsChartOptions = SetChartOptions(' Fed Funds Upper Target Rate')
const  FedFundsChartData =  SetChartData(
props.fedFundsTarget.observations.map((item)=>item.value),
props.fedFundsTarget.observations.map((item)=>item.date),
'%'
)

const  mortgageChartOptions = SetChartOptions('30 Year Fixed Mortgage')
const  mortgaeChartData =  SetChartData(
props.mortgageRate.observations.map((item)=>item.value),
props.mortgageRate.observations.map((item)=>item.date),
'%'
)

const TenMinusTwosChartOptions = SetChartOptions('10yr Minus 2yr Spreads')
const TenMinusTwosChartData = {
  labels: props.tensMinusTwos.observations.map((item)=>item.date),
  datasets: [
    {
    label: '%',
    borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    data: props.tensMinusTwos.observations.map((item)=>item.value),
  },
  {
    label: '0',
    borderColor: 'rgb(0,0 , 0)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    data: props.tensMinusTwos.observations.map((item)=>0),
  }
]
}






  return (
    <Fragment>
    <div>    
    <LineChart chartData={TenYearChartData} chartOptions={TenYearChartOptions}/>  
    <LineChart chartData={TwoYearChartData} chartOptions={TwoYearChartOptions}/>
    </div>

    <div>    
    <LineChart chartData={TenMinusTwosChartData} chartOptions={TenMinusTwosChartOptions}/>
    <LineChart chartData={FedFundsChartData} chartOptions={FedFundsChartOptions}/>
    </div>

    <div>
    <LineChart chartData={BreakevenChartData} chartOptions={BreakEvenChartOptions}/> 
    <LineChart chartData={mortgaeChartData} chartOptions={mortgageChartOptions}/> 
    </div>
 
    </Fragment>
  )
}

export async function getServerSideProps(){
  const fredCodes = GetJsonFromFile("content/data", "FREDSeries.json");

    const now = new Date().toISOString().substring(0,10);
    const start_date = '2015-10-01';
    const end_date =    new Date().toISOString().split('T')[0];
  
    const tenYear =  await FetchSeriesObservationData(fredCodes.TenYearTreasury.series,start_date,end_date);
    const twoYear =  await FetchSeriesObservationData(fredCodes.TwoYearTreasury.series,start_date,end_date);
    const tensMinusTwos = await FetchSeriesObservationData(fredCodes.TensMinusTwosTreasury.series,start_date,end_date);
    const fedFunds = await FetchSeriesObservationData(fredCodes.FedFunds.series,start_date,end_date);
    const breakevens = await FetchSeriesObservationData(fredCodes.TenYearBreakEven.series,start_date,end_date);
    const fedFundsTarget = await FetchSeriesObservationData(fredCodes.FedFundsUpperTarget.series,start_date,end_date);
    const mortgageRate = await FetchSeriesObservationData(fredCodes.MortgageRate.series,start_date,end_date);

   
        return{
            props:{
                tenYear:tenYear,
                tensMinusTwos:tensMinusTwos,
                fedFundsTarget:fedFundsTarget,
                fedFunds:fedFunds,
                breakevens:breakevens,
                mortgageRate:mortgageRate,
                twoYear:twoYear,
                
            }
        }
}




