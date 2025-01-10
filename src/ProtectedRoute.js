// import { useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { jwtDecode } from 'jwt-decode'

// const isTokenExpired = (token) => {
//   try {
//     const decodedToken = jwtDecode(token)
//     const currentTime = Date.now() / 1000
//     return decodedToken.exp < currentTime
//   } catch (error) {
//     console.error('Error decoding token:', error)
//     return true
//   }
// }

// const ProtectedRoute = ({ element: Element }) => {
//   const navigate = useNavigate()

//   useEffect(() => {
//     const checkToken = () => {
//       const token = localStorage.getItem('authToken')
//       if (!token || isTokenExpired(token)) {
//         console.log('Token is expired or not present, redirecting to login')
//         navigate('/login')
//       } else {
//         console.log('Token is valid')
//       }
//     }

//     checkToken()
//   }, [navigate])

//   return <Element />
// }

// export default ProtectedRoute

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

const isTokenExpired = (token) => {
  try {
    const decodedToken = jwtDecode(token)
    const currentTime = Date.now() / 1000
    return decodedToken.exp < currentTime
  } catch (error) {
    console.error('Error decoding token:', error)
    return true
  }
}

const ProtectedRoute = ({ element: Element }) => {
  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(
      () => {
        const token = localStorage.getItem('authToken')
        if (!token || isTokenExpired(token)) {
          console.log('Token is expired or not present, redirecting to login')
          navigate('/login')
        } else {
          console.log('Token is valid')
        }
      },
      2 * 60 * 1000,
    ) // Check every 2 minutes

    // Initial check when component mounts
    const token = localStorage.getItem('authToken')
    if (!token || isTokenExpired(token)) {
      console.log('Token is expired or not present, redirecting to login')
      navigate('/login')
    }

    return () => clearInterval(interval) // Clean up interval on unmount
  }, [navigate])

  return <Element />
}

export default ProtectedRoute
