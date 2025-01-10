import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

const Login = () => {
  const [loading, setLoading] = useState(false)
  const [validForm, setValidForm] = useState(false)
  const navigate = useNavigate()
  const [auth, setAuth] = useState({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState({
    emailError: '',
    passwordError: '',
  })
  const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
  )
  const validPasswordRegex = RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{7,}$/)
  // const history = useNavigate()
  // const handleChange = (e) => (event) => {

  //   setAuth({ ...auth, [e]: event.target.value });
  // };
  const validateForm = () => {
    let valid = true
    Object.values(errors).forEach((val) => {
      if (val.length > 0) {
        valid = false
        return false
      }
    })
    Object.values(auth).forEach((val) => {
      if (val.length <= 0) {
        valid = false
        return false
      }
    })
    return valid
  }

  //cheking email and password
  useEffect(() => {
    if (validateForm()) {
      setValidForm(true)
    } else {
      setValidForm(false)
    }
  }, [errors])
  const handleChange = (e) => {
    const { name, value } = e.target

    switch (name) {
      case 'email':
        setErrors({
          ...errors,
          emailError: validEmailRegex.test(value) ? '' : 'Email is not valid!',
        })

        break
      case 'password':
        setErrors((errors) => ({
          ...errors,
          passwordError: validPasswordRegex.test(value)
            ? ''
            : 'Password Shoud Be 8 Characters Long, Atleast One Uppercase, Atleast One Lowercase,Atleast One Digit, Atleast One Special Character',
        }))
        break
      default:
        break
    }

    setAuth({ ...auth, [name]: value })
  }
  const handleSubmit = async (e) => {
    if (!(auth.email && auth.password)) {
      return Swal.fire('Error!', 'All fields are required', 'error')
    }
    setLoading(true)
    try {
      const res = await axios.post('/api/users/login', auth)
      // console.log(res)
      if (res.data.success === true) {
        localStorage.setItem('authToken', res.data.token)
        // console.log(res.data.token)
        navigate('/dashboard')
        setLoading(false)
        Swal.fire({
          icon: 'success',
          title: 'Logged in successfully',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        })
      }
    } catch (error) {
      setLoading(false)
      Swal.fire('Error!', 'Invalid Credentials', 'error')
    }
  }
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-body-secondary">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        type="email"
                        placeholder="Email"
                        onChange={handleChange}
                        value={auth.email}
                        name="email"
                        autoComplete="email"
                      />
                    </CInputGroup>
                    {errors.emailError && (
                      <p className="text-center py-2 text-danger">{errors.emailError}</p>
                    )}
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        name="password"
                        value={auth.password}
                        onChange={handleChange}
                        placeholder="Password"
                        autoComplete="current-password"
                      />
                    </CInputGroup>
                    {errors.passwordError && (
                      <p className="text-center py-2 text-danger">{errors.passwordError}</p>
                    )}
                    <CRow>
                      <CCol xs={6}>
                        <CButton
                          color="primary"
                          className="px-4"
                          type="submit"
                          onClick={handleSubmit}
                          disabled={loading}
                        >
                          {loading ? <CSpinner variant="grow" /> : 'Login'}
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton
                          color="link"
                          // onClick={() => navigate('/forget-password')}
                          className="px-0"
                        >
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <h5>Turn questions into data insights, with SQL AI.</h5>
                    <p>
                      Make your team more informed, and save time, by connecting an SQL AI chatbot
                      to your database.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
