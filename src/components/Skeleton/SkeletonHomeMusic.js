import React from 'react'
import Skeleton from 'react-loading-skeleton'
import { motion, AnimatePresence } from "framer-motion"


function SkeletonHomeMusic({ listData }) {
  return (
    <AnimatePresence>
        {
            Array(listData).fill(0).map((_, index) => (
                <motion.div className='flex gap-3' key={index}
                    // initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    exit={{ display: 'none' }}
                >
                    <Skeleton width={64} height={64}/>
                    <div>
                        <Skeleton width={200} height={10} />
                        <Skeleton width={120} height={10} />
                        <Skeleton width={60} height={10} />
                    </div>
                   
                </motion.div>
            ))
        }
    </AnimatePresence>
  )
}

export default SkeletonHomeMusic