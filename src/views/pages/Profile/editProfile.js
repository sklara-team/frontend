import React from 'react'
import {
  CForm,
  CCol,
  CFormLabel,
  CContainer,
  CRow,
  CCardGroup,
  CCard,
  CCardBody,
  CFormInput,
  CButton,
} from '@coreui/react'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { isAutheticated } from '../../../auth'
import Swal from 'sweetalert2'

const EditProfile = () => {
  const [image, setImage] = useState('')
  const [loading, setLoading] = useState(false)
  const [imagesPreview, setImagesPreview] = useState()
  const token = isAutheticated()
  const navigate = useNavigate()

  const [ownerDetails, setOwnerDetails] = useState({
    name: '',
    email: '',
    number: '',
  })
  const history = useNavigate()

  const getData = async () => {
    let res = await axios.get(`/api/users/details`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (res.data.success) {
      setOwnerDetails({ ...res.data.user })

      if (res.data.user.avatar) {
        setImagesPreview(res.data.user.avatar.url)
      }
    }
  }
  const handleChange = (event) => {
    const { name, value } = event.target
    setOwnerDetails({ ...ownerDetails, [name]: value })
  }

  const handleImage = (e) => {
    const files = e.target.files[0]

    // console.log(files)
    setImage(files)
    // only for file preview------------------------------------
    const Reader = new FileReader()
    Reader.readAsDataURL(files)

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setImagesPreview(Reader.result)
      }
    }

    // -----------------------------------------------------------------------------
  }
  async function handleSubmit() {
    if (ownerDetails.name === '' || ownerDetails.email === '' || ownerDetails.number === '') {
      Swal.fire({
        icon: 'warning',
        title: 'All fields are required',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      })

      return
    }
    const formData = new FormData()
    formData.append('name', ownerDetails.name)
    formData.append('email', ownerDetails.email)
    formData.append('number', ownerDetails.number)
    formData.append('avatar', image)
    setLoading(true)
    try {
      const res = await axios.put(`/api/users/update/profile`, formData, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/formdata',
        },
      })
      if (res.data.success === true) {
        setLoading(false)
        Swal.fire({
          icon: 'success',
          title: 'Profile Edited',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        })
        history(-1)
      }
    } catch (error) {
      const message = error?.response?.data?.message || 'Something went wrong!'
      setLoading(false)
      Swal.fire({
        icon: 'error',
        title: message,
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      })
    }
  }
  const handleCancle = () => {
    navigate('/dashboard')
  }
  useEffect(() => {
    getData()
  }, [])

  return (
    <div>
      <CContainer>
        <CRow className="justify-content-center mt-3">
          <CCol md={8} className="mt-5">
            <CCardGroup>
              <CCard className="p-4">
                <h2>Edit Profile</h2>
                <CCardBody>
                  <CForm className="row g-3">
                    <CCol xs={12}>
                      <CFormLabel htmlFor="inputAddress">Name *</CFormLabel>
                      <CFormInput
                        id="inputAddress"
                        placeholder=""
                        name="name"
                        value={ownerDetails.name}
                        onChange={handleChange}
                      />
                    </CCol>

                    <CCol md={6}>
                      <CFormLabel htmlFor="inputEmail4">Email *</CFormLabel>
                      <CFormInput
                        type="email"
                        id="inputEmail4"
                        name="email"
                        value={ownerDetails.email}
                        onChange={handleChange}
                      />
                    </CCol>
                    <CCol md={6}>
                      <CFormLabel htmlFor="inputPassword4">number *</CFormLabel>
                      <CFormInput
                        type="number"
                        id="inputPassword4"
                        minLength={8}
                        name="number"
                        value={ownerDetails.number}
                        onChange={handleChange}
                      />
                    </CCol>

                    {/* <CFormInput
                                            type="file"
                                            placeholder="image"
                                            accept="image/*"
                                            required
                                            onChange={handleImage}


                                        />
                                        <div id="createProductFormImage" className="w-50 d-flex">

                                            {imagesPreview && <img className=" w-50 p-1 " src={imagesPreview} alt="Product Preview" />}

                                        </div> */}
                    <CCol xs={12}>
                      <CButton onClick={handleSubmit} color="primary">
                        {loading ? 'Loading...' : 'Submit'}
                      </CButton>
                      <CButton style={{ marginLeft: 2 }} onClick={handleCancle} color="warning">
                        Cancel
                      </CButton>
                    </CCol>
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

export default EditProfile
