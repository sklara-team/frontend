import React, { useState } from 'react'
import { Table } from 'antd'

const TableChart = ({ data }) => {
  const [pageSize, setPageSize] = useState(5) // Default page size
  // console.log(data)
  if (!data) return <p>No Data Available</p>

  // const tableData = data.data.map((row, index) => ({
  //   ...row,
  //   key: row.id || index.toString(), // Use existing unique ID or fallback to index
  // }))
  const tableData = Array.isArray(data?.data)
    ? data.data.map((row, index) => ({
        key: index, // Unique key for React list rendering
        ...row, // Spread row properties into the object
      }))
    : Array.isArray(data) // If data itself is an array (queryHistory case)
      ? data.map((row, index) => ({
          key: index,
          ...row,
        }))
      : [] // Default to an empty array if neither case matches
  // console.log(tableData)
  const columns = Object.keys(tableData[0]).map((key) => ({
    title: key,
    dataIndex: key,
    key: key,
  }))

  return (
    <Table
      dataSource={tableData}
      columns={columns}
      pagination={{
        pageSize: pageSize,
        showSizeChanger: true, // Enables changing page size
        pageSizeOptions: ['5', '10', '20', '50'], // Options for page size
        onShowSizeChange: (current, size) => setPageSize(size), // Update page size dynamically
      }}
    />
  )
}

export default TableChart
