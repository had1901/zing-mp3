import React from 'react'
import ContainerMain from '../Component/ContainerMain'
import { useParams } from 'react-router-dom'

function NotFound() {
  const { id } = useParams()
  return (
    <ContainerMain>
      <div className='text-white'>NotFound {id}</div>
    </ContainerMain>
   
  )
}

export default NotFound