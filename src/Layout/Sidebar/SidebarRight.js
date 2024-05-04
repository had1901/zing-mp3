import React, { useContext } from 'react'
import { Context } from '../../ContextGlobal/ContextGlobal';
import { Musics } from '../../mp3/Music/Music';
import ItemMusic from '../../Component/ItemMusic';


function SidebarRight() {
  const context = useContext(Context)
  
  return (
    <div className={`${context.isOpenSidebarRight ? 'translate-x-[0]' : 'translate-x-[100%]'} fixed top-0 right-0 z-40 transition-all duration-500 w-[330px] h-[100%] pb-[90px] bg-transparent border-red-400 border-l-2 overflow-y-scroll`}>
      <section className='grid xl:grid-cols-1 mt-4 '>
          {
            Musics.map((item, index) => (
              <ItemMusic key={index} item={item} className='w-full rounded-lg hover:bg-searchRose py-[6px]' classWrap='flex justify-between' classSinger='text-[12px]' classNameMore='w-10 h-10' classTitle='font-medium'  />
            ))
          }
        </section>
    </div> 
  )
}

export default SidebarRight