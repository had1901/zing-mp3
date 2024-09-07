import React, { useContext, useState } from 'react'
import Title from './Title'
import ItemMusic from './ItemMusic'
import { Context } from '../context/ContextGlobal'
import { useSelector } from 'react-redux'
import { BsSearch } from 'react-icons/bs'

function SearchBox({ dataFilter, onGetSong }) {
    const context = useContext(Context)
  const state = useSelector(state  => state.backgroundReducer)

  const shuffleArray = (array) => {
    let shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }

  const getTitleSong = (item) => {
    onGetSong(item.title)
  }

  return (
    <div 
        className={`${context.isFocus ? 'block' : 'hidden'} ${state.backgroundModel} absolute top-full left-0 w-full h-[500px] shadow-lg p-3 rounded-b-xl overflow-hidden overscroll-y-contain`} 
        onMouseDown={() => context.handleInputSearch(false)}
    >
        <div>
            <Title title='Từ khóa liên quan' classNameMore='text-sm font-bold'/>
            <div className='mt-2'>
                {
                    dataFilter.map((item, index) => (
                        <div key={item.id} className='flex items-center gap-2 p-1'>
                            <BsSearch className={`${state.textColor}`} />
                            <h3  className='w-full hover:bg-searchRose text-sm line-clamp-1'>{item.title}</h3>
                        </div>
                       
                    ))
                }
            </div>
        </div>
        <div className='mt-3'>
            <Title title='Gợi ý kết quả' classNameMore='text-sm font-bold'/>
            <div className='h-[270px] overflow-y-auto overscroll-y-contain'>
                {
                    dataFilter.length > 0 && dataFilter.map((item, index) => (
                        <ItemMusic 
                            key={index} 
                            song={item} 
                            noBtnPlay 
                            className='w-full rounded-md hover:bg-searchRose' 
                            classSinger='text-xs' 
                            classNameMore='w-12 h-12' 
                            onClick={() => {
                                context.handleInputSearch(false)
                                getTitleSong(item)
                            }}/>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default SearchBox