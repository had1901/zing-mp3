/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Routes, Route, useLocation, useNavigate  } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
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



function App() {
    const navigate = useNavigate()
    
    useEffect(() => {
        navigate('/')
    },[])

    return (
    <SkeletonTheme baseColor="#6464643d" highlightColor="#0000" duration={2.5}>
        <Routes>
            <Route path='/' element={<GlobalPage/>}>
                <Route path='/' element={<Home/>}/> 
                <Route path='/zing-chart' element={<ZingChart/>}/> 
                <Route path='/radio' element={<Radio/>}/> 
                <Route path='/libraries' element={<Libraries/>}/> 
                <Route path='/rank-music' element={<RankMusic/>}/> 
                <Route path='/topic' element={<Topic/>}/> 
                <Route path='/top-rank' element={<TopRank/>}/> 
                <Route path='/album' element={<Album/>}/> 
                <Route path='/album/:categoryAlbum' element={<Album/>}/> 
                <Route path='/upload' element={<UploadMusic />}/>
            </Route>
            <Route path='/login' element={<Login/>}/>
            <Route path='/*' element={<NotFound/>}/>
        </Routes>
    </SkeletonTheme>

    )
}

export default App;
