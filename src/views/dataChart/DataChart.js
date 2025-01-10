// import React from 'react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// const DataChart = ({ data }) => {
//   if (!data || data.length === 0) return null;

//   const columns = Object.keys(data[0]);
//   const numericColumns = columns.filter((col) => typeof data[0][col] === 'number');

//   if (numericColumns.length === 0) return null;

//   return (
//     <div className="h-96 w-full mt-8">
//       <ResponsiveContainer width="100%" height="100%">
//         <LineChart data={data}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey={columns[0]} />
//           <YAxis />
//           <Tooltip />
//           {numericColumns.map((col, idx) => (
//             <Line key={idx} type="monotone" dataKey={col} stroke={`hsl(${(idx * 137) % 360}, 70%, 50%)`} />
//           ))}
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default DataChart;

import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const DataChart = ({ data }) => {
  // console.log(data);

  // Validate the input data
  if (!data || data.length === 0) return null;

  // Extract columns and filter numeric ones
  const columns = Object.keys(data[0]);
  const numericColumns = columns.filter(
    (col) => typeof data[0][col] === 'number' || !isNaN(Number(data[0][col]))
  );

  // Identify the first non-numeric field as the label field
  const nonNumericColumns = columns.filter(
    (col) => typeof data[0][col] !== 'number' && isNaN(Number(data[0][col]))
  );

  if (numericColumns.length === 0 || nonNumericColumns.length === 0) return null;

  // Use the first non-numeric column as the labels (name, date, etc.)
  const labels = data.map((item) => item[nonNumericColumns[0]].trim()); // Take first non-numeric field

  const chartData = {
    labels, // Non-numeric field as labels on the x-axis
    datasets: numericColumns.map((col, index) => ({
      label: col,
      data: data.map((item) => Number(item[col])), // Convert to number here
      backgroundColor: `rgba(${75 + index * 40}, 192, 192, 0.6)`,
      borderColor: `rgba(${75 + index * 40}, 192, 192, 1)`,
      borderWidth: 1,
    })),
  };

  return (
    <div className="chart-container">
      <Bar data={chartData} />
    </div>
  );
};

export default DataChart;
