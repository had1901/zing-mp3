import React from 'react'
import Skeleton from 'react-loading-skeleton'
import { motion, AnimatePresence } from "framer-motion"

function SkeletonListenNear() {
  return (
    <AnimatePresence>
      <motion.div className='flex items-center md:gap-x-6 xs:gap-x-2'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        exit={{ opacity: 0 }}
      >
         { 
          Array(5).fill(0).map((_, index) => (
              <motion.div key={index}
                initial={{ scale: 0}}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                  <Skeleton width={199} height={199}/>
                  <Skeleton width={199} height={16} count={2} className='mt-2'/>
              </motion.div>
          ))       
         }
      </motion.div>
    </AnimatePresence>
  )
}

export default SkeletonListenNear