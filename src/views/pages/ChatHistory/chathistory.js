import React, { useState } from 'react'
import {
  Search,
  Calendar,
  Database,
  ShoppingCart,
  FileSpreadsheet,
  Filter,
  Download,
  ArrowUpDown,
  Clock,
  Copy,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'
import './QueryHistoryPage.css'

const QueryHistoryPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDataSource, setSelectedDataSource] = useState('all')
  const [dateRange, setDateRange] = useState('all')

  const queryHistory = [
    {
      id: 1,
      query: 'What was our total revenue in Q1 2024?',
      timestamp: '2024-01-28T14:30:00',
      dataSource: 'Sales Database',
      sourceType: 'database',
      executionTime: '1.2s',
      status: 'success',
    },
    {
      id: 2,
      query: 'Show me top 10 products by sales volume',
      timestamp: '2024-01-28T13:15:00',
      dataSource: 'Main Store',
      sourceType: 'ecommerce',
      executionTime: '2.1s',
      status: 'success',
    },
    {
      id: 3,
      query: 'Calculate the average order value for last month',
      timestamp: '2024-01-27T16:45:00',
      dataSource: 'Sales Report 2024',
      sourceType: 'excel',
      executionTime: '0.8s',
      status: 'success',
    },
    {
      id: 4,
      query: "What's the customer retention rate?",
      timestamp: '2024-01-27T11:20:00',
      dataSource: 'Customer Database',
      sourceType: 'database',
      executionTime: '1.5s',
      status: 'failed',
    },
  ]

  const sourceTypeIcons = {
    database: Database,
    ecommerce: ShoppingCart,
    excel: FileSpreadsheet,
  }

  const statusColors = {
    success: 'success',
    failed: 'failed',
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  }

  return (
    <div className="query-history-container">
      <div className="query-history-header">
        <div>
          <h1>Query History</h1>
          <p>View and analyze your past queries</p>
        </div>
        <button className="query-history-export-btn">
          <Download className="w-4 h-4" />
          Export History
        </button>
      </div>

      <div className="query-history-filters">
        <div className="grid">
          <div className="query-history-filter-input">
            <Search className="query-history-filter-icon" />
            <input
              type="text"
              placeholder="Search queries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="query-history-filter-input">
            <Filter className="query-history-filter-icon" />
            <select
              value={selectedDataSource}
              onChange={(e) => setSelectedDataSource(e.target.value)}
            >
              <option value="all">All Data Sources</option>
              <option value="database">Databases</option>
              <option value="ecommerce">eCommerce</option>
              <option value="excel">Excel Files</option>
            </select>
          </div>

          <div className="query-history-filter-input">
            <Calendar className="query-history-filter-icon" />
            <select value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader className="query-history-card-header">
          <CardTitle className="query-history-card-title">Recent Queries</CardTitle>
          <button className="query-history-sort-btn">
            <ArrowUpDown className="w-4 h-4" />
            Sort by Date
          </button>
        </CardHeader>
        <CardContent>
          <div>
            {queryHistory.map((item) => {
              const SourceIcon = sourceTypeIcons[item.sourceType]
              return (
                <div key={item.id} className="query-history-card">
                  <div className="query-history-item">
                    <div className="query-history-item-details">
                      <div className="query-history-item-query">{item.query}</div>
                      <div className="query-history-item-meta">
                        <div className="query-history-icons">
                          <Clock className="w-4 h-4" />
                          {formatDate(item.timestamp)}
                        </div>
                        <div className="query-history-icons">
                          <SourceIcon className="w-4 h-4" />
                          {item.dataSource}
                        </div>
                        <div className="text-gray-500">Execution time: {item.executionTime}</div>
                        <span className={`query-history-item-status ${statusColors[item.status]}`}>
                          {item.status === 'success' ? 'Successful' : 'Failed'}
                        </span>
                      </div>
                    </div>
                    <button className="query-history-item-copy-btn" title="Copy query">
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default QueryHistoryPage

// import React, { useState, useEffect } from 'react'
// import axios from 'axios'
// import {
//   Search,
//   Calendar,
//   Database,
//   ShoppingCart,
//   FileSpreadsheet,
//   Filter,
//   Download,
//   ArrowUpDown,
//   Clock,
//   Copy,
// } from 'lucide-react'
// import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'
// import './QueryHistoryPage.css'
// import { isAutheticated } from '../../../auth'

// const QueryHistoryPage = () => {
//   const [searchTerm, setSearchTerm] = useState('')
//   const [selectedDataSource, setSelectedDataSource] = useState('all')
//   const [dateRange, setDateRange] = useState('all')
//   const [queryHistory, setQueryHistory] = useState([])
//   const [databases, setDatabases] = useState([])

//   const token = isAutheticated()
//   // console.log(token)
//   // Fetch databases on page load
//   const handleShowDatabases = async () => {
//     try {
//       const response = await axios.get(`/api/chathistory/databases`, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       // console.log(response.data)
//       setDatabases(response.data?.databaseList)
//     } catch (error) {
//       console.error('Error fetching databases:', error)
//     }
//   }

//   // Fetch query history based on selected database
//   const handleFetchQueryHistory = async (database) => {
//     try {
//       const response = await axios.post(
//         `/api/chathistory`,
//         { databaseName: database.name, databaseType: database.type, id: database.id },
//         { headers: { Authorization: `Bearer ${token}` } },
//       )
//       setQueryHistory(response.data) // Assuming response contains query history data
//     } catch (error) {
//       console.error('Error fetching query history:', error)
//     }
//   }

//   useEffect(() => {
//     handleShowDatabases() // Fetch databases when component mounts
//   }, [])

//   useEffect(() => {
//     if (selectedDataSource !== 'all') {
//       const selectedDatabase = databases.find((db) => db.name === selectedDataSource)
//       if (selectedDatabase) {
//         handleFetchQueryHistory(selectedDatabase)
//       }
//     }
//   }, [selectedDataSource, databases])

//   const sourceTypeIcons = {
//     database: Database,
//     ecommerce: ShoppingCart,
//     excel: FileSpreadsheet,
//   }

//   const statusColors = {
//     success: 'success',
//     failed: 'failed',
//   }

//   const formatDate = (dateString) => {
//     const date = new Date(dateString)
//     return new Intl.DateTimeFormat('en-US', {
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//     }).format(date)
//   }

//   return (
//     <div className="query-history-container">
//       <div className="query-history-header">
//         <div>
//           <h1>Query History</h1>
//           <p>View and analyze your past queries</p>
//         </div>
//         <button className="query-history-export-btn">
//           <Download className="w-4 h-4" />
//           Export History
//         </button>
//       </div>

//       <div className="query-history-filters">
//         <div className="grid">
//           <div className="query-history-filter-input">
//             <Search className="query-history-filter-icon" />
//             <input
//               type="text"
//               placeholder="Search queries..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>

//           <div className="query-history-filter-input">
//             <Filter className="query-history-filter-icon" />
//             <select
//               value={selectedDataSource}
//               onChange={(e) => setSelectedDataSource(e.target.value)}
//             >
//               <option value="all">All Data Sources</option>
//               {databases.map((db) => (
//                 <option key={db.id} value={db.name}>
//                   {db.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="query-history-filter-input">
//             <Calendar className="query-history-filter-icon" />
//             <select value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
//               <option value="all">All Time</option>
//               <option value="today">Today</option>
//               <option value="week">This Week</option>
//               <option value="month">This Month</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       <Card>
//         <CardHeader className="query-history-card-header">
//           <CardTitle className="query-history-card-title">Recent Queries</CardTitle>
//           <button className="query-history-sort-btn">
//             <ArrowUpDown className="w-4 h-4" />
//             Sort by Date
//           </button>
//         </CardHeader>
//         <CardContent>
//           {/* <div> */}
//           <>
//             {/* Render query history items */}
//             {queryHistory.length === 0 && (
//               <div style={{ textAlign: 'center', fontSize: '1.5rem' }}>No queries found</div>
//             )}
//             {queryHistory.map((item) => {
//               const SourceIcon = sourceTypeIcons[item.sourceType]
//               return (
//                 <div key={item.id} className="query-history-card">
//                   <div className="query-history-item">
//                     <div className="query-history-item-details">
//                       <div className="query-history-item-query">{item.query}</div>
//                       <div className="query-history-item-meta">
//                         <div className="query-history-icons">
//                           <Clock className="w-4 h-4" />
//                           {formatDate(item.timestamp)}
//                         </div>
//                         <div className="query-history-icons">
//                           <SourceIcon className="w-4 h-4" />
//                           {item.dataSource}
//                         </div>
//                         <div className="text-gray-500">Execution time: {item.executionTime}</div>
//                         <span className={`query-history-item-status ${statusColors[item.status]}`}>
//                           {item.status === 'success' ? 'Successful' : 'Failed'}
//                         </span>
//                       </div>
//                     </div>
//                     <button className="query-history-item-copy-btn" title="Copy query">
//                       <Copy className="w-4 h-4" />
//                     </button>
//                   </div>
//                 </div>
//               )
//             })}
//           </>
//           {/* </div> */}
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

// export default QueryHistoryPage
