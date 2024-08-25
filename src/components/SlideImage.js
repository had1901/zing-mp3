import React from 'react'
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion"

function SlideImage({ image }) {
  const MotionLink = motion(Link)
  return (
    <MotionLink to={image?.url} className='cursor-pointer block pt-[56%] relative'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <img 
        src={image?.url} 
        alt={image?.name} 
        className='object-contain rounded-lg w-full h-full absolute top-0 left-0'
      />
    </MotionLink>
  )
}

export default SlideImage