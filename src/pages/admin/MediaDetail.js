import React from 'react'
import { useParams } from 'react-router-dom'

function MediaDetail() {
    const { type } = useParams()
    console.log(type)
  return (
    <div>MediaDetail</div>
  )
}

export default MediaDetail