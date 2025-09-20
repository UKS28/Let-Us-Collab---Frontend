import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import axios from 'axios'
import { BASE_URL } from '../Utils/appConstants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../Utils/userSlice'

const Body = () => {
  const userData = useSelector(store => store.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const fetchProfile = async () => {
    try {
      if (userData) return
      console.log("host", location.host)
      const result = await axios.get(`${BASE_URL}/users/me`, { withCredentials: true })
      dispatch(addUser(result.data.data))
      return navigate("/")
    } catch (err) {
      if (err.status === 401)
        return navigate("/login")
      console.error(err)
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  return (
    <div>
      <Navbar />
      <div className='pb-10 pr-5'>
        <Outlet />
      </div>
      <Footer />
    </div>

  )
}

export default Body