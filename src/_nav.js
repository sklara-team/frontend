import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilHome,
  cilCloudUpload,
  cilChatBubble,
  cilHistory,
  cilSettings,
  cilGroup,
  cilMoney,
  cilLifeRing,
  cilStorage,
  cilSpreadsheet,
  cilBasket,
  cilApps,
  cilPregnant,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilApps} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'DATA SOURCES',
  },
  {
    component: CNavItem,
    name: 'Connect Database',
    icon: <CIcon icon={cilStorage} customClassName="nav-icon" />,
    to: '/connect-database',
    group: 'DataBase',
  },
  {
    component: CNavItem,
    name: 'Connect eCommerce',
    icon: <CIcon icon={cilBasket} customClassName="nav-icon" />,
    to: '/connect-ecommerce',
    group: 'DataBase',
  },
  {
    component: CNavItem,
    name: 'Upload Excel',
    icon: <CIcon icon={cilSpreadsheet} customClassName="nav-icon" />,
    to: '/upload-excel',
    group: 'DataBase',
  },
  {
    component: CNavTitle,
    name: 'CHAT & ANALYSIS',
  },
  {
    component: CNavItem,
    name: 'Chat',
    icon: <CIcon icon={cilChatBubble} customClassName="nav-icon" />,
    to: '/databases',
    group: 'Chat',
  },
  {
    component: CNavItem,
    name: 'History',
    icon: <CIcon icon={cilHistory} customClassName="nav-icon" />,
    to: '/history',
    group: 'Analysis',
  },
  {
    component: CNavTitle,
    name: 'SETTINGS',
  },
  {
    component: CNavItem,
    name: 'Team Members',
    icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
    to: '/team-members',
    group: 'Settings',
  },
  {
    component: CNavItem,
    name: 'Billing',
    icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
    to: '/billing',
    group: 'Settings',
  },
  {
    component: CNavItem,
    name: 'Support',
    icon: <CIcon icon={cilLifeRing} customClassName="nav-icon" />,
    to: '/support',
    group: 'Settings',
  },
]

export default _nav
