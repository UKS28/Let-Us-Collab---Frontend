import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../Utils/appConstants'
import { addRequests, removeRequest } from '../Utils/requestSlice'

const ReceivedRequest = () => {
    const request = useSelector(state => state.request)
    const dispatch = useDispatch()

    const fetchRequest = async () => {
        try {
            const result = await axios.get(`${BASE_URL}/me/requests`, { withCredentials: true })
            dispatch(addRequests(result.data.data))
        } catch (err) {
            console.error(err)
        }
    }

    const handleRequest = async (requestId, status) => {
        try {
            const result = await axios.patch(`${BASE_URL}/request/send/${status}/${requestId}`, {}, { withCredentials: true })
            dispatch(removeRequest(result.data.data._id))
        } catch (err) {
            console.error(err)
        }

    }

    useEffect(() => {
        fetchRequest()
    }, [])

    // shimmer
    if (!request) {
        return (
            <div className="flex items-center justify-center h-screen">
                <span className="loading loading-bars loading-xl"></span>
            </div>
        )
    }
    if (request.length === 0) return <p>No More Requests</p>

    return (
        <>
            {request.map(entry =>
                <div className="card bg-base-100 shadow-md w-96 p-4 flex flex-row items-center gap-4 mx-auto my-10">
                    {/* Avatar */}
                    <div className="w-20 h-20">
                        <img
                            src={entry.fromUser?.profileUrl}
                            alt="profile"
                            className="w-full h-full rounded-full object-cover"
                        />
                    </div>

                    {/* About text */}
                    <div className="flex-1">
                        <p className="font-semibold">{entry.fromUser?.firstName + " " + entry.fromUser.lastName}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                        <button className="btn btn-outline btn-success" onClick={() => handleRequest(entry._id, "Accepted")}>Accept</button>
                        <button className="btn btn-outline btn-error" onClick={() => handleRequest(entry._id, "Rejected")}>Reject</button>
                    </div>
                </div>
            )}
        </>

    )
}

export default ReceivedRequest