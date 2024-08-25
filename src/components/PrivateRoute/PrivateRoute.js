import React, {  } from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'
import { jwtDecode } from "jwt-decode"

function PrivateRoute({ allowRole }) {
    const user = JSON.parse(localStorage.getItem('user'))
    const location = useLocation()
    const userEncoded = (user && jwtDecode(user)?.group?.group_name) || ''
    
    return (
        allowRole.includes(userEncoded)
        ? <Outlet />
        : <Navigate to='/login' state={{ from: location}} replace /> 
    )
}

export default PrivateRoute