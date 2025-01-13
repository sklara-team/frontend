import React, { useState, useEffect } from 'react'
import {
  CContainer,
  CRow,
  CCol,
  CForm,
  CFormLabel,
  CFormInput,
  CFormSelect,
  CCard,
  CCardBody,
} from '@coreui/react'
import axios from 'axios'
import './style.css'
import { isAutheticated } from '../../../auth'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
const ConnectToDatabase = () => {
  const token = isAutheticated()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [dbType, setDbType] = useState('')
  const [formData, setFormData] = useState({
    DB_Name: '',
    DB_Type: '',
    databaseName: '',
    host: '',
    username: '',
    password: '',
    port: '',
    connectionUrl: '',
    databasePath: '',
  })
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true)

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  // Handle db type change
  const handleDbTypeChange = (id) => {
    // setDbType(e.target.value)
    setDbType(id)

    setFormData({
      ...formData,
      // DB_Type: e.target.value,
      DB_Type: id,
      databaseName: '',
      host: '',
      username: '',
      password: '',
      port: '',
      connectionUrl: '',
      databasePath: '',
    })
  }
  // Handle next button click
  const nextPage = () => {
    if (step < 3) {
      setStep(step + 1)
    }
  }

  // Handle previous button click
  const prevPage = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  // Handle form submission
  const handleSubmit = async () => {
    try {
      // console.log('Form Data:', formData)
      // console.log('token', token)
      const response = await axios.post(
        '/api/databases/add',
        { ...formData },
        { headers: { Authorization: `Bearer ${token}` } },
      )
      if (response.data.success) {
        // Show success alert
        Swal.fire({
          icon: 'success',
          title: 'Stored in database successfully',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        })

        // Reset form data to initial state
        setFormData({
          DB_Name: '',
          DB_Type: '',
          host: '',
          username: '',
          password: '',
          port: '',
          connectionUrl: '',
          databasePath: '',
        })

        // Navigate to /databases
        navigate('/databases')
      }
      console.log(response.data)
    } catch (error) {
      console.error('Error connecting to database:', error)
    }
  }

  // Determine if next button should be enabled
  useEffect(() => {
    const requiredFields =
      dbType === 'MongoDB'
        ? ['connectionUrl']
        : dbType === 'SQLite'
          ? ['databasePath']
          : ['databaseName', 'host', 'username', 'password', 'port']
    const isValid = requiredFields.every((field) => formData[field])
    setIsSubmitDisabled(!isValid)
  }, [formData, dbType])

  // Helper function for rendering fields dynamically
  const renderDbFields = () => {
    switch (dbType) {
      case 'MySQL':
      case 'PostgreSQL':
      case 'MariaDB':
        return (
          <>
            <CRow>
              <CCol>
                <CFormLabel>Host</CFormLabel>
                <CFormInput
                  type="text"
                  name="host"
                  value={formData.host}
                  onChange={handleInputChange}
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol>
                <CFormLabel>Database Name</CFormLabel>
                <CFormInput
                  type="text"
                  name="databaseName"
                  value={formData.databaseName}
                  onChange={handleInputChange}
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol>
                <CFormLabel>Username</CFormLabel>
                <CFormInput
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol>
                <CFormLabel>Password</CFormLabel>
                <CFormInput
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol>
                <CFormLabel>Port</CFormLabel>
                <CFormInput
                  type="number"
                  name="port"
                  value={formData.port}
                  onChange={handleInputChange}
                />
              </CCol>
            </CRow>
          </>
        )
      case 'MongoDB':
        return (
          <CRow>
            <CCol>
              <CFormLabel>MongoDB Connection URL</CFormLabel>
              <CFormInput
                type="text"
                name="connectionUrl"
                value={formData.connectionUrl}
                onChange={handleInputChange}
              />
            </CCol>
          </CRow>
        )
      case 'SQLite':
        return (
          <CRow>
            <CCol>
              <CFormLabel>Database Path</CFormLabel>
              <CFormInput
                type="text"
                name="databasePath"
                value={formData.databasePath}
                onChange={handleInputChange}
              />
            </CCol>
          </CRow>
        )
      default:
        return null
    }
  }

  // Helper function for step indicators
  const renderStepIndicator = (stepNumber) => {
    return (
      <div
        className={`step-indicator ${
          step === stepNumber ? 'active' : step > stepNumber ? 'completed' : ''
        }`}
      >
        {stepNumber}
      </div>
    )
  }
  const databases = [
    {
      id: 'PostgreSQL',
      name: 'PostgreSQL',
      color: '#003B57',
      logo: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="96"
          height="96"
          viewBox="0 0 48 48"
        >
          <path
            fill="#fff"
            d="M44.083,29.79c-0.183-0.829-0.935-1.796-2.452-1.796c-0.31,0-0.649,0.039-1.035,0.119c-0.708,0.146-1.311,0.217-1.842,0.241c4.133-7.04,6.816-16.819,4.159-20.214c-3.501-4.473-8.214-5.141-10.711-5.141L31.967,3c-0.929,0.015-1.893,0.129-2.863,0.339l-3.583,0.774C25.033,4.052,24.536,4.009,24.018,4l-0.03,0l-0.016,0l-0.152-0.001c-1.593,0-3.046,0.338-4.341,0.973l-1.251-0.493c-1.72-0.678-4.308-1.485-6.868-1.485c-0.144,0-0.287,0.003-0.431,0.008C8.407,3.093,6.241,4.05,4.664,5.769C2.696,7.915,1.8,11.054,2.003,15.1C2.013,15.309,4.461,36,11.4,36h0.025l0.064-0.001c0.901-0.022,1.76-0.384,2.563-1.077c0.613,0.46,1.406,0.732,2.145,0.84c0.488,0.115,1.366,0.278,2.418,0.278c1.284,0,2.442-0.263,3.44-0.738c-0.001,0.88-0.006,1.994-0.016,3.418l-0.001,0.075l0.005,0.075c0.097,1.419,0.342,2.698,0.711,3.701c1.051,2.859,2.866,4.434,5.111,4.434c0.093,0,0.188-0.003,0.284-0.009c1.846-0.114,3.717-1.151,5.004-2.772c1.393-1.755,1.715-3.607,1.839-5.026L35,39.111v-0.088v-4.079l0.103,0.01l0.436,0.038l0.042,0.004l0.042,0.002c0.124,0.006,0.252,0.008,0.381,0.008c1.507,0,3.362-0.391,4.616-0.974C41.819,33.476,44.559,31.948,44.083,29.79z"
          ></path>
          <path
            fill="#0277bd"
            d="M33,34c0-0.205,0.012-0.376,0.018-0.565C33.008,33.184,33,33,33,33s0.012-0.009,0.032-0.022c0.149-2.673,0.886-3.703,1.675-4.29c-0.11-0.153-0.237-0.318-0.356-0.475c-0.333-0.437-0.748-0.979-1.192-1.674l-0.082-0.158c-0.067-0.164-0.229-0.447-0.435-0.819c-1.183-2.14-3.645-6.592-1.96-9.404c0.738-1.232,2.122-1.942,4.121-2.117C33.986,11.718,30.925,6.115,23.985,6c-0.002,0-0.004,0-0.006,0c-6.041-0.098-8.026,5.392-8.672,8.672c0.89-0.377,1.906-0.606,2.836-0.606c0.014,0,0.029,0,0.043,0c2.29,0.017,3.865,1.239,4.323,3.354c0.335,1.552,0.496,2.91,0.492,4.153c-0.01,2.719-0.558,4.149-1.042,5.411l-0.154,0.408c-0.124,0.334-0.255,0.645-0.379,0.937c-0.126,0.298-0.237,0.563-0.318,0.802c0.484,0.11,0.864,0.265,1.125,0.38l0.151,0.066c0.047,0.02,0.094,0.043,0.137,0.069c0.848,0.516,1.376,1.309,1.489,2.233c0.061,0.498,0.051,3.893,0.03,6.855c0.087,1.285,0.305,2.364,0.593,3.146c0.409,1.114,1.431,3.241,3.394,3.119c1.37-0.085,2.687-0.919,3.561-2.019c0.938-1.181,1.284-2.487,1.414-3.958V34z"
          ></path>
          <path
            fill="#0277bd"
            d="M15.114 28.917c-1.613-1.683-2.399-3.947-2.104-6.056.285-2.035.124-4.027.037-5.098-.029-.357-.048-.623-.047-.77 0-.008.002-.015.003-.023 0-.004-.002-.007-.002-.011.121-3.021 1.286-7.787 4.493-10.62C15.932 5.724 13.388 4.913 11 5 7.258 5.136 3.636 7.724 4 15c.137 2.73 3.222 19.103 7.44 19 .603-.015 1.229-.402 1.872-1.176 1.017-1.223 2.005-2.332 2.708-3.104C15.705 29.481 15.401 29.217 15.114 28.917zM37.023 14.731c.015.154.002.286-.022.408.031.92-.068 1.813-.169 2.677-.074.636-.15 1.293-.171 1.952-.021.645.07 1.282.166 1.956.225 1.578.459 3.359-.765 5.437.225.296.423.571.581.837 4.61-7.475 6.468-16.361 4.695-18.626C38.655 5.944 34.941 4.952 31.999 5c-.921.015-1.758.139-2.473.294C34.602 7.754 36.863 13.026 37.023 14.731zM41 30.071c-2.665.55-3.947.257-4.569-.126-.1.072-.2.133-.293.19-.372.225-.961.583-1.105 2.782.083.016.156.025.246.044L35.714 33c1.32.06 3.049-.31 4.063-.781C41.962 31.205 43.153 29.627 41 30.071zM22.023 32.119c-.037-.298-.198-.539-.492-.732l-.108-.047C21.062 31.181 20.653 31 20 31h-.004c-.127.01-.253.019-.38.019-.052 0-.103-.007-.155-.009-.474.365-1.148.647-2.816.99-2.98.759-1.221 1.655-.078 1.794 1.106.277 3.735.614 5.481-.809C22.043 32.537 22.035 32.229 22.023 32.119z"
          ></path>
          <path
            fill="#0277bd"
            d="M20.681 18.501c-.292.302-.753.566-1.262.484-.828-.134-1.463-1.133-1.417-1.508h0c.044-.374.751-.569 1.578-.435.287.047.548.128.768.228-.32-.688-.899-1.085-1.782-1.182-1.565-.174-3.226.644-3.56 1.097.007.11.02.251.033.417.093 1.147.265 3.284-.05 5.537-.208 1.485.393 3.169 1.567 4.395.757.79 1.641 1.29 2.513 1.438.111-.478.309-.944.513-1.425.113-.265.233-.547.346-.852l.162-.427c.443-1.155.9-2.35.909-4.703C21.003 20.66 20.892 19.627 20.681 18.501zM34.847 22.007c-.104-.729-.211-1.484-.185-2.303.023-.742.105-1.442.184-2.119.062-.533.11-1.045.138-1.55-1.289.107-2.145.479-2.551 1.108.168-.057.358-.102.568-.129.892-.116 1.543.141 1.618.637.055.363-.253.705-.388.836-.277.269-.626.442-.981.488-.064.008-.129.012-.192.012-.353 0-.69-.121-.949-.3.112 1.973 1.567 4.612 2.283 5.907.153.277.271.498.369.688C35.154 24.163 35.009 23.143 34.847 22.007z"
          ></path>
        </svg>
      ),
    },
    {
      id: 'MySQL',
      name: 'MySQL',
      color: '#003B57',
      logo: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="96"
          height="96"
          viewBox="0 0 48 48"
        >
          <path
            fill="#00796b"
            d="M0.002,35.041h1.92v-7.085l2.667,6.057c0.329,0.755,0.779,1.022,1.662,1.022 s1.315-0.267,1.644-1.022l2.667-5.902v6.93h1.92v-7.258c0-0.697-0.277-1.035-0.849-1.209c-1.367-0.43-2.285-0.059-2.7,0.872 l-2.735,6.16l-2.649-6.16c-0.398-0.93-1.332-1.302-2.7-0.872C0.277,26.748,0,27.085,0,27.782v7.258H0.002z"
          ></path>
          <path
            fill="#00796b"
            d="M13.441,29.281h1.92v4.055c-0.015,0.2,0.064,0.731,0.99,0.745c0.472,0.008,2.821,0,2.85,0v-4.8h1.92 c0.008,0,0,5.968,0,5.993c0.01,1.472-1.828,1.662-2.673,1.687h-5.006v-0.96c0.01,0,4.787,0.001,4.801,0 c1.088-0.115,0.959-0.714,0.959-0.896v-0.064H16.19c-1.67-0.015-2.735-0.751-2.747-1.59C13.441,33.373,13.479,29.317,13.441,29.281 z"
          ></path>
          <path
            fill="#f57f17"
            d="M22.081,35.041h4.807c0.63,0,1.242-0.132,1.728-0.36c0.81-0.372,1.144-0.875,1.144-1.536v-1.368 c0-1.476-1.83-1.536-2.88-1.536h-1.92c-0.755,0-0.87-0.456-0.96-0.96v-0.96c0.09-0.384,0.258-0.9,0.923-0.96 c0.773,0,4.836,0,4.836,0v-0.96h-4.566c-0.755,0-3.114,0.09-3.114,1.92v1.187c0,0.84,0.738,1.524,2.34,1.692 c0.18,0.012,0.36,0.024,0.539,0.024c0,0,1.866-0.036,1.92-0.024c1.08,0,0.96,0.84,0.96,0.96v0.96c0,0.132-0.03,0.96-0.971,0.96 c-0.072,0-4.789,0-4.789,0V35.041z"
          ></path>
          <path
            fill="#f57f17"
            d="M40.32,33.08c0,1.159,0.655,1.809,2.392,1.939c0.162,0.011,0.325,0.021,0.488,0.021H48v-0.96h-4.435 c-0.991,0-1.325-0.416-1.325-1.011v-6.669h-1.92V33.08z"
          ></path>
          <path
            fill="#f57f17"
            d="M30.704,33.121v-4.8c0-1.02,0.5-1.724,1.916-1.92h0.672h3.447h0.525 c1.416,0.196,2.08,0.899,2.08,1.92v4.782c0,0.827-0.215,1.271-0.916,1.559L39.916,36h-2.16l-1.07-0.96h-1.257l-2.136,0.012 c-0.309,0-0.635-0.043-0.993-0.141C31.226,34.618,30.704,34.054,30.704,33.121z M32.624,33.121c0.098,0.467,0.473,0.96,1.14,0.96 h1.864l-1.068-0.96h2.175l0.519,0.482c0,0,0.186-0.152,0.186-0.482c0-0.33-0.016-4.8-0.016-4.8c-0.098-0.434-0.538-0.96-1.188-0.96 h-2.471c-0.749,0-1.14,0.548-1.14,1.058L32.624,33.121L32.624,33.121z"
          ></path>
          <path
            fill="#00796b"
            d="M46.199,25.389c-1.031-0.028-1.818,0.068-2.491,0.351c-0.191,0.081-0.496,0.083-0.528,0.323 c0.105,0.11,0.121,0.275,0.205,0.41c0.16,0.26,0.432,0.609,0.674,0.791c0.265,0.2,0.538,0.414,0.821,0.587 c0.504,0.307,1.067,0.483,1.553,0.791c0.286,0.181,0.57,0.411,0.85,0.615c0.138,0.102,0.23,0.259,0.41,0.323 c0-0.01,0-0.019,0-0.029c-0.094-0.12-0.119-0.285-0.205-0.411c-0.127-0.127-0.254-0.254-0.381-0.381 c-0.372-0.494-0.846-0.929-1.348-1.289c-0.401-0.288-1.298-0.677-1.466-1.143c-0.01-0.01-0.019-0.019-0.03-0.03 c0.284-0.032,0.617-0.135,0.879-0.205c0.441-0.118,0.834-0.087,1.289-0.205c0.205-0.059,0.41-0.117,0.615-0.176 c0-0.039,0-0.078,0-0.117c-0.23-0.236-0.395-0.548-0.645-0.762c-0.657-0.559-1.373-1.117-2.11-1.583 c-0.409-0.258-0.915-0.426-1.348-0.645c-0.146-0.074-0.402-0.112-0.498-0.234c-0.228-0.29-0.351-0.659-0.527-0.996 c-0.368-0.708-0.73-1.482-1.055-2.227c-0.223-0.508-0.368-1.01-0.645-1.466c-1.331-2.188-2.764-3.509-4.982-4.807 c-0.472-0.276-1.041-0.385-1.642-0.528c-0.323-0.019-0.645-0.039-0.968-0.059c-0.197-0.083-0.401-0.323-0.587-0.44 c-0.735-0.465-2.621-1.475-3.165-0.147c-0.344,0.838,0.514,1.656,0.821,2.081c0.215,0.298,0.491,0.632,0.645,0.968 c0.101,0.22,0.119,0.441,0.205,0.674c0.213,0.574,0.55,1.228,0.826,1.759c0.139,0.269,0.293,0.551,0.469,0.791 c0.108,0.147,0.293,0.212,0.323,0.44c-0.181,0.253-0.191,0.646-0.293,0.968c-0.458,1.445-0.285,3.24,0.381,4.308 c0.204,0.328,0.686,1.032,1.348,0.762c0.579-0.236,0.45-0.967,0.615-1.612c0.037-0.146,0.014-0.253,0.088-0.351 c0,0.01,0,0.019,0,0.03c0.176,0.351,0.351,0.704,0.528,1.055c0.391,0.629,1.084,1.286,1.67,1.73 c0.304,0.23,0.544,0.628,0.938,0.762c0-0.01,0-0.019,0-0.03c-0.01,0-0.019,0-0.03,0c-0.076-0.119-0.196-0.168-0.293-0.264 c-0.229-0.225-0.485-0.504-0.674-0.762c-0.534-0.725-1.006-1.519-1.436-2.345c-0.205-0.395-0.384-0.829-0.557-1.231 c-0.067-0.155-0.066-0.389-0.205-0.469c-0.19,0.294-0.468,0.532-0.615,0.879c-0.234,0.555-0.265,1.233-0.351,1.934 c-0.052,0.018-0.029,0.006-0.059,0.029c-0.408-0.099-0.552-0.518-0.704-0.879c-0.384-0.912-0.455-2.38-0.117-3.429 c0.087-0.272,0.482-1.127,0.323-1.378c-0.076-0.251-0.328-0.396-0.468-0.587c-0.175-0.236-0.348-0.548-0.469-0.821 c-0.314-0.711-0.612-1.538-0.943-2.257c-0.158-0.344-0.425-0.691-0.645-0.996c-0.243-0.338-0.516-0.587-0.704-0.996 c-0.067-0.145-0.158-0.378-0.059-0.528c0.032-0.101,0.076-0.143,0.176-0.176c0.17-0.132,0.643,0.043,0.821,0.117 c0.47,0.195,0.862,0.381,1.26,0.645c0.191,0.127,0.384,0.372,0.615,0.44c0.088,0,0.176,0,0.264,0 c0.413,0.095,0.875,0.03,1.26,0.147c0.682,0.207,1.292,0.529,1.846,0.879c1.69,1.067,3.071,2.585,4.016,4.397 c0.152,0.292,0.218,0.57,0.351,0.879c0.27,0.624,0.611,1.266,0.879,1.876c0.268,0.609,0.53,1.223,0.909,1.73 c0.2,0.266,0.97,0.409,1.319,0.557c0.245,0.104,0.647,0.211,0.879,0.351c0.444,0.268,0.874,0.587,1.289,0.879 C45.528,24.803,46.167,25.124,46.199,25.389z"
          ></path>
          <path
            fill="#00796b"
            d="M33.098,14.223c-0.215-0.004-0.367,0.023-0.528,0.059c0,0.01,0,0.019,0,0.03c0.01,0,0.019,0,0.03,0 c0.103,0.21,0.283,0.347,0.41,0.528c0.098,0.205,0.195,0.41,0.293,0.615c0.01-0.01,0.019-0.019,0.029-0.029 c0.181-0.128,0.265-0.332,0.264-0.645c-0.073-0.077-0.084-0.173-0.147-0.264C33.365,14.394,33.203,14.325,33.098,14.223z"
          ></path>
        </svg>
      ),
    },
    {
      id: 'SQLite',
      name: 'SQLite',
      color: '#003B57',
      logo: <img src="/sqllite.svg" alt="SQLite Logo" />,
    },
    {
      id: 'MariaDB',
      name: 'MarialDB',
      color: '#003B57',
      logo: <img src="/mariadb-icon.svg" alt="SQLite Logo" />,
    },
    {
      id: 'MongoDB',
      name: 'MongoDB',
      color: '#47A248',
      logo: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="96"
          height="96"
          viewBox="0 0 48 48"
        >
          <path
            fill="#5d4037"
            d="M42,17.3C42,37.8,24,44,24,44S6,37.8,6,17.3c0-2.5,0.2-4.6,0.4-6.3c0.3-2.5,2-4.5,4.4-5.1 C13.9,5,18.8,4,24,4s10.1,1,13.3,1.9c2.4,0.6,4.1,2.7,4.4,5.1C41.8,12.7,42,14.9,42,17.3z"
          ></path>
          <path
            fill="#4caf50"
            d="M24,7c4.9,0,9.5,1,12.5,1.8c1.2,0.3,2,1.3,2.2,2.6c0.2,1.9,0.3,3.9,0.3,5.9c0,15.6-11.5,21.9-15,23.4 c-3.5-1.6-15-7.9-15-23.4c0-2,0.1-4,0.3-5.9c0.1-1.3,1-2.3,2.2-2.6C14.5,8,19.1,7,24,7 M24,4c-5.2,0-10.1,1-13.3,1.9 C8.4,6.5,6.6,8.6,6.4,11C6.2,12.7,6,14.9,6,17.3C6,37.8,24,44,24,44s18-6.2,18-26.7c0-2.5-0.2-4.6-0.4-6.3c-0.3-2.5-2-4.5-4.4-5.1 C34.1,5,29.2,4,24,4L24,4z"
          ></path>
          <path fill="#dcedc8" d="M23 28H25V36H23z"></path>
          <path
            fill="#4caf50"
            d="M24,10c0,0-6,5-6,13c0,5.2,3.3,8.5,5,10l1-3l1,3c1.7-1.5,5-4.8,5-10C30,15,24,10,24,10z"
          ></path>
          <path fill="#81c784" d="M24,10c0,0-6,5-6,13c0,5.2,3.3,8.5,5,10l1-3V10z"></path>
        </svg>
      ),
    },
  ]
  return (
    <CContainer>
      <CCard>
        <CCardBody>
          {/* Step Indicator */}
          <CRow className="mb-4">
            <CCol className="text-center">
              <div className="step-indicator-container">
                {renderStepIndicator(1)}
                <div className="step-line"></div>
                {renderStepIndicator(2)}
                <div className="step-line"></div>
                {renderStepIndicator(3)}
              </div>
            </CCol>
          </CRow>

          <CForm>
            {step === 1 && (
              <>
                <CRow>
                  <CCol>
                    <CFormLabel>Database Name</CFormLabel>
                    <CFormInput
                      type="text"
                      name="DB_Name"
                      value={formData.DB_Name}
                      onChange={handleInputChange}
                    />
                  </CCol>
                </CRow>
                <CRow>
                  <CCol>
                    <CFormLabel>Choose a Database</CFormLabel>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '16px',
                      }}
                    >
                      {databases.map((db) => (
                        <div
                          key={db.id}
                          id={db.id}
                          onClick={() => handleDbTypeChange(db.id)}
                          style={{
                            backgroundColor: formData.DB_Type === db.id ? '#f3f3f3' : '#ffffff',
                            padding: '24px',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                            cursor: 'pointer',
                            textAlign: 'center',
                            transition: 'background-color 0.3s',
                            border: '1px solid #ddd',
                          }}
                          onMouseEnter={(e) => (e.target.style.backgroundColor = '#f3f3f3')}
                          onMouseLeave={(e) =>
                            (e.target.style.backgroundColor =
                              formData.DB_Type === db.id ? '#f3f3f3' : '#ffffff')
                          }
                        >
                          <div style={{ marginBottom: '16px', color: db.color }}>
                            {db.logo}
                            {/* <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="48"
                              height="48"
                              viewBox="0 0 48 48"
                            >
                              <path fill={db.color} d={db.logo}></path>
                            </svg> */}
                          </div>
                          <div style={{ fontWeight: 'bold', fontSize: '16px' }}>{db.name}</div>
                        </div>
                      ))}
                    </div>
                    {/* <CFormSelect name="dbType" value={dbType} onChange={handleDbTypeChange}>
                      <option value="">Select Database Type</option>
                      <option value="MySQL">MySQL</option>
                      <option value="MongoDB">MongoDB</option>
                      <option value="SQLite">SQLite</option>
                      <option value="PostgreSQL">PostgreSQL</option>
                    </CFormSelect> */}
                  </CCol>
                </CRow>
                <div className="d-flex mt-3">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={nextPage}
                    disabled={!formData.DB_Name || !dbType}
                  >
                    Next
                  </button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                {renderDbFields()}
                <div className="d-flex gap-3 mt-3">
                  <button type="button" className="btn btn-danger" onClick={prevPage}>
                    Back
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={nextPage}
                    disabled={isSubmitDisabled}
                  >
                    Next
                  </button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <CRow>
                  <CCol>
                    <h5>Database Connection Details</h5>
                    <p>
                      <strong>Database Name:</strong> {formData.DB_Name}
                    </p>
                    <p>
                      <strong>Database Type:</strong> {dbType}
                    </p>
                    {dbType === 'MongoDB' && (
                      <p>
                        <strong>Connection URL:</strong> {formData.connectionUrl}
                      </p>
                    )}
                    {dbType === 'SQLite' && (
                      <p>
                        <strong>Database Path:</strong> {formData.databasePath}
                      </p>
                    )}
                    {(dbType == 'MySQL' || dbType == 'PostgreSQL' || dbType == 'MariaDB') && (
                      <>
                        <p>
                          <strong>Host:</strong> {formData.host}
                        </p>
                        <p>
                          <strong>Host DB Name:</strong> {formData.databaseName}
                        </p>
                        <p>
                          <strong>Username:</strong> {formData.username}
                        </p>
                        <p>
                          <strong>Password:</strong> {formData.password}
                        </p>
                        <p>
                          <strong>Port:</strong> {formData.port}
                        </p>
                      </>
                    )}
                  </CCol>
                </CRow>
                <div className="d-flex gap-3 mt-3">
                  <button type="button" className="btn btn-danger" onClick={prevPage}>
                    Back
                  </button>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={handleSubmit}
                    disabled={isSubmitDisabled}
                  >
                    Submit
                  </button>
                </div>
              </>
            )}
          </CForm>
        </CCardBody>
      </CCard>
    </CContainer>
  )
}

export default ConnectToDatabase
