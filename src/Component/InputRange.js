import React from 'react'
import forwardRef from './BtnRadius';

function InputRange({valueAudio, valueVolume, min, max, onClick, curTime }) {
  return (
    <div 
      id='' 
      className='progress w-full cursor-pointer bg-inp relative h-1-3' 
      type='range' 
      value={valueAudio || valueVolume} 
      min={min} 
      max={max}
      onClick={onClick}
    >
      <div 
        id='after-input' 
        className='absolute top-2/4 left-0 h-1-3 group-hover/parent:h-1-4 group-hover/parent:transition group-hover/parent:duration-1000 -translate-y-2/4 rounded-t-xl rounded-bl-xl rounded-r-md rounded-b-md bg-slate-50' 
        style={{width: `${curTime}%`}}
      >
        <span className='after-line absolute w-3 h-3 rounded-full top-2/4 left-[99%] bg-white '></span>
      </div>
    </div>
  )
}

export default InputRange