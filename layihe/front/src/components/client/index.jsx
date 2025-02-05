import React from 'react'
import Cheader from '../../layouts/header'
import { Outlet } from 'react-router-dom'

const Client = () => {
    return (
        <>
            <Cheader />
            <Outlet/>
        </>
    )
}

export default Client