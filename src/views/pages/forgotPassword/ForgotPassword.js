import React, { useState } from 'react'
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
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

const ForgetPassword = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await axios.post('/api/users/password/forgot', { email })
      if (res?.status === 200) {
        Swal.fire('Success', res?.data?.message, 'success')
        navigate('/login')
      } else if (res?.status === 305) {
        Swal.fire('Error', res?.data?.message, 'error')
      }
    } catch (err) {
      Swal.fire('Error', 'User not found with this email', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <h1>Forget Password</h1>
                    <p className="text-medium-emphasis">
                      Enter your email, and we will send you a password reset link.
                    </p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </CInputGroupText>
                      <CFormInput
                        type="email"
                        required
                        placeholder="abc@gmail.com"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        name="email"
                        autoComplete="email"
                      />
                    </CInputGroup>

                    <CRow>
                      <CCol xs={12}>
                        <CButton
                          color="primary"
                          type="submit"
                          style={{ width: '100%' }}
                          className="px-4"
                          disabled={loading}
                        >
                          {loading ? <CSpinner variant="grow" /> : 'Generate Password'}
                        </CButton>
                      </CCol>
                      <CCol xs={12} className="text-right mt-3">
                        <span className="text-medium-emphasis">
                          Already know your password? Continue to{' '}
                        </span>
                        <CButton onClick={() => navigate('/login')} color="link" className="px-2">
                          Sign in
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default ForgetPassword
