import { createContext, useCallback, useState } from "react";
import axios from "axios"


export const AuthContext = createContext()

import React from 'react'

const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null)
  // const [registerError, setRegisterError] = useState(null)
  const [registerLoading, setRegisteLoading] = useState(false)
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: ""
  })

  const updateRegisterInfo = useCallback((info) => {
    setRegisterInfo(info)
  }, [])


  console.log(registerInfo);
  
  const registerUser = useCallback(async (e) => {
    e.preventDefault()
    setRegisteLoading(true)
    const res = await axios.post(`http://localhost:8080/api/user/register`, registerInfo)

    setRegisteLoading(false)

    localStorage.setItem("user", JSON.stringify(res.data))
    setUser(res.data)
    
  }, [registerInfo])
  


  return (
    <AuthContext.Provider value={{ user, registerInfo, updateRegisterInfo, registerUser , registerLoading}}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider