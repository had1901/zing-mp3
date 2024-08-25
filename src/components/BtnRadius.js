import React, { forwardRef, memo, useCallback, useImperativeHandle } from 'react'

const BtnRadius =  memo(function BtnRadius({children, classMore, onClick}) {
  return (
    <div 
      onClick={useCallback(onClick,[onClick]) ? onClick: (e) => {
        e.preventDefault();
        console.log(123)
      }} 
      className={` flex transition-all items-center justify-center min-h-[36px] min-w-[36px] text-center text-white hover:bg-sidebarRose hover:text-white rounded-full cursor-pointer font-medium ${classMore}`}
    >
      {children}
    </div>
  )
})

export default BtnRadius