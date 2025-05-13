import React, { useContext } from 'react'
import "./index.scss"
import { AuthContext } from '../../components/authContext';

const Banned = () => {
  const { user, logoutUser } = useContext(AuthContext);
  return (
    <section className='ban'>
        <div className='container'>
            <h2>You are banned</h2>
            <button onClick={() => logoutUser()}>LogOut</button>
        </div>
    </section>
  )
}

export default Banned