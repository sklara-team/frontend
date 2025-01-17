// import React from 'react'
// import { Bar, Pie, Line, Scatter } from 'react-chartjs-2'
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
//   ScatterController, // Ensure this is imported for scatter charts
// } from 'chart.js'

// // Register necessary components for Chart.js
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   PointElement, // Ensure PointElement is registered for scatter chart points
//   LineElement,
//   ArcElement,
//   Tooltip,
//   Legend,
//   ScatterController, // Ensure the scatter controller is registered
// )

// const DataChart = ({ data, chartType }) => {
//   if (!data || !chartType) return null

//   const columns = Object.keys(data[0])

//   const nonNumericColumns = columns.filter(
//     (col) => typeof data[0][col] !== 'number' && isNaN(Number(data[0][col])),
//   )
//   const numericColumns = columns.filter(
//     (col) => typeof data[0][col] === 'number' || !isNaN(Number(data[0][col])),
//   )

//   if (numericColumns.length === 0 || nonNumericColumns.length === 0) return null

//   const labels = data.map((item) => item[nonNumericColumns[0]].trim())

//   const chartData = {
//     labels,
//     datasets: numericColumns.map((col) => ({
//       label: col,
//       data: data.map((item) => ({
//         x: item[nonNumericColumns[0]].trim(), // Assuming the first non-numeric column is used for x (category)
//         y: Number(item[col]), // Numeric value for y (e.g., total revenue)
//       })),
//       backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`,
//     })),
//   }

//   const renderChart = () => {
//     switch (chartType) {
//       case 'bar':
//         return <Bar data={chartData} />
//       case 'pie':
//         return <Pie data={chartData} />
//       case 'line':
//         return <Line data={chartData} />
//       case 'scatter':
//         return <Scatter data={chartData} />
//       default:
//         return null
//     }
//   }

//   return <div className="chart-container">{renderChart()}</div>
// }

// export default DataChart

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
//   PointElement, // Ensure PointElement is registered for line charts
//   LineElement,
//   ArcElement,
//   Tooltip,
//   Legend,
// )

// const DataChart = ({ data, chartType }) => {
//   if (!data || !chartType) return null

//   const columns = Object.keys(data[0])

//   const nonNumericColumns = columns.filter(
//     (col) => typeof data[0][col] !== 'number' && isNaN(Number(data[0][col])),
//   )
//   const numericColumns = columns.filter(
//     (col) => typeof data[0][col] === 'number' || !isNaN(Number(data[0][col])),
//   )

//   if (numericColumns.length === 0 || nonNumericColumns.length === 0) return null

//   const labels = data.map((item) => item[nonNumericColumns[0]].trim())

//   const chartData = {
//     labels,
//     datasets: numericColumns.map((col) => ({
//       label: col,
//       data: data.map((item) => ({
//         x: item[nonNumericColumns[0]].trim(), // Assuming the first non-numeric column is used for x (category)
//         y: Number(item[col]), // Numeric value for y (e.g., total revenue)
//       })),
//       backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`,
//     })),
//   }

//   const renderChart = () => {
//     switch (chartType) {
//       case 'bar':
//         return <Bar data={chartData} />
//       case 'pie':
//         return <Pie data={chartData} />
//       case 'line':
//         return <Line data={chartData} />
//       default:
//         return null
//     }
//   }

//   return <div className="chart-container">{renderChart()}</div>
// }

// export default DataChart

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

// Register necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
)

const DataChart = ({ data, chartType }) => {
  if (!data || !chartType || data.length === 0) return null

  // Dynamically determine columns
  const columns = Object.keys(data[0])

  // Separate columns into non-numeric and numeric
  const nonNumericColumns = columns.filter(
    (col) => typeof data[0][col] !== 'number' && isNaN(Number(data[0][col])),
  )
  const numericColumns = columns.filter(
    (col) => typeof data[0][col] === 'number' || !isNaN(Number(data[0][col])),
  )

  // Ensure we have the necessary columns
  if (nonNumericColumns.length < 1 || numericColumns.length < 1) return null

  // Use the first non-numeric column for labels
  const labels = [...new Set(data.map((item) => item[nonNumericColumns[0]]))]

  // Use the second non-numeric column (if available) for grouping
  const groupByColumn = nonNumericColumns.length > 1 ? nonNumericColumns[1] : null

  // Dynamically create datasets
  let datasets
  if (groupByColumn) {
    const groups = [...new Set(data.map((item) => item[groupByColumn]))]
    datasets = groups.map((group) => ({
      label: group,
      data: labels.map((label) => {
        const matchingItem = data.find(
          (item) => item[nonNumericColumns[0]] === label && item[groupByColumn] === group,
        )
        return matchingItem ? matchingItem[numericColumns[0]] : 0
      }),
      backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
        Math.random() * 255,
      )}, ${Math.floor(Math.random() * 255)}, 0.6)`,
    }))
  } else {
    datasets = [
      {
        label: numericColumns[0],
        data: labels.map((label) => {
          const matchingItem = data.find((item) => item[nonNumericColumns[0]] === label)
          return matchingItem ? matchingItem[numericColumns[0]] : 0
        }),
        backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
          Math.random() * 255,
        )}, ${Math.floor(Math.random() * 255)}, 0.6)`,
      },
    ]
  }

  // Prepare chart data
  const chartData = {
    labels,
    datasets,
  }

  // Chart options with dynamic tooltips and responsive sizing
  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const datasetLabel = tooltipItem.dataset.label || ''
            const value = tooltipItem.raw
            return `${datasetLabel}: ${value}`
          },
        },
      },
      legend: {
        position: 'top',
      },
    },
    responsive: true,
    maintainAspectRatio: false, // Allows chart to grow based on container
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  }

  // Render the appropriate chart based on chartType
  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return <Bar data={chartData} options={options} />
      case 'pie': {
        const pieData = {
          labels: labels,
          datasets: datasets.map((dataset) => ({
            data: dataset.data,
            backgroundColor: dataset.data.map(
              () =>
                `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
                  Math.random() * 255,
                )}, ${Math.floor(Math.random() * 255)}, 0.6)`,
            ),
          })),
        }
        return <Pie data={pieData} options={options} />
      }
      case 'line':
        return <Line data={chartData} options={options} />
      default:
        return null
    }
  }

  return (
    <div
      className="chart-container"
      style={{
        width: '100%',
        height: '500px', // Adjust the height as needed
        margin: '0 auto',
      }}
    >
      {renderChart()}
    </div>
  )
}

export default DataChart

// import React from 'react';
// import { Bar, Pie, Line } from 'react-chartjs-2';
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
// } from 'chart.js';

// // Register necessary components for Chart.js
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   PointElement,
//   LineElement,
//   ArcElement,
//   Tooltip,
//   Legend
// );

// const DataChart = ({ data, chartType }) => {
//   if (!data || !chartType || data.length === 0) return null;

//   // Dynamically determine columns
//   const columns = Object.keys(data[0]);

//   // Separate columns into non-numeric and numeric
//   const nonNumericColumns = columns.filter(
//     (col) => typeof data[0][col] !== 'number' && isNaN(Number(data[0][col]))
//   );
//   const numericColumns = columns.filter(
//     (col) => typeof data[0][col] === 'number' || !isNaN(Number(data[0][col]))
//   );

//   // Ensure we have the necessary columns
//   if (nonNumericColumns.length < 1 || numericColumns.length < 1) return null;

//   // Use the first non-numeric column for labels
//   const labels = [...new Set(data.map((item) => item[nonNumericColumns[0]]))];

//   // Use the second non-numeric column (if available) for grouping
//   const groupByColumn = nonNumericColumns.length > 1 ? nonNumericColumns[1] : null;

//   // Dynamically create datasets
//   let datasets;
//   if (groupByColumn) {
//     const groups = [...new Set(data.map((item) => item[groupByColumn]))];
//     datasets = groups.map((group) => ({
//       label: group,
//       data: labels.map((label) => {
//         const matchingItem = data.find(
//           (item) =>
//             item[nonNumericColumns[0]] === label &&
//             item[groupByColumn] === group
//         );
//         return matchingItem ? matchingItem[numericColumns[0]] : 0;
//       }),
//       backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
//         Math.random() * 255
//       )}, ${Math.floor(Math.random() * 255)}, 0.6)`,
//     }));
//   } else {
//     datasets = [
//       {
//         label: numericColumns[0],
//         data: labels.map((label) => {
//           const matchingItem = data.find(
//             (item) => item[nonNumericColumns[0]] === label
//           );
//           return matchingItem ? matchingItem[numericColumns[0]] : 0;
//         }),
//         backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
//           Math.random() * 255
//         )}, ${Math.floor(Math.random() * 255)}, 0.6)`,
//       },
//     ];
//   }

//   // Determine the maximum Y-axis value dynamically
//   const maxValue = Math.max(
//     ...datasets.flatMap((dataset) => dataset.data)
//   );

//   // Determine an appropriate step size
//   const stepSize = Math.ceil(maxValue / 5); // Divide into ~5 steps dynamically

//   // Chart options with dynamic Y-axis
//   const options = {
//     scales: {
//       y: {
//         beginAtZero: true,
//         ticks: {
//           stepSize, // Dynamically calculated step size
//         },
//       },
//     },
//     plugins: {
//       tooltip: {
//         callbacks: {
//           label: function (tooltipItem) {
//             const datasetLabel = tooltipItem.dataset.label || '';
//             const value = tooltipItem.raw;
//             return `${datasetLabel}: ${value}`;
//           },
//         },
//       },
//     },
//     responsive: true,
//     maintainAspectRatio: false,
//   };

//   // Render the appropriate chart based on chartType
//   const renderChart = () => {
//     switch (chartType) {
//       case 'bar':
//         return <Bar data={{ labels, datasets }} options={options} />;
//       case 'pie': {
//         const pieData = {
//           labels: labels,
//           datasets: datasets.map((dataset) => ({
//             data: dataset.data,
//             backgroundColor: dataset.data.map(
//               () =>
//                 `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
//                   Math.random() * 255
//                 )}, ${Math.floor(Math.random() * 255)}, 0.6)`
//             ),
//           })),
//         };
//         return <Pie data={pieData} options={options} />;
//       }
//       case 'line':
//         return <Line data={{ labels, datasets }} options={options} />;
//       default:
//         return null;
//     }
//   };

//   return <div className="chart-container">{renderChart()}</div>;
// };

// export default DataChart;
