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
//       // console.log(database)
//       const response = await axios.get(`/api/chathistory`, {
//         headers: { Authorization: `Bearer ${token}` },
//         params: {
//           databaseName: database.databaseName,
//           databaseType: database.databaseType,
//           databaseId: database.databaseId,
//         },
//       })

//       console.log(response.data)
//       setQueryHistory(response.data?.chatHistory) // Assuming response contains query history data
//     } catch (error) {
//       console.error('Error fetching query history:', error)
//     }
//   }

//   useEffect(() => {
//     handleShowDatabases() // Fetch databases when component mounts
//   }, [])

//   useEffect(() => {
//     if (selectedDataSource !== 'all') {
//       const selectedDatabase = databases.find((db) => db.databaseId === selectedDataSource)
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
//                 <option key={db.databaseId} value={db.databaseId}>
//                   {`${db.databaseName} - ${db.databaseType}`}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="query-history-filter-input">
//             <Calendar className="query-history-filter-icon" />
//             <input type="date" />
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
//           <div>
//             {/* Render query history items */}
//             {!queryHistory ? (
//               <div style={{ textAlign: 'center', fontSize: '1.5rem' }}>No queries found</div>
//             ) : (
//               queryHistory.chat?.map((item) => {
//                 const SourceIcon = sourceTypeIcons[queryHistory?.databaseName] || Database
//                 return (
//                   <div key={item?._id} className="query-history-card">
//                     <div className="query-history-item">
//                       <div className="query-history-item-details">
//                         <div className="query-history-item-query">{item?.question}</div>
//                         <div className="query-history-item-meta">
//                           <div className="query-history-icons">
//                             <Clock className="w-4 h-4" />
//                             {formatDate(item?.timestamp)}
//                           </div>
//                           <div className="query-history-icons">
//                             <SourceIcon className="w-4 h-4" />
//                             {/* Replace item.dataSource with an appropriate field or remove if not necessary */}
//                             {item?.dataSource || 'No Data Source'}
//                           </div>
//                           <div className="text-gray-500">Execution time: {item?.executionTime}</div>
//                           <span
//                             className={`query-history-item-status ${statusColors[item?.status]}`}
//                           >
//                             {item?.status === 'success' ? 'Successful' : 'Failed'}
//                           </span>
//                         </div>
//                       </div>
//                       <button className="query-history-item-copy-btn" title="Copy query">
//                         <Copy className="w-4 h-4" />
//                       </button>
//                     </div>
//                   </div>
//                 )
//               })
//             )}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

// export default QueryHistoryPage

import React, { useState, useEffect } from 'react'
import axios from 'axios'
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
import { isAutheticated } from '../../../auth'

const QueryHistoryPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDataSource, setSelectedDataSource] = useState('all')
  const [dateFilter, setDateFilter] = useState('')
  const [queryHistory, setQueryHistory] = useState([])
  const [filteredHistory, setFilteredHistory] = useState([])
  const [databases, setDatabases] = useState([])

  const token = isAutheticated()

  // Fetch databases on page load
  const fetchDatabases = async () => {
    try {
      const response = await axios.get(`/api/chathistory/databases`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setDatabases(response.data?.databaseList || [])
    } catch (error) {
      console.error('Error fetching databases:', error)
    }
  }

  // Fetch query history based on selected database
  const fetchQueryHistory = async (database) => {
    try {
      const response = await axios.get(`/api/chathistory`, {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          databaseName: database.databaseName,
          databaseType: database.databaseType,
          databaseId: database.databaseId,
        },
      })
      // console.log(response.data.chatHistory)
      // setQueryHistory(response.data?.chatHistory || [])
      const chatHistory = response.data?.chatHistory || {}
      setQueryHistory(chatHistory)
      const chatArray = Array.isArray(chatHistory.chat) ? chatHistory.chat : []
      setFilteredHistory(chatArray)
    } catch (error) {
      console.error('Error fetching query history:', error)
    }
  }

  useEffect(() => {
    fetchDatabases()
  }, [])

  useEffect(() => {
    if (selectedDataSource !== 'all') {
      const selectedDatabase = databases.find((db) => db.databaseId === selectedDataSource)
      if (selectedDatabase) {
        fetchQueryHistory(selectedDatabase)
      }
    }
  }, [selectedDataSource, databases])

  // Debounce Search - Runs after 1 sec of inactivity
  useEffect(() => {
    const timer = setTimeout(() => {
      const chatArray = Array.isArray(queryHistory.chat) ? queryHistory.chat : []
      let filtered = chatArray

      if (searchTerm) {
        filtered = filtered?.filter((item) =>
          item.question.toLowerCase().includes(searchTerm.toLowerCase()),
        )
      }

      if (dateFilter) {
        filtered = filtered?.filter(
          (item) => new Date(item.timestamp).toISOString().split('T')[0] === dateFilter,
        )
      }

      setFilteredHistory(filtered)
    }, 1000)

    return () => clearTimeout(timer)
  }, [searchTerm, dateFilter, queryHistory])

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
              {databases.map((db) => (
                <option key={db.databaseId} value={db.databaseId}>
                  {`${db.databaseName} - ${db.databaseType}`}
                </option>
              ))}
            </select>
          </div>

          <div className="query-history-filter-input">
            <Calendar className="query-history-filter-icon" />
            <input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} />
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
            {filteredHistory.length === 0 ? (
              <div style={{ textAlign: 'center', fontSize: '1.5rem' }}>No queries found</div>
            ) : (
              filteredHistory.map((item) => {
                const SourceIcon = sourceTypeIcons[item?.dataSource] || Database
                return (
                  <div key={item?._id} className="query-history-card">
                    <div className="query-history-item">
                      <div className="query-history-item-details">
                        <div className="query-history-item-query">{item?.question}</div>
                        <div className="query-history-item-meta">
                          <div className="query-history-icons">
                            <Clock className="w-4 h-4" />
                            {formatDate(item?.timestamp)}
                          </div>
                          <div className="query-history-icons">
                            <SourceIcon className="w-4 h-4" />
                            {item?.dataSource || 'No Data Source'}
                          </div>
                          <div className="text-gray-500">Execution time: {item?.executionTime}</div>
                          <span
                            className={`query-history-item-status ${statusColors[item?.status]}`}
                          >
                            {item?.status === 'success' ? 'Successful' : 'Failed'}
                          </span>
                        </div>
                      </div>
                      <button
                        className="query-history-item-copy-btn"
                        title="Copy query"
                        onClick={() => navigator.clipboard.writeText(item?.question)}
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default QueryHistoryPage
