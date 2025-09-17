import React, { useEffect, useState } from 'react'
import ProfileEdit from './ProfileEdit'
import PreferenceEdit from './PreferenceEdit'
import { addPreference } from '../Utils/preferenceSlice'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { BASE_URL } from '../Utils/appConstants'

const Profile = () => {
  const [activeForm, setActiveForm] = useState("preference")
  const dispatch = useDispatch()
  const fetchPreference = async () => {
    try {
      const preference = await axios.get(`${BASE_URL}/users/me/preferences`, { withCredentials: true })
      dispatch(addPreference(preference.data))
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchPreference()
  }, [])

  return (
    <div className="flex flex-row min-h-screen">
      {/* Sidebar */}
      <div className="flex flex-col w-40 bg-base-200 p-4 gap-2">
        <div
          className={`cursor-pointer p-2 rounded-lg ${activeForm === "profile" ? "bg-primary text-white" : "hover:bg-base-300"
            }`}
          onClick={() => setActiveForm("profile")}
        >
          Profile
        </div>
        <div
          className={`cursor-pointer p-2 rounded-lg ${activeForm === "preference" ? "bg-primary text-white" : "hover:bg-base-300"
            }`}
          onClick={() => setActiveForm("preference")}
        >
          Preference
        </div>
      </div>

      {/* Form area */}
      <div className="flex-1 p-6">
        {activeForm === "profile" ? <ProfileEdit /> : <PreferenceEdit />}
      </div>
    </div>
  )
}

export default Profile