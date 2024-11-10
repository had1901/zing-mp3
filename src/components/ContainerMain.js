import React from 'react'
import { useSelector } from 'react-redux'


function ContainerMain({ children }) {
  const stateSidebar = useSelector((state) => state.openSidebarRightReducer)

  return (
    <div className={`${stateSidebar.isOpen ? 'pl-2%9 pr-[calc(2.9%_+_330px)]' : 'pr-2%9 '} min-h-screen sm:pl-[calc(2.9%_+_70px)] xl:pl-2%9 xl:ml-60 pb-28 pt-5rem overflow-scrollbar transition-all duration-300`}>
        {children}
    </div>
  )
}

export default ContainerMain