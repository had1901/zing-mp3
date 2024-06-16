import React from 'react'
import Skeleton from 'react-loading-skeleton'
import { motion, AnimatePresence } from "framer-motion"

function SkeletonImages() {
  return (
      <AnimatePresence>
        <motion.div 
          className='w-full flex items-center justify-between'
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          >
            {
              Array(5).fill(0).map((_, index) => (
                <motion.div key={index} 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}

                >
                    <Skeleton width={290} height={290} />
                    <Skeleton width={180} height={16} className='mt-2' />
                    <Skeleton width={100} height={16} className='mt-2'/>
                </motion.div>
              ))
            }
        </motion.div>
      </AnimatePresence>
  )
}

export default SkeletonImages