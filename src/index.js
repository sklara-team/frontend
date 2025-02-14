import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import 'core-js'
import App from './App'
import store from './store'
import axios from 'axios'
const setupAxios = () => {
  axios.defaults.baseURL = 'https://datape-api.onrender.com'
  // axios.defaults.baseURL = 'http://localhost:5000'
  axios.defaults.headers = {
    'Cache-Control': 'no-cache,no-store',
    Pragma: 'no-cache',
    Expires: '0',
  }
}

setupAxios()

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
