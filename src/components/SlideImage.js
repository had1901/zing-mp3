import React from 'react'
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion"

function SlideImage({item}) {
  return (
    <motion.Link to={`./images/${item.link}`} className='cursor-pointer block pt-[56%] relative'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <img 
        src={`./images/${item.link}`} 
        alt={item.title} 
        className='object-contain rounded-lg w-full h-full absolute top-0 left-0'
      />
    </motion.Link>
  )
}

export default SlideImage