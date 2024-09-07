import React, { forwardRef, memo, useCallback, useImperativeHandle } from 'react'
import Tooltip  from '@mui/material/Tooltip'

const BtnRadius =  memo(function BtnRadius({children, classMore, title, placement, onClick}) {
  return (
    <Tooltip  title={title} placement={placement}>
      <div 
        onClick={
          onClick
          ? onclick
          : (e) => {
            e.stopPropagation()
          }
        
        } 
        className={` flex transition-all items-center justify-center min-h-[36px] min-w-[36px] text-center text-white hover:bg-sidebarRose hover:text-white rounded-full cursor-pointer font-medium ${classMore}`}
      >
        {children}
      </div>
    </Tooltip>
  )
})

export default BtnRadius