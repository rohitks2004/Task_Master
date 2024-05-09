import React from 'react'
import { 
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    YAxis,
    XAxis
} from "recharts"
//import { chartData } from '../assets/data'
const Chart = ({data}) => {
  return (
    <ResponsiveContainer
    width={"100%"} height={500} 
    >
        <BarChart width={100} height={40} data={data}>
            <YAxis dataKey={"total"}/>
            <XAxis dataKey={"name"}/>
            <Tooltip/>
            <Legend/>
            <CartesianGrid strokeDasharray={"5 5"} />
            <Bar dataKey={"total"} fill='#8884d8'/>
        </BarChart>

    </ResponsiveContainer>

  )
}

export default Chart