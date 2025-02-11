import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Reels from './test'
import { Route, Routes } from 'react-router-dom'
import Client from './components/client'
import Characters from './pages/characters'
import About from './pages/about_us'
import Profile from './pages/profile'
import Moments from './pages/reels'
import CharDetails from './pages/characterDetails'
import Home from './pages/home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={<Client/>}>
            <Route index element={<Home/>}/>
            <Route path='characters' element={<Characters/>}/>
            <Route path='about' element={<About/>}/>
            <Route path='profile' element={<Profile/>}/>
            <Route path='moments' element={<Moments/>}/>
            <Route path='chardetails/:id' element={<CharDetails/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
