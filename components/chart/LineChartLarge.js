import React from 'react'
import classes from './LineChartLarge.module.css'
import { Line } from 'react-chartjs-2'
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

  
export default function LineChartLarge(props) {

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
      )
    
    
      


  return (
    <Line  data={props.chartData}  options={props.chartOptions} />
)
}
