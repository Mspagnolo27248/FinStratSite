import React from 'react'
import classes from './LineChart.module.css'
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

  
export default function LineChart(props) {

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
    <div className={classes.chartContainer}>
    <Line  data={props.chartData}  options={props.chartOptions} />
    </div>
  )
}
