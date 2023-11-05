import React from 'react'
import { Link } from 'react-router-dom';

function SlideImage({item}) {
  return (
    <Link to={`./images/${item.link}`} className='cursor-pointer'>
      <img 
        src={`./images/${item.link}`} 
        alt={item.title} 
        className='object-cover rounded-lg w-full h-full'
      />
    </Link>
  )
}

export default SlideImage