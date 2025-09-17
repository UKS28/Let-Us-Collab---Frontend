import axios from "axios";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../Utils/appConstants";
import { addUser } from "../Utils/userSlice";

const ProfileEdit = () => {
  const user = useSelector((state) => state.user);
  const { firstName, lastName, profileUrl } = user;
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [form, setForm] = useState({
    firstName,
    lastName,
    profileUrl,
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const result = await axios.patch(`${BASE_URL}/users/me/profile`, form, { withCredentials: true })
      dispatch(addUser(result.data.data))
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false)
      }, 3000)
    } catch (err) {
      console.error(err)
    }
  };

  if (!user) return navigate("/")
  return (
    <div className="p-6 w-full">
      <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          placeholder="First Name"
          className="input input-bordered w-full"
        />

        <input
          type="text"
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          className="input input-bordered w-full"
        />

        <input
          type="url"
          name="profileUrl"
          value={form.profileUrl}
          onChange={handleChange}
          placeholder="Profile Image URL"
          className="input input-bordered w-full"
        />

        <button type="submit" className="btn btn-primary mt-4">
          Save Changes
        </button>
      </form>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileEdit;
