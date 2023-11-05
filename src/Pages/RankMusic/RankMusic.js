import React from 'react'
import Container from '../../Component/Container'
import Title from '../../Component/Title'
import { FaPlayCircle } from 'react-icons/fa'
import ListMucsic from '../../Component/Zingchart/ListMucsic'

function RankMusic() {
  return (
    <Container classContainer='ml-60 px-14 h-full pb-28 overflow-scrollbar '>
      <div className='h-full'>
        <div className='pt-28'>
          <Container classContainer='flex item-center gap-x-2'>
            <Title title='BXH Nhạc Mới' classNameParent='text-3xl '/>
            <FaPlayCircle className='text-4xl text-white' />
          </Container>
          <Container classContainer='pt-4'>
            <ListMucsic />
          </Container>
        </div>
      </div>
    </Container>

  )
}

export default RankMusic