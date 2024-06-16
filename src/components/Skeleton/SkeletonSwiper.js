import React from 'react'
import Skeleton from 'react-loading-skeleton'
import { motion, AnimatePresence } from "framer-motion"

function SkeletonSwiper({ listImages }) {
 

  return (
      <AnimatePresence>
        <motion.div className='w-f h-full'
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0 }}
        >
          <Skeleton className='w-full h-full block pt-[56%] relative'  />
        </motion.div> 
      </AnimatePresence>
  )
}

export default SkeletonSwiper