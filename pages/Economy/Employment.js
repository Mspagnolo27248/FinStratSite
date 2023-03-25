import React, { Fragment, useEffect,useState } from 'react'
import LineChart from '../../components/chart/LineChart'
import {GetJsonFromFile, GetTestData} from '../../Utilities/fs_wrapper'
import {SetChartOptions} from '../../Utilities/chart-js-wrapper'
import { SetChartData } from '../../Utilities/chart-js-wrapper'
import { FetchSeriesObservationData } from '../../Utilities/fetch-fred'



export default function EmploymentPage(props) {

const UnemploymentChartOptions = SetChartOptions('Unemployment Rate')
const UnemplymentChartData =  SetChartData(
props.UnemploymentRate.observations.map((item)=>item.value),
props.UnemploymentRate.observations.map((item)=>item.date),
' % of Unemployed'
)


const LaborForceChartOptions = SetChartOptions('Labor Force Participation Rate')
const LaborForceChartData =  SetChartData(
props.LaborForceParticipation.observations.map((item)=>item.value),
props.LaborForceParticipation.observations.map((item)=>item.date),
'% of Total Labor Force'
)


const EmploymentChartOptions = SetChartOptions('Employeed Workers')
const EmploymentChartData =  SetChartData(
props.Employment.observations.map((item)=>item.value),
props.Employment.observations.map((item)=>item.date),
'Thousands of Workers'
)


const TotalLaborForceChartOptions = SetChartOptions('Total Labor Force  (Workers)')
const TotalLaborForceChartData =  SetChartData(
props.LaborForce.observations.map((item)=>item.value),
props.LaborForce.observations.map((item)=>item.date),
'Thousands of People');

const UnemploymentU6ChartOptions = SetChartOptions('Unemployment Rate U6')
const UnemplymentU6ChartData =  SetChartData(
props.UnemploymentRateU6.observations.map((item)=>item.value),
props.UnemploymentRateU6.observations.map((item)=>item.date),
' % of Unemployed'
)

  return (
    <Fragment>
    <div>    
    <LineChart chartData={UnemplymentChartData} chartOptions={UnemploymentChartOptions}/>  
    <LineChart chartData={LaborForceChartData} chartOptions={LaborForceChartOptions}/>
    </div>

    <div>    
    <LineChart chartData={EmploymentChartData} chartOptions={EmploymentChartOptions}/> 
    <LineChart chartData={TotalLaborForceChartData} chartOptions={TotalLaborForceChartOptions}/>
    </div>
    <div>
    <LineChart chartData={UnemplymentU6ChartData} chartOptions={UnemploymentU6ChartOptions}/>  
    </div>

    </Fragment>
  )
}

export async function getServerSideProps(){
    
    const fredCodes = GetJsonFromFile("content/data", "FREDSeries.json");
    const now = new Date().toISOString().substring(0,10);
    const start_date = '2015-10-01';
    const end_date =  new Date().toISOString().split('T')[0];
    
    const UnemploymentRate =  await FetchSeriesObservationData(fredCodes.UnemploymentRate.series,start_date,end_date);
    const LaborForceParticipation = await  FetchSeriesObservationData(fredCodes.LaborForceParticipation.series,start_date,end_date);
    const Employment = await FetchSeriesObservationData(fredCodes.NonFarmEmployment.series,start_date,end_date);
    const LaborForce = await FetchSeriesObservationData(fredCodes.LaborForce.series,start_date,end_date);
    const UnemploymentRateU6 =  await FetchSeriesObservationData(fredCodes['UnemploymentRate U6'].series,start_date,end_date);
        return{
            props:{
                UnemploymentRate:UnemploymentRate,
                LaborForceParticipation:LaborForceParticipation,
                Employment:Employment,
                LaborForce:LaborForce,
                UnemploymentRateU6:  UnemploymentRateU6,         

            }
        }
}




