// import React from 'react'
// import { Bar, Pie, Line } from 'react-chartjs-2'
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   PointElement,
//   LineElement,
//   ArcElement,
//   Tooltip,
//   Legend,
// } from 'chart.js'

// // Register necessary components for Chart.js
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   PointElement,
//   LineElement,
//   ArcElement,
//   Tooltip,
//   Legend,
// )

// const DataChart = ({ data, chartType }) => {
//   if (!data || !chartType || data.length === 0) return null

//   // Dynamically determine columns
//   const columns = Object.keys(data[0])

//   // Separate columns into non-numeric and numeric
//   const nonNumericColumns = columns.filter(
//     (col) => typeof data[0][col] !== 'number' && isNaN(Number(data[0][col])),
//   )
//   const numericColumns = columns.filter(
//     (col) => typeof data[0][col] === 'number' || !isNaN(Number(data[0][col])),
//   )

//   // Ensure we have the necessary columns
//   if (nonNumericColumns.length < 1 || numericColumns.length < 1) return null

//   // Use the first non-numeric column for labels
//   const labels = [...new Set(data.map((item) => item[nonNumericColumns[0]]))]

//   // Use the second non-numeric column (if available) for grouping
//   const groupByColumn = nonNumericColumns.length > 1 ? nonNumericColumns[1] : null

//   // Dynamically create datasets
//   let datasets
//   if (groupByColumn) {
//     const groups = [...new Set(data.map((item) => item[groupByColumn]))]
//     datasets = groups.map((group) => ({
//       label: group,
//       data: labels.map((label) => {
//         const matchingItem = data.find(
//           (item) => item[nonNumericColumns[0]] === label && item[groupByColumn] === group,
//         )
//         return matchingItem ? matchingItem[numericColumns[0]] : 0
//       }),
//       backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
//         Math.random() * 255,
//       )}, ${Math.floor(Math.random() * 255)}, 0.6)`,
//     }))
//   } else {
//     datasets = [
//       {
//         label: numericColumns[0],
//         data: labels.map((label) => {
//           const matchingItem = data.find((item) => item[nonNumericColumns[0]] === label)
//           return matchingItem ? matchingItem[numericColumns[0]] : 0
//         }),
//         backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
//           Math.random() * 255,
//         )}, ${Math.floor(Math.random() * 255)}, 0.6)`,
//       },
//     ]
//   }

//   // Prepare chart data
//   const chartData = {
//     labels,
//     datasets,
//   }

//   // Chart options with dynamic tooltips and responsive sizing
//   const options = {
//     plugins: {
//       tooltip: {
//         callbacks: {
//           label: function (tooltipItem) {
//             const datasetLabel = tooltipItem.dataset.label || ''
//             const value = tooltipItem.raw
//             return `${datasetLabel}: ${value}`
//           },
//         },
//       },
//       legend: {
//         position: 'top',
//       },
//     },
//     responsive: true,
//     maintainAspectRatio: false, // Allows chart to grow based on container
//     scales: {
//       x: {
//         beginAtZero: true,
//       },
//       y: {
//         beginAtZero: true,
//       },
//     },
//   }

//   // Render the appropriate chart based on chartType
//   const renderChart = () => {
//     switch (chartType) {
//       case 'bar':
//         return <Bar data={chartData} options={options} />
//       case 'pie': {
//         const pieData = {
//           labels: labels,
//           datasets: datasets.map((dataset) => ({
//             data: dataset.data,
//             backgroundColor: dataset.data.map(
//               () =>
//                 `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
//                   Math.random() * 255,
//                 )}, ${Math.floor(Math.random() * 255)}, 0.6)`,
//             ),
//           })),
//         }
//         return <Pie data={pieData} options={options} />
//       }
//       case 'line':
//         return <Line data={chartData} options={options} />
//       default:
//         return null
//     }
//   }

//   return (
//     <div
//       className="chart-container"
//       style={{
//         width: '100%',
//         height: '500px', // Adjust the height as needed
//         margin: '0 auto',
//       }}
//     >
//       {renderChart()}
//     </div>
//   )
// }

// export default DataChart

import React from 'react'
import {
  CChartBar,
  CChartLine,
  CChartPie,
  CChartDoughnut,
  CChartPolarArea,
  CChartRadar,
} from '@coreui/react-chartjs'

const DataChart = ({ data }) => {
  if (!data || !data.data || data.data.length === 0) return <p>No Data Available</p>

  console.log(data)

  // Extract fields from latest entry
  const { resultType, chartType, xAxis, yAxis, categoryColumn, valueColumn } = data
  const chartData = data.data // Fix chartData assignment

  let labels = []
  let dataset = []

  if (resultType === 'visualize') {
    if (chartType === 'bar' || chartType === 'line') {
      labels = chartData.map((item) => item[xAxis])
      dataset = [
        {
          label: yAxis,
          backgroundColor: chartType === 'bar' ? '#36A2EB' : 'rgba(220, 220, 220, 0.2)',
          borderColor: chartType === 'line' ? '#36A2EB' : undefined,
          data: chartData.map((item) => item[yAxis]),
        },
      ]
    } else if (chartType === 'pie' || chartType === 'doughnut' || chartType === 'polarArea') {
      labels = chartData.map((item) => item[categoryColumn])
      dataset = [
        {
          data: chartData.map((item) => item[valueColumn]),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        },
      ]
    }
  }

  const processedData = {
    labels,
    datasets: dataset,
  }

  // Render appropriate chart
  switch (chartType) {
    case 'bar':
      return <CChartBar data={processedData} />
    case 'line':
      return <CChartLine data={processedData} />
    case 'pie':
      return <CChartPie data={processedData} />
    case 'doughnut':
      return <CChartDoughnut data={processedData} />
    case 'polarArea':
      return <CChartPolarArea data={processedData} />
    case 'radar':
      return <CChartRadar data={processedData} />
    default:
      return <p>Unsupported Chart Type</p>
  }
}

export default DataChart
