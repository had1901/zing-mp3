import React from 'react'
import { Musics } from './../../mp3/Music/Music';

function Radio() {
  return (
    <div className='flex flex-col items-center justify-center w-full text-white'>
      {
        Musics.map((music, index) => (
          <div key={index} className='text-center'>
            <div key={index}>{music.name}</div>
            <div>{music.singer}</div><br/>
          </div>
        ))
      }
    </div>
  )
}

export default Radio