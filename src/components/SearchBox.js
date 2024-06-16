import React, { useContext, useState } from 'react'
import Title from './Title'
import ItemMusic from './ItemMusic'
import { Context } from '../context/ContextGlobal'
import { useSelector } from 'react-redux'

function SearchBox({ dataFilter }) {
    const context = useContext(Context)
  const state = useSelector(state  => state.backgroundReducer)

  return (
    <div className={`${context.isFocus ? 'block' : 'hidden'} ${state.backgroundModel} absolute top-full left-0 w-full h-[500px] shadow-lg p-3 rounded-b-xl overflow-y-auto`}>
        <div>
            <Title title='Từ khóa liên quan'/>
            <h3>em gai</h3>
        </div>
        <div>
            <Title title='Gợi ý kết quả' />
            {
                dataFilter.map((item, index) => (
                    <ItemMusic item={item} className='w-full rounded-md hover:bg-searchRose' classSinger='text-xs' classNameMore='w-12 h-12'/>
                ))
            }
        </div>
    </div>
  )
}

export default SearchBox