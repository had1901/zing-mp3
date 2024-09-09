import React, { useCallback, useContext, useEffect, useState } from 'react'
import _ from 'lodash'
import SearchBox from './SearchBox'
import { Context } from '../context/ContextGlobal'
import { IoIosClose } from "react-icons/io"
import { useSelector } from 'react-redux'


function InputSearch({ className }) {
  const context = useContext(Context)
  const [search, setSearch] = useState('')
  const [data, setData] = useState([])
  const [newData, setNewData] = useState([])
  const [title, setTitle] = useState('')
  const songsSuggest = useSelector(state => state.getListSongReducer.listSong)

  const handleChange = (e) => {
    const value = e.target.value
    setSearch(value)
  }
  
  const handleFocusInputSearch = () => {
    context.handleInputSearch(true)
  }  
  const handleBlurInputSearch = () => {
    context.handleInputSearch(false)
  }
  
  const handleGetTitleSong = (title) => {
    if(title)
      setTitle(title)
  }

  const debounceSearch = useCallback(
    _.debounce((value) => {
      if(value && value.length > 0) {
        const newDataFilter = _.filter(songsSuggest, (item) => {
          const songs = item.title.toLowerCase() 
          return _.includes(songs, value.toLowerCase()) 
        })
        setNewData(newDataFilter)
      } else {
        return setNewData([])
      }
  }, 300), [songsSuggest])

  const handleClear = () => {
    setSearch('')
    context.handleInputSearch(false)
  }

  useEffect(() => {
    debounceSearch(search)
    return () => debounceSearch.cancel()
  }, [search, debounceSearch])

  useEffect(() => {
    if(context.isFocus === false) {
      if(title) 
        setSearch(title)
      
    }
  }, [context.isFocus, title])

  return (
    <div className='relative'>
      <input 
        type='text' 
        value={search}
        placeholder='Tìm kiếm bài hát, nghệ sĩ, lời bài hát...'
        className={`${className}`}
        onChange={handleChange}
        onFocus={handleFocusInputSearch}
        // onBlur={handleBlurInputSearch}
      />
      <SearchBox dataFilter={newData} onGetSong={handleGetTitleSong}/>
      <IoIosClose className={`${search ? 'absolute' : 'hidden' }  top-1/2 right-[3%] w-6 h-6 hover:bg-sidebarRose rounded-full cursor-pointer text-xl text-[#71717a] -translate-y-1/2`} onClick={handleClear} />
    </div>
     
    
  )
}

export default InputSearch