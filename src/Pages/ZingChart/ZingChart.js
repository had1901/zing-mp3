import React, { useState } from 'react'
import ChartComponent from '../../Component/Zingchart/ChartComponent'
import ListMucsic from '../../Component/Zingchart/ListMucsic'
import Container from '../../Component/Container'
import Title from './../../Component/Title';
import { FaPlayCircle } from 'react-icons/fa';
import { Musics } from '../../mp3/Music/Music';
import ItemMusic from '../../Component/ItemMusic';
import Button from '../../Component/Button';




function ZingChart() {
  const [showMusicVN, setShowMusicVN] = useState(5)
  const [showMusicUSUK, setShowMusicUSUK] = useState(5)
  const [showMusicKpop, setShowMusicKpop] = useState(5)

  const handleShowMusicVN = () => {
    setShowMusicVN(showMusicVN + 5)
  }
  const handleShowMusicUSUK = () => {
    setShowMusicUSUK(showMusicUSUK + 5)
  }
  const handleShowMusicKpop = () => {
    setShowMusicKpop(showMusicKpop + 5)
  }

  return (
    <div className='ml-60 px-14 h-full pb-28 overflow-scrollbar'>
      <div className='flex text-white'>
        <div className='w-full h-full'>
          {/* <ChartComponent /> */}
          <ListMucsic className='w-full h-full pt-28 ' />
          <Title title='Bảng Xếp Hạng Tuần' classNameParent='mt-14 mb-4' classNameMore='text-40px' />
          <div>
            <Container classContainer='flex item-center justify-between'>
              <div className='w-32 bg-searchRose rounded-xl p-3'>
                <div className='flex item-center my-2'>
                  <Title classNameMore='text-2xl' title='Việt Nam' classNameParent='mx-3 ' />
                  <FaPlayCircle className='text-3xl text-violet '/>
                </div>
                <Container classContainer=''>
                  {
                    Musics.slice(0, showMusicVN).map((item, index) => (
                      <ItemMusic key={index} item={item} number={index} isIcon isNumberRank isTimeString classTitle='line-clamp-1' classWrap='flex item-center border-b-1 border-sidebarRose rounded-lg hover:bg-searchRose cursor-pointer' className='w-full justify-between cursor-pointer p-3 ' classSinger='text-xs font-normal' classIcon='flex flex-1 justify-end' classNameMore='w-10 h-10' />
                    ))
                  }
                  <div className='flex justify-center text-center mt-4'>
                    <Button title='Xem tất cả' className='w-28 px-3 py-2 border border-searchRose text-textZingchart text-sm rounded-full hover:bg-violet hover:text-white transition-all' onClick={handleShowMusicVN} />
                  </div>
                </Container>
              </div>
              <div className='w-32 bg-searchRose rounded-xl p-3'>
                <div className='flex item-center my-2'>
                  <Title classNameMore='text-2xl' title='US-UK' classNameParent='mx-3 ' />
                  <FaPlayCircle className='text-3xl text-violet ' />
                </div>
                <Container classContainer=''>
                  {
                    Musics.slice(0, showMusicUSUK).map((item, index) => (
                      <ItemMusic key={index} item={item} number={index} isIcon isNumberRank isTimeString classTitle='line-clamp-1' classWrap='flex item-center border-b-1 border-sidebarRose rounded-lg hover:bg-searchRose cursor-pointer' className='w-full justify-between cursor-pointer p-3 ' classSinger='text-xs font-normal' classIcon='flex flex-1 justify-end' classNameMore='w-10 h-10' />
                    ))
                  }
                  <div className='flex justify-center text-center mt-4'>
                    <Button title='Xem tất cả' className='w-28 px-3 py-2 border border-searchRose text-textZingchart text-sm rounded-full hover:bg-violet hover:text-white transition-all' onClick={handleShowMusicUSUK} />
                  </div>
                </Container>
              </div>
              <div className='w-32 bg-searchRose rounded-xl p-3'>
                <div className='flex item-center my-2'>
                  <Title classNameMore='text-2xl' title='K-pop' classNameParent='mx-3 ' />
                  <FaPlayCircle className='text-3xl text-violet ' />
                </div>
                <Container classContainer=''>
                  {
                    Musics.slice(0, showMusicKpop).map((item, index) => (
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
      </div>
    </div>
  )
}

export default ZingChart