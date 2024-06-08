import React, { useCallback, useEffect, useState } from 'react'
import ListMusic from './../components/ListMusic'
import Container from './../components/Container'
import Title from './../components/Title';
import { FaPlayCircle } from 'react-icons/fa';
import { FaCirclePlay } from "react-icons/fa6";
import ItemMusic from './../components/ItemMusic';
import Button from './../components/Button';
import ContainerMain from './../components/ContainerMain';
import { fetching, fetchingMusic } from '../service';


function ZingChart() {
  const [showMusicVN, setShowMusicVN] = useState(5)
  const [showMusicUSUK, setShowMusicUSUK] = useState(5)
  const [showMusicKpop, setShowMusicKpop] = useState(5)
  const [data, setData] = useState([])
  const [path, setPath] = useState('mp3')

  const handleShowMusicVN = () => {
    setShowMusicVN(showMusicVN + 5)
  }
  const handleShowMusicUSUK = () => {
    setShowMusicUSUK(showMusicUSUK + 5)
  }
  const handleShowMusicKpop = () => {
    setShowMusicKpop(showMusicKpop + 5)
  }
  
  useEffect(() => {
    fetching(fetchingMusic, path, setData)
  },[path])

  return (
    <ContainerMain>
        <div className='text-white'>
            <div className='flex items-center gap-x-4 py-4'>
              <Title title='#zingchart' classNameParent='' classNameMore='text-40px uppercase zing-chart-text' />
              <FaCirclePlay className='text-40px' />
            </div>
            {/* <ChartComponent /> */}
            <ListMusic data={data} />
            <Title title='Bảng Xếp Hạng Tuần' classNameParent='mt-14 mb-4' classNameMore='text-40px zing-chart-text' />
            <div>
              <Container classContainer='grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 gap-7'>
                <div className='bg-searchRose rounded-xl p-3'>
                  <div className='flex item-center my-2'>
                    <Title classNameMore='text-2xl' title='Việt Nam' classNameParent='mx-3 ' />
                    <FaPlayCircle className='text-3xl text-violet '/>
                  </div>
                  <Container classContainer=''>
                    {
                      data.slice(0, showMusicVN).map((item, index) => (
                        <ItemMusic key={index} item={item} number={index} isIcon isNumberRank isTimeString classTitle='line-clamp-1' classWrap='flex item-center border-b-1 border-sidebarRose rounded-lg hover:bg-searchRose cursor-pointer' className='w-full justify-between cursor-pointer p-3 ' classSinger='text-xs font-normal' classIcon='flex flex-1 justify-end' classNameMore='w-10 h-10' />
                      ))
                    }
                    <div className='flex justify-center text-center mt-4'>
                      <Button title='Xem tất cả' className='w-28 px-3 py-2 border border-searchRose text-textZingchart text-sm rounded-full hover:bg-violet hover:text-white transition-all' onClick={handleShowMusicVN} />
                    </div>
                  </Container>
                </div>
                <div className=' bg-searchRose rounded-xl p-3'>
                  <div className='flex item-center my-2'>
                    <Title classNameMore='text-2xl' title='US-UK' classNameParent='mx-3 ' />
                    <FaPlayCircle className='text-3xl text-violet ' />
                  </div>
                  <Container classContainer=''>
                    {
                      data.slice(0, showMusicUSUK).map((item, index) => (
                        <ItemMusic key={index} item={item} number={index} isIcon isNumberRank isTimeString classTitle='line-clamp-1' classWrap='flex item-center border-b-1 border-sidebarRose rounded-lg hover:bg-searchRose cursor-pointer' className='w-full justify-between cursor-pointer p-3 ' classSinger='text-xs font-normal' classIcon='flex flex-1 justify-end' classNameMore='w-10 h-10' />
                      ))
                    }
                    <div className='flex justify-center text-center mt-4'>
                      <Button title='Xem tất cả' className='w-28 px-3 py-2 border border-searchRose text-textZingchart text-sm rounded-full hover:bg-violet hover:text-white transition-all' onClick={handleShowMusicUSUK} />
                    </div>
                  </Container>
                </div>
                <div className=' bg-searchRose rounded-xl p-3'>
                  <div className='flex item-center my-2'>
                    <Title classNameMore='text-2xl' title='K-pop' classNameParent='mx-3 ' />
                    <FaPlayCircle className='text-3xl text-violet ' />
                  </div>
                  <Container classContainer=''>
                    {
                      data.slice(0, showMusicKpop).map((item, index) => (
                        <ItemMusic key={index} item={item} number={index} isIcon isNumberRank isTimeString classTitle='line-clamp-1' classWrap='flex item-center border-b-1 border-sidebarRose rounded-lg hover:bg-searchRose cursor-pointer' className='w-full justify-between cursor-pointer p-3 ' classSinger='text-xs font-normal' classIcon='flex flex-1 justify-end' classNameMore='w-10 h-10' />
                      ))
                    }
                    <div className='flex justify-center text-center mt-4'>
                      <Button title='Xem tất cả' className='w-28 px-3 py-2 border border-searchRose text-textZingchart text-sm rounded-full hover:bg-violet hover:text-white transition-all' onClick={handleShowMusicKpop} />
                    </div>
                  </Container>
                </div>
              </Container>
            </div>
        </div>
    </ContainerMain>
  )
}

export default ZingChart