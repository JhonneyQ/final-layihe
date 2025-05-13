import { useContext, useEffect, useState } from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import axios from 'axios';

import Client from './components/client';
import Characters from './pages/characters';
import About from './pages/about_us';
import Profile from './pages/profile';
import Moments from './pages/reels';
import CharDetails from './pages/characterDetails';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import { AuthContext } from './components/authContext';
import Chat from './components/Chat';
import ChatProv from './components/chatContext';
import UploadReel from './components/uploadVideo';
import Saved from './pages/savedVideos';
import Admin from './components/admin';
import ChampCont from './admin/champControl';
import BanUsers from './admin/banUsers';
import Banned from './pages/banned';
import Rprofile from './pages/rProfile';

function App() {
  const { user } = useContext(AuthContext);
  const [get, setGet] = useState(null);

  useEffect(() => {
    const getData = async () => {
      if (!user?._id) return;
      try {
        const res = await axios.get(`http://localhost:8080/api/user/find/${user?._id}`);
        setGet(res.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    getData();
  }, [user]); 

  if (get?.banned) {
    return <Navigate to="/banned" />;
  }

  return (
    <ChatProv user={user}>
      <Routes>
        <Route path="/" element={<Client />}>
          <Route index element={<Home />} />
          <Route path="characters" element={<Characters />} />
          <Route path="about" element={<About />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profile/:id" element={<Rprofile />} />
          <Route path="moments" element={<Moments />} />
          <Route path="chardetails/:id" element={<CharDetails />} />
          <Route path="chat" element={<Chat />} />
          <Route path="post" element={<UploadReel />} />
          <Route path="saved" element={<Saved />} />
        </Route>

        {get?.role === "admin" && (
          <Route path="/admin" element={<Admin />}>
            <Route index element={<ChampCont />} />
            <Route path="banUsers" element={<BanUsers />} />
          </Route>
        )}

        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/banned" element={get?.banned ? <Banned /> : <Navigate to="/" />} />
      </Routes>
    </ChatProv>
  );
}

export default App;
