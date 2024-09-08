import React, { useEffect, useState } from 'react'
import Container from './../components/Container'
import Title from './../components/Title'
import { FaPlayCircle } from 'react-icons/fa'
import ListMusic from './../components/ListMusic'
import ContainerMain from './../components/ContainerMain'
import SkeletonMusic from '../components/Skeleton/SkeletonMusic'

function RankMusic() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 800);
  }, [])

  return (
    <ContainerMain>
          <Container classContainer='flex item-center gap-x-4'>
            <Title title='BXH Nhạc Mới' classNameParent='text-3xl' classNameMore='zing-chart-text'/>
            <FaPlayCircle className='text-4xl text-white' />
          </Container>
          <Container classContainer='mt-7'>
          {
            isLoading
            ? (<SkeletonMusic listMusic={10} time classWrap={`mt-5 pl-4 transition-opacity duration-500 ${isLoading ? 'visible' : 'hidden'}`}/>)
            : (<ListMusic className={`transition-opacity duration-500 ${isLoading ? 'invisible' : 'visible'}`}/>)
          }
            
          </Container>
    </ContainerMain>

  )
}

export default RankMusic