import React, { useContext, useState } from 'react'
import Title from './Title'
import ItemMusic from './ItemMusic'
import { Context } from '../context/ContextGlobal'
import { useSelector } from 'react-redux'
import { BsSearch } from 'react-icons/bs'

function SearchBox({ dataFilter }) {
    const context = useContext(Context)
  const state = useSelector(state  => state.backgroundReducer)
//   console.log(dataFilter)

  const shuffleArray = (array) => {
    let shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }
  return (
    <div className={`${context.isFocus ? 'block' : 'hidden'} ${state.backgroundModel} absolute top-full left-0 w-full h-[500px] shadow-lg p-3 rounded-b-xl overflow-hidden overscroll-y-contain`}>
        <div>
            <Title title='Từ khóa liên quan' classNameMore='text-sm font-bold'/>
            <div className='mt-2'>
                {
                    dataFilter.map((item, index) => (
                        <div className='flex items-center gap-2 p-1'>
                            <BsSearch className={`${state.textColor}`} />
                            <h3 key={index} className='w-full hover:bg-searchRose text-sm line-clamp-1'>{item.name.song}</h3>
                        </div>
                       
                    ))
                }
            </div>
        </div>
        <div className='mt-3'>
            <Title title='Gợi ý kết quả' classNameMore='text-sm font-bold'/>
            <div className='h-[270px] overflow-y-auto overscroll-y-contain'>
                {
                    dataFilter.map((item, index) => (
                        <ItemMusic key={index} song={item} className='w-full rounded-md hover:bg-searchRose' classSinger='text-xs' classNameMore='w-12 h-12'/>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default SearchBox