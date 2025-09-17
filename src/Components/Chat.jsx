import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { createSocketConnection } from '../Utils/socket'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../Utils/appConstants'

const Chat = () => {
    const user = useSelector((store) => store.user)
    const userId = user?._id
    const [chat, setChat] = useState([])
    const [newMessage, setNewMessage] = useState("");
    const { receiverId } = useParams()
    const fetchChats = async () => {
        try {
            const result = await axios.get(`${BASE_URL}/chats/${receiverId}`, { withCredentials: true })
            const messages = result?.data?.data?.message
            setChat(messages)
        } catch (err) {
            console.error(err)
        }
    }
    const sendMessage = async () => {
        const socket = createSocketConnection()
        socket.emit("sendMessage", {
            firstName: user.firstName,
            lastName: user.lastName,
            senderId: userId,
            receiverId,
            text: newMessage
        })
        setNewMessage("")
    }
    useEffect(() => {
        fetchChats()
    }, [])

    useEffect(() => {
        if (!userId) return
        const socket = createSocketConnection();
        socket.emit("joinChat", {
            firstName: user.firstName,
            senderId: userId,
            receiverId
        })

        socket.on("messageReceived", ({ fromUser, text }) => {
            setChat((messages) => [...messages, { fromUser, text }])
        })

        return () => {
            socket.disconnect()
        }
    }, [userId, receiverId])

    return (
        <>
            <div className="bg-base-300 w-3/4 shadow-xl mx-auto my-6 p-4 rounded-2xl">
                {/* Chat messages box */}
                <div
                    className="h-[75vh] overflow-y-auto pr-2 custom-scrollbar"
                >
                    {chat.map((entry, index) => (
                        <div
                            key={index}
                            className={`chat mb-4 ${entry.fromUser._id === userId ? "chat-end" : "chat-start"
                                }`}
                        >
                            <div className="chat-image avatar">
                                <div className="w-10 h-10 rounded-full">
                                    <img
                                        alt="profile"
                                        src={entry.fromUser?.profileUrl}
                                    />
                                </div>
                            </div>
                            <div className="chat-header text-sm font-semibold mb-1">
                                {entry.fromUser._id === userId
                                    ? "You"
                                    : `${entry.fromUser.firstName} ${entry.fromUser.lastName}`}
                            </div>
                            <div
                                className={`chat-bubble ${entry.fromUser._id === userId
                                    ? "bg-primary text-white"
                                    : "bg-base-200 text-base-content"
                                    }`}
                            >
                                {entry.text}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input box */}
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4 mt-4">
                    <div className="join w-full">
                        <input
                            type="text"
                            className="input join-item w-full"
                            placeholder="Type here..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                        />
                        <button
                            className="btn btn-primary join-item"
                            onClick={sendMessage}
                            disabled = {!newMessage.trim()}
                        >
                            Send
                        </button>
                    </div>
                </fieldset>
            </div>
        </>
    )
}

export default Chat