/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'
import { Routes, Route, useLocation, useNavigate  } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/auth/Login'
import ZingChart from './pages/ZingChart'
import Radio from './pages/Radio'
import Libraries from './pages/Libraries'
import NotFound from './pages/NotFound'
import RankMusic from './pages/RankMusic'
import TopRank from './pages/TopRank'
import GlobalPage from './pages/GlobalPage'
import Topic from './pages/Topic'
import Album from './pages/Album'
import UploadMusic from './pages/UploadMusic'
import { SkeletonTheme } from 'react-loading-skeleton'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from './redux/actions'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import Admin from './pages/Admin';
import { handleLogout } from './service'
import { jwtDecode } from "jwt-decode"
import Register from './pages/auth/Register'
import { Spin } from "antd"
import { Context } from './context/ContextGlobal'
import { QueryClient, QueryClientProvider, useQueryClient } from '@tanstack/react-query'

// const usePreviousRoute = () => {
//     const location = useLocation()
//     const [path, setPath] = useState([])
    
//     useEffect(() => {
//         setPath(prevPath => [...prevPath, location.pathname])
//     }, [location])
//     return path
// }

function App() {
    // const location = usePreviousRoute()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { isLoading, setIsLoading } = useContext(Context)
    const queryClient = new QueryClient()

    useEffect(() => { 
        const start = async () => {
            try {
                const refreshToken = await fetch('/auth/refreshToken', {
                    method: 'POST',
                })
                if(refreshToken.status === 403 || !refreshToken.ok) {
                    handleLogout(actions, navigate, dispatch)
                    setIsLoading(false)
                    return
                } else {
                    const res = await fetch('/auth/home', { method: 'POST' })
                    const data = await res.json()

                    if(data.isValid === false || data.isToken === false) {
                        handleLogout(actions, navigate, dispatch)
                        setIsLoading(false)
                        return
                    } else {
                        const user = JSON.parse(localStorage.getItem('user'))
                        if(user) {
                            const userEncoded = jwtDecode(user)
                            dispatch(actions.userLoginAction(userEncoded))
                        }
                        setIsLoading(false)
                    }
                }

                
                
            } catch(e) {
                console.log('refresh-token-error: ', e)
                setIsLoading(false)

            }
        }
        start()
    },[navigate, dispatch, setIsLoading])

    return (
        
            isLoading 
            ? <Spin fullscreen={true}/>
            :
      <QueryClientProvider client={queryClient}>
        <SkeletonTheme baseColor="#6464643d" highlightColor="#0000" duration={2.5}>
            <Routes>
                <Route path='/' element={<GlobalPage/>}>

                    <Route element={<PrivateRoute allowRole={['customer','admin']}/>}>
                        <Route path='/auth/libraries' element={<Libraries />}/>
                    </Route>
                    
                    <Route element={<PrivateRoute allowRole={['admin']}/>}>
                        <Route path='/auth/admin' element={<Admin />}/>
                        <Route path='/upload' element={<UploadMusic />}/>
                    </Route>

                    <Route element={<PrivateRoute allowRole={['customer']}/>}>
                        <Route path='/auth/zing-chart' element={<ZingChart />}/>
                    </Route>

                    <Route index element={<Home/>}/> 
                    <Route path='/radio' element={<Radio/>}/>
                    <Route path='/rank-music' element={<RankMusic/>}/> 
                    <Route path='/topic' element={<Topic/>}/> 
                    <Route path='/top-rank' element={<TopRank/>}/> 
                    <Route path='/album' element={<Album/>}/> 
                    <Route path='/album/:categoryAlbum' element={<Album/>}/> 
                    <Route path='/login' element={<Login />}/>
                    <Route path='/register' element={<Register />}/>

                </Route>
                <Route path='/*' element={<NotFound/>}/>
            </Routes>
        </SkeletonTheme>
      </QueryClientProvider>

    )
}

export default App;
