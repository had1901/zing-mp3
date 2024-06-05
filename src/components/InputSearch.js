import React, { useContext } from 'react'
import { Context } from '../context/ContextGlobal'

function InputSearch({ className }) {
  const context = useContext(Context)
  return (
    <input 
      ref={context.searchRef}
      datatype='search'
      type='text' 
      placeholder='Tìm kiếm bài hát, nghệ sĩ, lời bài hát...'
      className={`${className}`}
    />
     
    
  )
}

export default InputSearch