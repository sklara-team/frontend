import React from 'react'
import { Bar, Pie, Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'

// Register the required Chart.js modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
)

const DataChart = ({ data, chartType }) => {
  if (!data || !chartType) return null

  // Validate the input data
  const columns = Object.keys(data[0]) // Get all keys of the first row

  // Identify non-numeric columns for x-axis and numeric columns for y-axis
  const nonNumericColumns = columns.filter(
    (col) => typeof data[0][col] !== 'number' && isNaN(Number(data[0][col]))
  )
  const numericColumns = columns.filter(
    (col) => typeof data[0][col] === 'number' || !isNaN(Number(data[0][col]))
  )

  if (numericColumns.length === 0 || nonNumericColumns.length === 0) return null

  // Assuming the first non-numeric column is the label field (like product_id or product_category_name)
  const labels = data.map((item) => item[nonNumericColumns[0]].trim())

  const chartData = {
    labels, // Use non-numeric column for the x-axis (labels)
    datasets: numericColumns.map((col, index) => ({
      label: col,
      data: data.map((item) => Number(item[col])), // Convert to number here
      backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`,
    })),
  }

  // Render the chart dynamically based on chartType
  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return <Bar data={chartData} />
      case 'pie':
        return <Pie data={chartData} />
      case 'line':
        return <Line data={chartData} />
      default:
        return null
    }
  }

  return <div className="chart-container">{renderChart()}</div>
}

export default DataChart
