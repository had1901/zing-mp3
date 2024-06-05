import React, { forwardRef, useImperativeHandle } from 'react'

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
      onClick={onClick ? onClick : (e) => {
        e.preventDefault();
        console.log(123)
      }} 
      className={` flex transition-all items-center justify-center min-h-[36px] min-w-[36px] text-center text-white hover:bg-sidebarRose hover:text-white rounded-full cursor-pointer font-medium ${props}`}
    >
      {children}
    </div>
  )
}

export default forwardRef(BtnRadius)