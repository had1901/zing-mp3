import React, { useEffect, useState } from 'react'
import ItemMusic from './ItemMusic'
import Description from './Description'
import Button from './Button'
import Skeleton from 'react-loading-skeleton'
import instance from '../service/config'
import { useDispatch } from 'react-redux'

function ListMusic({ className }) {
  const [itemShow, setItemShow] = useState(10)
  const [data, setData] = useState([])
  const dispatch = useDispatch()
  
  console.log('data-list', data)
  const showItem = () => {
    setItemShow(itemShow + 10)
  }

  useEffect(() => {
    const getListSong = async () => {
      try {
        const res = await instance.get('/music/list')
        setData(res.dt)
        console.log('res', res)
      } catch(e) {
        console.log(e)
      }
    }
    getListSong()
  }, [dispatch]) 

  return (
    <section className={className}>
      <div>
        <div className='w-full'>
          {
            data?.slice(0, itemShow).map((item, index) => (             
                <ItemMusic 
                  key={index} 
                  number={index} 
                  song={item || <Skeleton />}
                  isIcon 
                  isNumberRank 
                  isTimeString 
                  classWrap='flex item-center border-b-1 border-sidebarRose rounded-lg hover:bg-searchRose' 
                  className='w-full justify-between cursor-pointer p-3 ' 
                  classSinger='text-xs font-normal' classIcon='flex flex-1 justify-end' 
                  classNameMore='w-10 h-10'
                >
                <div className='flex flex-1 text-textZingchart'>
                  <Description desc={item.title || <Skeleton />} classNameMore='text-xs font-normal hover:text-violet hover:underline cursor-pointer'/>
                </div>
                </ItemMusic>              
            ))
          }
        </div>
      </div>
      {
        itemShow < data?.length && 
        <div className='text-center flex justify-center pt-5 '>
          <Button title='Xem top 100' onClick={showItem} className='w-28 px-3 py-2 border border-searchRose text-textZingchart text-sm rounded-full hover:bg-violet hover:text-white transition-all '/>
        </div>      
      }       
    </section>
  )
}

export default ListMusic