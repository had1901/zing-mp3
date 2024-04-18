import React from 'react'

function ContainerMain({ children }) {
  return (
    <div className='xl:ml-60 sm:ml-0 pl-3%3 pr-2%9 pb-28 pt-5rem overflow-scrollbar'>
        {children}
    </div>
  )
}

export default ContainerMain