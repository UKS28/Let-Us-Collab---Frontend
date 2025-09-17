import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MessageCircle, Users, LogOut, User as UserIcon } from "lucide-react"
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../Utils/appConstants'
import { removeUser } from '../Utils/userSlice'
import { removePreference } from '../Utils/preferenceSlice'
import { clearFeed } from '../Utils/feedSlice'

const Navbar = () => {
    const user = useSelector(store => store.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogout = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/auth/logout`, {}, { withCredentials: true })
            dispatch(removeUser())
            dispatch(removePreference())
            dispatch(clearFeed())
            return navigate("/login")
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="navbar bg-gradient-to-r from-base-200 via-base-300 to-base-200 shadow-md backdrop-blur-md px-4">
            {/* Left section */}
            <div className="navbar-start">
                <Link to="/" className="btn btn-ghost text-xl font-bold tracking-wide">
                    Let Us Collab
                </Link>
            </div>

            {/* Center navigation (desktop only) */}
            {user && (
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-2">
                        <li>
                            <NavLink
                                to="/received"
                                className={({ isActive }) =>
                                    `px-3 py-2 rounded-lg transition flex items-center gap-1 ${isActive
                                        ? "bg-primary text-white font-semibold shadow-sm"
                                        : "hover:bg-base-200"
                                    }`
                                }
                            >
                                <Users size={16} /> Pending
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/chat"
                                className={({ isActive }) =>
                                    `px-3 py-2 rounded-lg transition flex items-center gap-1 ${isActive
                                        ? "bg-primary text-white font-semibold shadow-sm"
                                        : "hover:bg-base-200"
                                    }`
                                }
                            >
                                <MessageCircle size={16} /> Connections
                            </NavLink>
                        </li>
                    </ul>
                </div>
            )}

            {/* Right section */}
            {user && (
                <div className="navbar-end gap-4">
                    <p className="hidden md:block font-medium">Welcome {user.firstName}</p>

                    {/* Avatar dropdown */}
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img
                                    alt="User avatar"
                                    src={user.profileUrl}
                                />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-xl z-10 mt-3 w-52 p-3 shadow-lg border border-base-200"
                        >
                            <li>
                                <Link to="/profile" className="flex items-center gap-2">
                                    <UserIcon size={16} /> Profile
                                </Link>
                            </li>
                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 text-error"
                                >
                                    <LogOut size={16} /> Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Navbar

