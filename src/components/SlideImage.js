import React from 'react'
import { Link } from 'react-router-dom';

function SlideImage({item}) {
  return (
    <Link to={`./images/${item.link}`} className='cursor-pointer block pt-[56%] relative'>
      <img 
        src={`./images/${item.link}`} 
        alt={item.title} 
        className='object-contain rounded-lg w-full h-full absolute top-0 left-0'
      />
    </Link>
  )
}

export default SlideImage