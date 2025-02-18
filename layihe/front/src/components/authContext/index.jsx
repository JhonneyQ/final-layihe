import { createContext, useCallback, useState } from "react";


export const AuthContext = createContext()

import React from 'react'

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null)
    const [registerInfo, setRegisterInfo] = useState({
        name:"",
        email:"",
        password:""
    })

    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info)
    },[])

  return (
    <AuthContext.Provider value={{user, registerInfo, updateRegisterInfo}}>children</AuthContext.Provider>
  )
}

export default AuthProvider