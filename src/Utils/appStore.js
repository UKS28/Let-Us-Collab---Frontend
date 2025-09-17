import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./userSlice"
import feedReducer from "./feedSlice"
import preferenceReducer from "./preferenceSlice"
import requestReducer from "./requestSlice"
import connectionReducer from "./connectionSlice"
const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    preference: preferenceReducer,
    request: requestReducer,
    connection: connectionReducer
  },
})

export default appStore
