import axios from "axios";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { BASE_URL } from "../Utils/appConstants";
import { addPreference } from "../Utils/preferenceSlice";

const experienceOptions = ["student", "junior", "mid", "senior", "expert"];
const lookingForOptions = [
  "co-founder",
  "project collaboration",
  "mentorship",
  "networking",
  "freelance/gig",
  "full-time role",
];

const PreferenceEdit = () => {
  const preference = useSelector((state) => state.preference);
  const [showToast, setShowToast] = useState(false);
  const [form, setForm] = useState(preference);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleArrayChange = (field, value) => {
    setForm((prev) => {
      const exists = prev[field].includes(value);
      return {
        ...prev,
        [field]: exists
          ? prev[field].filter((v) => v !== value)
          : [...prev[field], value],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(`${BASE_URL}/users/me/preferences`, form, { withCredentials: true })
      dispatch(addPreference(result.data.preference))
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      console.error("Error Occured while Preference Updation", err)
    }
  };

  if (!form) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="pb-20 w-full">
      <h2 className="text-xl font-bold mb-4">Edit Preference</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="profession"
          value={form.profession}
          onChange={handleChange}
          placeholder="Profession"
          className="input input-bordered w-full"
        />

        <textarea
          name="about"
          value={form.about}
          onChange={handleChange}
          placeholder="About"
          className="textarea textarea-bordered w-full"
        />

        <input
          type="text"
          name="skills"
          value={form.skills.join(", ")}
          onChange={(e) =>
            setForm({
              ...form,
              skills: e.target.value.split(",").map((s) => s.trim()),
            })
          }
          placeholder="Skills (comma separated)"
          className="input input-bordered w-full"
        />

        <select
          name="experience_level"
          value={form.experience_level}
          onChange={handleChange}
          className="select select-bordered w-full"
        >
          <option disabled>Select experience level</option>
          {experienceOptions.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Location"
          className="input input-bordered w-full"
        />

        <div>
          <label className="block mb-2 font-medium">Looking For</label>
          <div className="flex flex-wrap gap-2">
            {lookingForOptions.map((option) => (
              <label key={option} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.looking_for.includes(option)}
                  onChange={() => handleArrayChange("looking_for", option)}
                  className="checkbox checkbox-primary"
                />
                {option}
              </label>
            ))}
          </div>
        </div>

        <input
          type="url"
          name="github_link"
          value={form.github_link}
          onChange={handleChange}
          placeholder="GitHub URL"
          className="input input-bordered w-full"
        />

        <input
          type="url"
          name="portfolio_link"
          value={form.portfolio_link}
          onChange={handleChange}
          placeholder="Portfolio URL"
          className="input input-bordered w-full"
        />

        <input
          type="url"
          name="linkedin_link"
          value={form.linkedin_link}
          onChange={handleChange}
          placeholder="LinkedIn URL"
          className="input input-bordered w-full"
        />

        <button type="submit" className="btn btn-primary mt-4">
          Save Changes
        </button>
      </form>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Preference saved successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreferenceEdit;
