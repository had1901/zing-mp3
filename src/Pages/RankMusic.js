import React from 'react'
import Container from './../components/Container'
import Title from './../components/Title'
import { FaPlayCircle } from 'react-icons/fa'
import ListMusic from './../components/ListMusic'
import ContainerMain from './../components/ContainerMain'

function RankMusic() {
  return (
    <ContainerMain>
          <Container classContainer='flex item-center gap-x-4'>
            <Title title='BXH Nhạc Mới' classNameParent='text-3xl' classNameMore='zing-chart-text'/>
            <FaPlayCircle className='text-4xl text-white' />
          </Container>
          <Container classContainer='mt-7'>
            <ListMusic />
          </Container>
    </ContainerMain>

  )
}

export default RankMusic