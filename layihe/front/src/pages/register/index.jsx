import React, { useContext } from 'react'
import { AuthContext } from '../../components/authContext'

const Register = () => {

    const {user, registerInfo, updateRegisterInfo} = useContext(AuthContext)
  return (
    <div>Register</div>
  )
}

export default Register