import React from 'react'
import QueryHistoryPage from './views/pages/ChatHistory/chathistory'
const ConnectToDatabase = React.lazy(() => import('./views/pages/ConnectDatabase/ConnectDatabase'))
const DatabasePage = React.lazy(() => import('./views/pages/database/databse'))
const ChangePassword = React.lazy(() => import('./views/pages/Profile/changepassword'))

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/connect-database', name: 'ConnectDatabase', element: ConnectToDatabase },
  { path: '/databases', name: 'Database', element: DatabasePage },
  { path: '/history', name: 'Chat', element: QueryHistoryPage },
  { path: '/change-password', name: 'Change Password', element: ChangePassword },
]

export default routes
