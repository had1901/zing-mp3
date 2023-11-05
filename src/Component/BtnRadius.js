import React, { forwardRef, useContext, useEffect, useImperativeHandle, useRef } from 'react'

function BtnRadius({children, props, onClick, datatype}, ref) {
  useImperativeHandle(ref, () => ({
      getAttribute() {
      return  datatype
      }
  }))
  return (
    <div 
      ref={ref}
      datatype={datatype} 
      onClick={onClick} 
      className={` flex transition-all items-center justify-center min-h-32 min-w-32 text-center text-white hover:bg-sidebarRose hover:text-white rounded-full cursor-pointer font-medium ${props}`}
    >
      {children}
    </div>
  )
}

export default forwardRef(BtnRadius)