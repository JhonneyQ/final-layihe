import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from './components/authContext/index.jsx';
// import ContextProvider from './components/vidCont/index.jsx';








createRoot(document.getElementById('root')).render(
  <BrowserRouter>


    <AuthProvider>
     
        <App />
   
    </AuthProvider>
  </BrowserRouter>,
)
