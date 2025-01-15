// import React, { useState, useEffect } from 'react'
// import { Layout, Menu, Dropdown, Button, Tabs, Input, Tree } from 'antd'
// import { MenuUnfoldOutlined, MenuFoldOutlined, PlusOutlined } from '@ant-design/icons'
// import { useNavigate } from 'react-router-dom'
// import axios from 'axios'
// import { isAutheticated } from '../../../auth'
// import DataChart from '../../dataChart/DataChart'

// const { Sider, Content } = Layout
// const { TabPane } = Tabs
// const { TextArea } = Input

// const DatabasePage = () => {
//   const navigate = useNavigate()
//   const token = isAutheticated()
//   const [collapsed, setCollapsed] = useState(false)
//   const [databases, setDatabases] = useState([])
//   const [schemaDetails, setSchemaDetails] = useState({})
//   const [selectedDatabase, setSelectedDatabase] = useState(null)
//   const [selectedDatabaseName, setSelectedDatabaseName] = useState('')
//   const [selectedDatabaseType, setSelectedDatabaseType] = useState('')
//   const [query, setQuery] = useState('')
//   const [chatHistory, setChatHistory] = useState([])
//   const [queryHistory, setQueryHistory] = useState([])
//   const [chartType, setChartType] = useState(null)

//   const toggleSidebar = () => {
//     setCollapsed(!collapsed)
//   }

//   const fetchDatabases = async () => {
//     try {
//       const response = await axios.get('/api/databases/all', {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       if (response.data.success) {
//         setDatabases(response.data.databases)
//       }
//     } catch (error) {
//       console.error('Error fetching databases:', error)
//     }
//   }

//   const fetchSchemaDetails = async (databaseID) => {
//     try {
//       const response = await axios.get(`/api/databases/schema-details/${databaseID}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       if (response.data.success) {
//         setSchemaDetails(response.data.schemaDetails)
//         // console.log(response.data.schemaDetails)
//       }
//     } catch (error) {
//       console.error('Error fetching schema details:', error)
//     }
//   }

//   const handleDatabaseSelect = (databaseID) => {
//     const selectedDb = databases.find((db) => db._id === databaseID)
//     setSelectedDatabase(databaseID)
//     setSelectedDatabaseName(selectedDb.databaseName)
//     setSelectedDatabaseType(selectedDb.databaseType)
//     fetchSchemaDetails(databaseID)
//   }

//   const handleSendChat = async () => {
//     try {
//       const response = await axios.post(
//         `/api/queries/queryAI/${selectedDatabase}`,
//         { prompt: query },
//         { headers: { Authorization: `Bearer ${token}` } },
//       )
//       if (response.data.success) {
//         // console.log('AI', response.data.data)
//         const newChat = {
//           input: query,
//           response: response.data.result,
//           chartType: response.data.chartType,
//         }
//         setChatHistory((prev) => [newChat, ...prev])
//         setQuery('')
//       }
//     } catch (error) {
//       console.error('Error sending chat:', error)
//     }
//   }

//   const handleSendQuery = async () => {
//     try {
//       const response = await axios.post(
//         `/api/queries/query/${selectedDatabase}`,
//         { query },
//         { headers: { Authorization: `Bearer ${token}` } },
//       )
//       if (response.data.success) {
//         // console.log(response.data.queryResult)
//         const newQuery = { input: query, response: response.data.queryResult, chartType }
//         setQueryHistory((prev) => [newQuery, ...prev])
//         setQuery('')
//       }
//     } catch (error) {
//       console.error('Error sending query:', error)
//     }
//   }

//   useEffect(() => {
//     fetchDatabases()
//   }, [])

//   const databaseMenu = (
//     <Menu>
//       {databases.map((db) => (
//         <Menu.Item key={db._id} onClick={() => handleDatabaseSelect(db._id)}>
//           {db.databaseName} ({db.databaseType})
//         </Menu.Item>
//       ))}
//       <Menu.Item key="addNew">
//         <Button type="link" onClick={() => navigate('/connect-database')}>
//           Add New <PlusOutlined />
//         </Button>
//       </Menu.Item>
//     </Menu>
//   )

//   const transformSchemaToTree = (schemaDetails) => {
//     return Object.keys(schemaDetails).map((schemaKey) => {
//       const schema = schemaDetails[schemaKey]
//       if (Array.isArray(schema)) {
//         return {
//           title: schemaKey,
//           key: schemaKey,
//           children: schema.map((item, index) => {
//             if (item.children && Array.isArray(item.children)) {
//               return {
//                 title: item.name, // 'name' field in each item, like '_id', 'userId'
//                 key: `${schemaKey}-${index}`,
//                 children: item.children.map((col) => ({
//                   title: col, // Column name like 'date', 'time', etc.
//                   key: `${schemaKey}-${index}-${col}`,
//                 })),
//               }
//             }
//             return {
//               title: item.name, // Handle the case where there are no children
//               key: `${schemaKey}-${index}`,
//             }
//           }),
//         }
//       }
//       return {}
//     })
//   }
//   const renderHistory = (history) => (
//     <>
//       {history.map((item, index) => (
//         <div key={index} style={{ marginBottom: '20px' }}>
//           <DataChart data={item.response} chartType={item.chartType} />
//           <p>
//             <strong>Input:</strong> {item.input}
//           </p>
//         </div>
//       ))}
//     </>
//   )

//   const tabItems = [
//     {
//       key: '1',
//       label: 'Chat',
//       children: (
//         <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(80vh - 70px)' }}>
//           <div style={{ flex: 1, overflowY: 'auto', marginLeft: '1em' }}>
//             {selectedDatabase ? (
//               renderHistory(chatHistory)
//             ) : (
//               <h3
//                 style={{
//                   display: 'flex',
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   textAlign: 'center',
//                 }}
//               >
//                 Select a database to chat
//               </h3>
//             )}
//           </div>
//           <div className="px-4 d-flex gap-2">
//             <TextArea
//               rows={2}
//               placeholder="Type your message..."
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//             />
//             <Button type="primary" className="my-auto" onClick={handleSendChat}>
//               Send Chat
//             </Button>
//           </div>
//         </div>
//       ),
//     },
//     {
//       key: '2',
//       label: 'Query Editor',
//       children: (
//         <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(80vh - 70px)' }}>
//           <div style={{ flex: 1, overflowY: 'auto', marginLeft: '1rem' }}>
//             {selectedDatabase ? (
//               renderHistory(queryHistory)
//             ) : (
//               <h3
//                 style={{
//                   display: 'flex',
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   textAlign: 'center',
//                 }}
//               >
//                 Select a database to query
//               </h3>
//             )}
//           </div>
//           <div className="px-4 d-flex gap-2">
//             <TextArea
//               rows={2}
//               placeholder="Write your query here..."
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//             />
//             <Button type="primary" className="my-auto" onClick={handleSendQuery}>
//               Send Query
//             </Button>
//           </div>
//         </div>
//       ),
//     },
//   ]

//   return (
//     <Layout style={{ height: '80vh' }}>
//       <Sider collapsible collapsed={collapsed} trigger={null}>
//         <div style={{ position: 'absolute', top: 10, right: -15 }}>
//           <Button
//             type="primary"
//             shape="circle"
//             icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
//             onClick={toggleSidebar}
//           />
//         </div>
//         {!collapsed && (
//           <div style={{ background: 'white' }}>
//             <h3 style={{ color: 'black', marginLeft: 16 }}>Database</h3>
//             <Dropdown overlay={databaseMenu} trigger={['click']}>
//               <Button style={{ margin: '10px 16px', width: 'calc(100% - 32px)' }}>
//                 {selectedDatabaseName
//                   ? `${selectedDatabaseName} (${selectedDatabaseType})`
//                   : 'Select Database'}
//               </Button>
//             </Dropdown>
//             <div style={{ overflowY: 'auto', height: 'calc(80vh - 91px)' }}>
//               <Tree treeData={transformSchemaToTree(schemaDetails)} defaultExpandAll />
//             </div>
//           </div>
//         )}
//       </Sider>
//       <Layout className="site-layout">
//         <Content style={{ overflow: 'hidden' }}>
//           <Tabs items={tabItems} centered />
//         </Content>
//       </Layout>
//     </Layout>
//   )
// }

// export default DatabasePage

import React, { useState, useEffect } from 'react'
import { Layout, Menu, Dropdown, Button, Tabs, Input, Tree } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined, PlusOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { isAutheticated } from '../../../auth'
import DataChart from '../../dataChart/DataChart'

const { Sider, Content } = Layout
const { TextArea } = Input

const DatabasePage = () => {
  const navigate = useNavigate()
  const token = isAutheticated()
  const [collapsed, setCollapsed] = useState(false)
  const [databases, setDatabases] = useState([])
  const [schemaDetails, setSchemaDetails] = useState({})
  const [selectedDatabase, setSelectedDatabase] = useState(null)
  const [selectedDatabaseName, setSelectedDatabaseName] = useState('')
  const [selectedDatabaseType, setSelectedDatabaseType] = useState('')
  const [query, setQuery] = useState('')
  const [prompt, setPrompt] = useState('')
  const [chartType, setChartType] = useState(null)
  const [chatHistory, setChatHistory] = useState([])
  const [queryHistory, setQueryHistory] = useState([])

  const toggleSidebar = () => setCollapsed(!collapsed)

  useEffect(() => {
    const fetchDatabases = async () => {
      try {
        const response = await axios.get('/api/databases/all', {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (response.data.success) setDatabases(response.data.databases)
      } catch (error) {
        console.error('Error fetching databases:', error)
      }
    }

    fetchDatabases()
  }, [token])

  const handleDatabaseSelect = (databaseID) => {
    const selectedDb = databases.find((db) => db._id === databaseID)
    setSelectedDatabase(databaseID)
    setSelectedDatabaseName(selectedDb.databaseName)
    setSelectedDatabaseType(selectedDb.databaseType)

    const fetchSchemaDetails = async () => {
      try {
        const response = await axios.get(`/api/databases/schema-details/${databaseID}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (response.data.success) setSchemaDetails(response.data.schemaDetails)
      } catch (error) {
        console.error('Error fetching schema details:', error)
      }
    }

    fetchSchemaDetails()
  }
  const handleSendChat = async () => {
    try {
      const response = await axios.post(
        `/api/queries/queryAI/${selectedDatabase}`,
        { prompt },
        { headers: { Authorization: `Bearer ${token}` } },
      )
      console.log('AI', response.data)
      if (response.data.success) {
        const newChat = {
          input: prompt,
          response: response.data.result,
          chartType: response.data.chartType,
        }
        setChatHistory((prev) => [newChat, ...prev])
        setPrompt('')
      }
    } catch (error) {
      console.error('Error sending chat:', error)
    }
  }

  const handleSendQuery = async () => {
    try {
      const response = await axios.post(
        `/api/queries/query/${selectedDatabase}`,
        { query },
        { headers: { Authorization: `Bearer ${token}` } },
      )
      if (response.data.success) {
        // console.log(response.data.queryResult)
        const newQuery = {
          input: query,
          response: response.data.queryResult,
          chartType: response.data.chartType,
        }
        setQueryHistory((prev) => [newQuery, ...prev])
        setQuery('')
      }
    } catch (error) {
      console.error('Error sending query:', error)
    }
  }
  const databaseMenu = (
    <Menu>
      {databases.map((db) => (
        <Menu.Item key={db._id} onClick={() => handleDatabaseSelect(db._id)}>
          {db.databaseName} ({db.databaseType})
        </Menu.Item>
      ))}
      <Menu.Item key="addNew">
        <Button type="link" onClick={() => navigate('/connect-database')}>
          Add New <PlusOutlined />
        </Button>
      </Menu.Item>
    </Menu>
  )

  const transformSchemaToTree = (schemaDetails) => {
    return Object.keys(schemaDetails).map((schemaKey) => {
      const schema = schemaDetails[schemaKey]
      if (Array.isArray(schema)) {
        return {
          title: schemaKey,
          key: schemaKey,
          children: schema.map((item, index) => {
            if (item.children && Array.isArray(item.children)) {
              return {
                title: item.name, // 'name' field in each item, like '_id', 'userId'
                key: `${schemaKey}-${index}`,
                children: item.children.map((col) => ({
                  title: col, // Column name like 'date', 'time', etc.
                  key: `${schemaKey}-${index}-${col}`,
                })),
              }
            }
            return {
              title: item.name, // Handle the case where there are no children
              key: `${schemaKey}-${index}`,
            }
          }),
        }
      }
      return {}
    })
  }
  const renderHistory = (history) => (
    <>
      {history.map((item, index) => (
        <div key={index} style={{ marginBottom: '20px' }}>
          <DataChart data={item.response} chartType={item.chartType} />
          <p>
            <strong>Input:</strong> {item.input}
          </p>
        </div>
      ))}
    </>
  )

  const tabItems = [
    {
      key: '1',
      label: 'Chat',
      children: (
        <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(80vh - 70px)' }}>
          <div style={{ flex: 1, overflowY: 'auto', marginLeft: '1em' }}>
            {selectedDatabase ? (
              renderHistory(chatHistory)
            ) : (
              <h3
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
              >
                Select a database to chat
              </h3>
            )}
          </div>
          <div className="px-4 d-flex gap-2">
            <TextArea
              rows={2}
              placeholder="Type your message..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <Button type="primary" className="my-auto" onClick={handleSendChat}>
              Send Chat
            </Button>
          </div>
        </div>
      ),
    },
    {
      key: '2',
      label: 'Query Editor',
      children: (
        <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(80vh - 70px)' }}>
          <div style={{ flex: 1, overflowY: 'auto', marginLeft: '1rem' }}>
            {selectedDatabase ? (
              renderHistory(queryHistory)
            ) : (
              <h3
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
              >
                Select a database to query
              </h3>
            )}
          </div>
          <div className="px-4 d-flex gap-2">
            <TextArea
              rows={2}
              placeholder="Write your query here..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button type="primary" className="my-auto" onClick={handleSendQuery}>
              Send Query
            </Button>
          </div>
        </div>
      ),
    },
  ]

  return (
    <Layout style={{ height: '80vh' }}>
      <Sider collapsible collapsed={collapsed} trigger={null}>
        <div style={{ position: 'absolute', top: 10, right: -15 }}>
          <Button
            type="primary"
            shape="circle"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={toggleSidebar}
          />
        </div>
        {!collapsed && (
          <div style={{ background: 'white' }}>
            <h3 style={{ color: 'black', marginLeft: 16 }}>Database</h3>
            <Dropdown overlay={databaseMenu} trigger={['click']}>
              <Button style={{ margin: '10px 16px', width: 'calc(100% - 32px)' }}>
                {selectedDatabaseName
                  ? `${selectedDatabaseName} (${selectedDatabaseType})`
                  : 'Select Database'}
              </Button>
            </Dropdown>
            <div style={{ overflowY: 'auto', height: 'calc(80vh - 91px)' }}>
              <Tree treeData={transformSchemaToTree(schemaDetails)} defaultExpandAll />
            </div>
          </div>
        )}
      </Sider>
      <Layout className="site-layout">
        <Content style={{ overflow: 'hidden' }}>
          <Tabs items={tabItems} centered />
        </Content>
      </Layout>
    </Layout>
  )
}

export default DatabasePage
