import React from 'react'
import { Outlet } from 'react-router-dom'
import Aheader from '../../layouts/Aheader'

const Admin = () => {
    return (
        <>
            <Aheader />
            <Outlet/>

        </>
    )
}

export default Admin