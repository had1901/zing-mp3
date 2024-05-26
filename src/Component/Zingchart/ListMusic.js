import React, { useState } from 'react'
import ItemMusic from '../ItemMusic'
import Description from '../Description'
import { Musics } from '../../mp3/Music/Music'
import Button from '../Button'
import { useCallback } from 'react'
import { useEffect } from 'react'

function ListMusic({ data, className }) {
  console.log('ListMusic', data)
  const [itemShow, setItemShow] = useState(10)
  const [data1, setData1] = useState([])
  const [pathApi, setPathApi] = useState('mp3')

  const showItem = () => {
    setItemShow(itemShow + 10)
  }

  const fetching = useCallback(async () => {
    try {
      const api = `http://localhost:3333/${pathApi}`
      const res = await fetch(api)
      if(!res.ok) {
        throw new Error(`Fetching '${api}' failed`)
      }
      const result = await res.json()
      setData1(result)
    } catch (err) { 
      console(err) 
    }
  },[pathApi])

  useEffect(() => {
    fetching()
  },[fetching])

  return (
    <section className={className}>
      <div>
        <div className='w-full'>
          {
            data1?.slice(0, itemShow).map((item, index) => (             
                <ItemMusic 
                  key={index} 
                  number={index} 
                  item={item}
                  isIcon 
                  isNumberRank 
                  isTimeString 
                  classWrap='flex item-center border-b-1 border-sidebarRose rounded-lg hover:bg-searchRose' 
                  className='w-full justify-between cursor-pointer p-3 ' 
                  classSinger='text-xs font-normal' classIcon='flex flex-1 justify-end' 
                  classNameMore='w-10 h-10'
                >
                <div className='flex flex-1 text-textZingchart'>
                  <Description desc={item.name.song} classNameMore='text-xs font-normal hover:text-violet hover:underline cursor-pointer'/>
                </div>
                </ItemMusic>              
            ))
          }
        </div>
      </div>
      {
        itemShow < data1.length && 
        <div className='text-center flex justify-center pt-5 '>
          <Button title='Xem top 100' onClick={showItem} className='w-28 px-3 py-2 border border-searchRose text-textZingchart text-sm rounded-full hover:bg-violet hover:text-white transition-all '/>
        </div>      
      }       
    </section>
  )
}

export default ListMusic