import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
const Register = () => {
  const [name, setname] = useState('')
  const [number, setNumber] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
  )
  const validPasswordRegex = RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/)

  const validateFields = () => {
    const newErrors = {}
    if (!name.trim()) newErrors.name = 'name is required!'
    if (!validEmailRegex.test(email)) newErrors.email = 'Invalid email address!'
    if (!validPasswordRegex.test(password))
      newErrors.password =
        'Password must be 8+ characters, with uppercase, lowercase, digit, and special character.'
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match!'
    setErrors(newErrors)
    if (number.length < 10) newErrors.number = 'Number is required!'

    return Object.keys(newErrors).length === 0
  }

  const validateField = (field) => {
    let fieldError = ''
    switch (field) {
      case 'name':
        if (!name.trim()) fieldError = 'name is required!'
        setErrors((prev) => ({ ...prev, name: fieldError }))
        break
      case 'email':
        if (!validEmailRegex.test(email)) fieldError = 'Invalid email address!'
        setErrors((prev) => ({ ...prev, email: fieldError }))
        break
      case 'password':
        if (!validPasswordRegex.test(password))
          fieldError =
            'Password must be 8+ characters, with uppercase, lowercase, digit, and special character.'
        setErrors((prev) => ({ ...prev, password: fieldError }))
        break
      case 'confirmPassword':
        if (password !== confirmPassword) fieldError = 'Passwords do not match!'
        setErrors((prev) => ({ ...prev, confirmPassword: fieldError }))
        break
      case 'number':
        if (!number) fieldError = 'Number is required!'
        setErrors((prev) => ({ ...prev, number: fieldError }))
        break
      default:
        break
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    if (!validateFields()) return
    try {
      const response = await axios.post('/api/users/register', {
        name,
        email,
        password,
        number,
      })
      if (response.data) {
        Swal.fire({
          icon: 'success',
          title: 'Registration successful!',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        })
        navigate('/login')
      }
    } catch (error) {
      console.error('Registration failed:', error)
    }
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handleRegister}>
                  <h1>Register</h1>
                  <p className="text-body-secondary">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="name"
                      value={name}
                      onChange={(e) => setname(e.target.value)}
                      onBlur={() => validateField('name')}
                      autoComplete="name"
                    />
                  </CInputGroup>
                  {errors.name && <p className="text-danger">{errors.name}</p>}
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onBlur={() => validateField('email')}
                      autoComplete="email"
                    />
                  </CInputGroup>
                  {errors.email && <p className="text-danger">{errors.email}</p>}
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Number"
                      value={number}
                      onChange={(e) => setNumber(e.target.value)}
                      onBlur={() => validateField('number')}
                      autoComplete="number"
                    />
                  </CInputGroup>
                  {errors.number && <p className="text-danger">{errors.number}</p>}
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onBlur={() => validateField('password')}
                      autoComplete="new-password"
                    />
                  </CInputGroup>
                  {errors.password && <p className="text-danger">{errors.password}</p>}
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Repeat password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      onBlur={() => validateField('confirmPassword')}
                      autoComplete="new-password"
                    />
                  </CInputGroup>
                  {errors.confirmPassword && (
                    <p className="text-danger">{errors.confirmPassword}</p>
                  )}
                  <div className="d-grid">
                    <CButton color="success" type="submit">
                      Create Account
                    </CButton>
                  </div>
                </CForm>
                <CCol xs={12} className="text-right mt-3">
                  <span className="text-medium-emphasis">
                    Already have an account? Continue to{' '}
                  </span>
                  <CButton onClick={() => navigate('/login')} color="link" className="px-2">
                    Sign in
                  </CButton>
                </CCol>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register

// import React, { useState } from 'react'
// import {
//   CButton,
//   CCard,
//   CCardBody,
//   CCol,
//   CContainer,
//   CForm,
//   CFormInput,
//   CInputGroup,
//   CInputGroupText,
//   CRow,
//   CSpinner,
// } from '@coreui/react'
// import CIcon from '@coreui/icons-react'
// import { cilLockLocked, cilUser } from '@coreui/icons'
// import { useNavigate } from 'react-router-dom'
// import Swal from 'sweetalert2'
// import axios from 'axios'

// const Register = () => {
//   const [name, setname] = useState('')
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [confirmPassword, setConfirmPassword] = useState('')
//   const [errors, setErrors] = useState({})
//   const [loading, setLoading] = useState(false)
//   const navigate = useNavigate()

//   const validEmailRegex = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
//   const validPasswordRegex = RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{7,}$/)

//   const validateFields = () => {
//     const newErrors = {}
//     if (!name.trim()) newErrors.name = 'name is required!'
//     if (!validEmailRegex.test(email)) newErrors.email = 'Invalid email address!'
//     if (!validPasswordRegex.test(password))
//       newErrors.password =
//         'Password must be 8+ characters, with uppercase, lowercase, digit, and special character.'
//     if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match!'
//     setErrors(newErrors)
//     return Object.keys(newErrors).length === 0
//   }

//   const handleRegister = async (e) => {
//     e.preventDefault()
//     if (!validateFields()) return
//     setLoading(true)
//     try {
//       const response = await axios.post('/api/users/register', { name, email, password })
//       if (response.data.success) {
//         Swal.fire('Success!', 'Account created successfully!', 'success')
//         navigate('/login')
//       }
//     } catch (error) {
//       Swal.fire('Error!', 'Registration failed. Please try again.', 'error')
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
//       <CContainer>
//         <CRow className="justify-content-center">
//           <CCol md={9} lg={7} xl={6}>
//             <CCard className="mx-4">
//               <CCardBody className="p-4">
//                 <CForm onSubmit={handleRegister}>
//                   <h1>Register</h1>
//                   <p className="text-body-secondary">Create your account</p>
//                   <CInputGroup className="mb-3">
//                     <CInputGroupText>
//                       <CIcon icon={cilUser} />
//                     </CInputGroupText>
//                     <CFormInput
//                       placeholder="name"
//                       value={name}
//                       onChange={(e) => setname(e.target.value)}
//                       autoComplete="name"
//                     />
//                   </CInputGroup>
//                   {errors.name && <p className="text-danger text-center">{errors.name}</p>}
//                   <CInputGroup className="mb-3">
//                     <CInputGroupText>@</CInputGroupText>
//                     <CFormInput
//                       placeholder="Email"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       autoComplete="email"
//                     />
//                   </CInputGroup>
//                   {errors.email && <p className="text-danger text-center">{errors.email}</p>}
//                   <CInputGroup className="mb-3">
//                     <CInputGroupText>
//                       <CIcon icon={cilLockLocked} />
//                     </CInputGroupText>
//                     <CFormInput
//                       type="password"
//                       placeholder="Password"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       autoComplete="new-password"
//                     />
//                   </CInputGroup>
//                   {errors.password && <p className="text-danger text-center">{errors.password}</p>}
//                   <CInputGroup className="mb-4">
//                     <CInputGroupText>
//                       <CIcon icon={cilLockLocked} />
//                     </CInputGroupText>
//                     <CFormInput
//                       type="password"
//                       placeholder="Repeat password"
//                       value={confirmPassword}
//                       onChange={(e) => setConfirmPassword(e.target.value)}
//                       autoComplete="new-password"
//                     />
//                   </CInputGroup>
//                   {errors.confirmPassword && (
//                     <p className="text-danger text-center">{errors.confirmPassword}</p>
//                   )}
//                   <div className="d-grid">
//                     <CButton color="success" type="submit" disabled={loading}>
//                       {loading ? <CSpinner variant="grow" size="sm" /> : 'Create Account'}
//                     </CButton>
//                   </div>
//                 </CForm>
//               </CCardBody>
//             </CCard>
//           </CCol>
//         </CRow>
//       </CContainer>
//     </div>
//   )
// }

// export default Register
