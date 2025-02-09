import React from 'react'
import Cheader from '../../layouts/header'
import { Outlet } from 'react-router-dom'
import Cfooter from '../../layouts/footer'

const Client = () => {
    return (
        <>
            <Cheader />
            <Outlet/>
            <Cfooter/>
        </>
    )
}

export default Client