/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react'
import { Routes, Route, useNavigate  } from 'react-router-dom'
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
import { useDispatch } from 'react-redux'
import { actions } from './redux/actions'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import Admin from './pages/Admin';
import { handleLogout } from './service'
import { jwtDecode } from "jwt-decode"
import Register from './pages/auth/Register'
import { Spin } from "antd"
import { Context } from './context/ContextGlobal'
import { QueryClient, QueryClientProvider, useQueryClient } from '@tanstack/react-query'
import instance from './service/config'
import Dashboard from './pages/admin/Dashboard'
import Musics from './pages/admin/Musics'
import Members from './pages/admin/Members';
import Media from './pages/admin/Media';
import MediaDetail from './pages/admin/MediaDetail'
import Setting from './pages/admin/Setting';
import AdminLayout from './pages/admin/Layout';

function App() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { isLoading, setIsLoading } = useContext(Context)
    const queryClient = new QueryClient()

    useEffect(() => { 
        let mounted = true
        const start = async () => {
            try {
                const refreshToken = await instance.post('/auth/refreshToken', {})
                if(refreshToken.ec === 0) {
                    const user = JSON.parse(localStorage.getItem('user'))
                    if(user) {
                        const userEncoded = jwtDecode(user)
                        dispatch(actions.userLoginAction(userEncoded))                  
                    }
                    setIsLoading(false)
                }
            } catch(err) {
                if(err.data?.isToken === false) {
                    setIsLoading(false)
                    return false
                }
                if(err.data?.ec === 1) {
                    handleLogout(actions, navigate, dispatch)
                    setIsLoading(false)
                    return false
                }
            }
        }
        start()
        return () => { 
            mounted = false
        }
    },[dispatch, setIsLoading])

    return (
        isLoading 
        ? 
        <Spin fullscreen={true}/>
        :
        <QueryClientProvider client={queryClient}>
            <SkeletonTheme baseColor="#6464643d" highlightColor="#0000" duration={2.5}>
                <Routes>
                    <Route path='/' element={<GlobalPage/>}>
                        <Route path='/login' element={
                            <PrivateRoute allowRole={['guest']}>
                                <Login />
                            </PrivateRoute>
                        }/>
                        <Route path='/register' element={
                            <PrivateRoute allowRole={['guest']}>
                                <Register />
                            </PrivateRoute>
                        }/>
                        <Route element={<PrivateRoute allowRole={['customer']}/>}>
                            <Route path='/auth/libraries' element={<Libraries />}/>
                            <Route path='/auth/zing-chart' element={<ZingChart />}/>
                        </Route>

                        <Route index element={<Home/>}/> 
                        <Route path='/radio' element={<Radio/>}/>
                        <Route path='/rank-music' element={<RankMusic/>}/> 
                        <Route path='/topic' element={<Topic/>}/> 
                        <Route path='/top-rank' element={<TopRank/>}/> 
                        <Route path='/album' element={<Album/>}/> 
                        <Route path='/album/:categoryAlbum' element={<Album/>}/> 
                    </Route>
                    <Route element={<PrivateRoute allowRole={['admin']}/>}>
                        <Route path='/auth/admin' element={<AdminLayout />}>
                            <Route index element={<Dashboard />}/>
                            <Route path='upload' element={<UploadMusic />}/>
                            <Route path='music' element={<Musics />}/>
                            <Route path='members' element={<Members />}/>
                            {/* <Route path='/media' element={<Media />}/> */}
                            <Route path='media/:type' element={<MediaDetail />}/>
                            <Route path='setting' element={<Setting />}/>
                        </Route>
                    </Route>
                    <Route path='/*' element={<NotFound/>}/>
                </Routes>
            </SkeletonTheme>
        </QueryClientProvider>
    )
}

export default App;
