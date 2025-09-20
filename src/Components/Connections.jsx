import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../Utils/appConstants'
import { Link } from 'react-router-dom'
import { addConnections } from '../Utils/connectionSlice'

const Connections = () => {
    const connections = useSelector(state => state.connection)
    const dispatch = useDispatch()

    const fetchConnections = async () => {
        try {
            const result = await axios.get(`${BASE_URL}/me/connections`, { withCredentials: true })
            dispatch(addConnections(result.data.data))
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchConnections()
    }, [])

    // shimmer
    if (!connections) {
        return (
            <div className="flex items-center justify-center h-screen">
                <span className="loading loading-bars loading-xl"></span>
            </div>
        )
    }
    if (connections.length === 0) return <p>No More Requests</p>

    return (
        <>
            {connections.map((entry, index) =>
                <div key={index} className="card bg-base-100 shadow-md w-96 p-4 flex flex-row items-center gap-4 mx-auto my-10">
                    {/* Avatar */}
                    <div className="w-20 h-20">
                        <img
                            src={entry.profileUrl}
                            alt="profile"
                            className="w-full h-full rounded-full object-cover"
                        />
                    </div>

                    {/* About text */}
                    <div className="flex-1">
                        <p className="font-semibold">{entry.firstName + " " + entry.lastName}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                        <button className="btn btn-success"><Link to={`/chat/${entry._id}`} >Chat</Link></button>
                    </div>
                </div>
            )}
        </>

    )
}

export default Connections