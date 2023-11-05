import React, { useContext } from 'react'
import { Context } from '../ContextGlobal/ContextGlobal'

function InputSearch({ className }) {
  const bgSearch = useContext(Context)
  return (
    <input 
      ref={bgSearch.searchRef}
      datatype='search'
      type='text' 
      placeholder='Tìm kiếm bài hát, nghệ sĩ, lời bài hát...'
      className={`${className}`}
    />
     
    
  )
}

export default InputSearch