import React, { useContext } from 'react'
import { Context } from '../ContextGlobal/ContextGlobal'

function ContainerMain({ children }) {
  const context = useContext(Context)

  return (
    <div className={`${context.isOpenSidebarRight ? 'pl-2%9 pr-[calc(2.9%_+_330px)]' : 'px-2%9'} xl:ml-60 sm:ml-0 pb-28 pt-5rem overflow-scrollbar transition-all duration-300`}>
        {children}
    </div>
  )
}

export default ContainerMain