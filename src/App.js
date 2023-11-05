import React from 'react';
import { Routes, Route  } from 'react-router-dom'
import Home from './Pages/Home/Home';
import Login from './Pages/Login';
import ZingChart from './Pages/ZingChart/ZingChart';
import Radio from './Pages/Radio/Radio';
import Libraries from './Pages/Libraries/Libraries';
import NotFound from './Pages/NotFound';
import RankMusic from './Pages/RankMusic/RankMusic';
import TopRank from './Pages/TopRank/TopRank';
import GlobalPage from './Pages/GlobalPage';
import Topic from './Pages/Topic/Topic';


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<GlobalPage/>}>
          <Route path='/' element={<Home/>}/> 
          <Route path='/zing-chart' element={<ZingChart/>}/> 
          <Route path='/radio' element={<Radio/>}/> 
          <Route path='/libraries' element={<Libraries/>}/> 
          <Route path='/rank-music' element={<RankMusic/>}/> 
          <Route path='/topic' element={<Topic/>}/> 
          <Route path='/top-rank' element={<TopRank/>}/> 
        </Route>
        <Route path='/login' element={<Login/>}/>
        <Route path='/*' element={<NotFound/>}/>
      </Routes>
    </>
  );
}

export default App;
