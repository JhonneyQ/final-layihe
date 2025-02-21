import { useContext, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Reels from './test'
import { Navigate, Route, Routes } from 'react-router-dom'
import Client from './components/client'
import Characters from './pages/characters'
import About from './pages/about_us'
import Profile from './pages/profile'
import Moments from './pages/reels'
import CharDetails from './pages/characterDetails'
import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'
import { AuthContext } from './components/authContext'
import Chat from './components/Chat'
import ChatProv from './components/chatContext'

function App() {
  const [count, setCount] = useState(0)
  const [userr, setUserr] = useState(null);

 
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserr(JSON.parse(storedUser));
    }
  }, []);



  return (
    <>
      <ChatProv user={userr}>
        <Routes>
          <Route path='/' element={<Client />}>
            <Route index element={<Home />} />
            <Route path='characters' element={<Characters />} />
            <Route path='about' element={<About />} />
            <Route path='profile' element={<Profile />} />
            <Route path='moments' element={<Moments />} />
            <Route path='chardetails/:id' element={<CharDetails />} />
            <Route path='chat' element={<Chat />} />

          </Route>
          <Route path="/register" element={userr ? <Navigate to="/" /> : <Register />} />
          <Route path="/login" element={userr ? <Navigate to="/" /> : <Login />} />
        </Routes>
      </ChatProv>
    </>
  )
}

export default App
