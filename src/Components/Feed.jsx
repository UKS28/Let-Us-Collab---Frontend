import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../Utils/appConstants'
import { addFeed } from '../Utils/feedSlice'
import UserCard from './UserCard'
import axios from 'axios'

const Feed = () => {
  const feed = useSelector((store) => store.feed)
  const user = useSelector((store) => store.user)
  const dispatch = useDispatch()
    
  const getFeed = async () => {
    if(feed) return
    try {
        const result = await axios.get(`${BASE_URL}/user/me/feeds`, {withCredentials: true})
        dispatch(addFeed(result.data.data))
    } catch( err) {
        console.error(err)
    }
  }

  useEffect(()=> {
    getFeed()
  }, [])

  if(!feed) return
  if(feed.length == 0)
    return <h1 className="flex justify-center my-10">No new users founds!</h1>;

  return (
    feed  && (
        
        <div className="flex justify-center my-10">
            <UserCard data = {feed[0]} />
        </div>
    )
  )
}

export default Feed