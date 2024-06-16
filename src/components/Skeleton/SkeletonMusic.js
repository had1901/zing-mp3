import React from 'react'
import Skeleton from 'react-loading-skeleton'
import { motion, AnimatePresence } from "framer-motion"

function SkeletonMusic({listMusic, time, classWrap}) {
  return (
      <motion.div className={classWrap}
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
      >
        {
          Array(listMusic).fill(0).map((_, index) => (
            <motion.div className='flex items-center px-2 py-2 ' key={index}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className='flex flex-1 gap-3'>
                <div>
                  <Skeleton width={48} height={48}/>
                </div>
               
                <div className='w-1/2'>
                  <Skeleton width={450}/>
                  <Skeleton width={320}/>
                </div>
                <div className='flex-1'>
                  <Skeleton width={60} />
                </div>
                {
                  time && 
                  (<div className='flex gap-2'>
                    <Skeleton circle width={18} height={18} />
                    <Skeleton circle width={18} height={18} />
                    <Skeleton circle width={18} height={18} />
                    <Skeleton circle width={18} height={18} />
                  </div>)
                }
              </div>
            </motion.div>
          ))
        }
      </motion.div>
  )
}

export default SkeletonMusic