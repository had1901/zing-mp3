import React from 'react'
import { Musics } from './../../mp3/Music/Music';
import ItemImage from './../../Component/ItemImage';

function Radio() {
  return (
    <div className='flex items-center justify-center w-full text-white'>
      {
        Musics.map((music, index) => (
          <ItemImage keyword={index} classNameParent='flex-shrink-0 '>
            <div className='relative'>
              <img src={`../../mp3/${music.thumb}`} alt={music.name} className='w-200 h-200 rounded-full object-cover border-4 border-red-600'/>
              <img src={`../../mp3/${music.thumb}`} alt={music.name} className='absolute bottom-0 right-0 w-16 h-16 rounded-full border-black object-cover border-2' />
              <span className='absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-6 text-center rounded-md text-white bg-red-500 capitalize '>Live</span>
            </div>
            <h2 className='mt-4 text-center font-semibold'>{music.singer}</h2>
            <p className='text-center text-xs text-gray-400 font-medium'>
              {music.listening}
              <span className='ml-1 '>đang nghe</span>
            </p>
          </ItemImage>
        ))
      }
    </div>
  )
}

export default Radio