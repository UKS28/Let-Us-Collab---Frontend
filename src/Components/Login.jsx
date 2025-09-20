import React, { useState } from 'react'
import axios from "axios"
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addUser } from '../Utils/userSlice'
import { BASE_URL } from '../Utils/appConstants'
const Login = () => {
  const [email, setEmail] = useState("ujjwalsingh@123gmail.com")
  const [password, setPassword] = useState("ujjwal@123")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isLoginPage, setisLoginPage] = useState(true)
  const [error, setError] = useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/auth/login`,
        { email, password },
        { withCredentials: true }
      )
      dispatch(addUser(response.data.data))
      return navigate("/")
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong")
      console.error(err)
    }
  }

  const handleSignup = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/auth/signup`,
        { email, password, firstName, lastName, phoneNumber },
        { withCredentials: true }
      )
      dispatch(addUser(response.data.data))
      return navigate("/profile")
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong")
      console.error(err)
    }
  }
  return (
    <div className='flex justify-center my-10'>
      <div className="card card-border bg-base-200 w-96">
        <div className="card-body">
          <h2 className="card-title">{isLoginPage ? "Login" : "SignUp"}</h2>
          <div>
            <fieldset className="fieldset">
              {!isLoginPage &&
                <>
                  <legend className="fieldset-legend" >First Name</legend>
                  <input type="text" className="input" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                  <legend className="fieldset-legend">Last Name</legend>
                  <input type="text" className="input" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </>
              }
              <legend className="fieldset-legend" >Email</legend>
              <input type="text" className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <legend className="fieldset-legend">Password</legend>
              <input type="text" className="input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </fieldset>
          </div>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={isLoginPage ? handleLogin : handleSignup}>{isLoginPage ? "Login" : "Signup"}</button>
          </div>
          <p
            className="m-auto cursor-pointer py-2"
            onClick={() => setisLoginPage((value) => !value)}
          >
            {isLoginPage
              ? "New User? Signup Here"
              : "Existing User? Login Here"}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login