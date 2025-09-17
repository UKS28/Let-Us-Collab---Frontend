import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./Components/Body";
import Login from "./Components/Login";
import { Provider } from "react-redux"
import appStore from "./Utils/appStore";
import Feed from "./Components/Feed";
import Profile from "./Components/Profile";
import ReceivedRequest from "./Components/ReceivedRequest";
import Connections from "./Components/Connections";
import Chat from "./Components/Chat";

export default function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/received" element={<ReceivedRequest />} />
              <Route path="/chat" element={<Connections />} />
              <Route path="/chat/:receiverId" element={<Chat />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}