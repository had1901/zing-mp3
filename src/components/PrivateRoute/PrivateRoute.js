import React, { useEffect } from 'react'
import { Outlet, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { jwtDecode } from "jwt-decode"

function PrivateRoute({ allowRole, children  }) {
    const user = JSON.parse(localStorage.getItem('user'))
    const location = useLocation()
    const navigate = useNavigate()
    const userEncoded = (user && jwtDecode(user)?.group?.group_name) || ''

    useEffect(() => {
        if (userEncoded === 'admin' && (location.pathname === '/login' || location.pathname === '/register')) {
          alert('Bạn không thể truy cập do đã đăng nhập')
          navigate('/auth/admin')
        } else if (userEncoded === 'customer' && (location.pathname === '/login' || location.pathname === '/register')) {
          alert('Bạn không thể truy cập do đã đăng nhập')
          navigate('/')
        }
      }, [userEncoded, location.pathname, navigate])

    if (!userEncoded && allowRole.includes('guest')) {
        return children 
    }
    if(allowRole.includes(userEncoded)){
        return <Outlet /> 
    } 
    return <Navigate to='/login' state={{ from: location}} replace /> 
    
}

export default PrivateRoute