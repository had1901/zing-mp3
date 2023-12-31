import React, { useState } from 'react'
import Container from '../../Component/Container'
import Title from '../../Component/Title'
import { Countries } from '../../images/imgTopic/countries/countries'
import ItemImage from './../../Component/ItemImage';
import { State } from './../../images/imgTopic/state/state';
import Button from '../../Component/Button';
import Content from '../../Component/Content';
import Skeleton from 'react-loading-skeleton';
import { Highlight } from './../../images/imgTopic/highlight/highlight';
import { Haha } from './../../mp3/Music/Music';


function Topic() {
  const [showItem, setShowItem] = useState(8)

  const showAll = () => {
    setShowItem(State.length)
  }
  return (
    <Container classContainer='ml-60 h-full px-14 pb-24 overflow-scrollbar'>
      <div className=''>
        <Container classContainer='pt-28'>
          <img src='/images/imgTopic/highlight/main-topic.jpg' alt='img-main' className='rounded'/>
        </Container>

        <Container classContainer='mt-14'>
          <Title title='Nổi Bật' classNameParent='py-3' classNameMore='text-2xl'/>
          <div className='relative flex -mx-3'>
            {
              Highlight.map((item, index) => (             
                  <ItemImage 
                    key={index} 
                    classNameParent='w-1/4 rounded-md px-3' 
                    classNameChild='transition-all' 
                    thumb={item.src}
                    addElement={<p className='absolute text-white font-semibold text-2xl whitespace-nowrap w-full text-center uppercase left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 z-10'>{item.title}</p>}                            
                  />                          
              ))
            }            
          </div>
        </Container>

        <Container classContainer='mt-12'>
          <Title title='Quốc Gia' classNameParent='py-3' classNameMore='text-2xl'/>
          <div className='relative flex -mx-3'>
            {
              Countries.map((item, index) => (               
                  <ItemImage 
                    key={index} 
                    classNameParent='w-1/4 rounded-md px-3' 
                    classNameChild='transition-all' 
                    thumb={item.src}
                    addElement={<p className='absolute text-white font-semibold text-2xl uppercase whitespace-nowrap w-full text-center left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 z-10'>{item.title}</p>}                            
                  />                    
              ))
            }            
          </div>
        </Container>

        <Container classContainer='mt-12'>
          <Title title='Tâm Trạng Và Hoạt Động' classNameParent='py-3' classNameMore='text-2xl'/>
          <div className='relative grid grid-cols-4 gap-y-6 -mx-3'>
            {
              State.slice(0, showItem).map((item, index) => (               
                  <ItemImage 
                    key={index}
                    classNameParent='rounded-md px-3' 
                    classNameChild='transition-all' 
                    thumb={item.src}
                    addElement={<p className='absolute text-white font-semibold text-xl uppercase left-3 right-3 top-2/4 -translate-y-1/3 z-10'>{item.title}</p>}
                    addImg={
                      <div key={index} className='absolute bottom-3 left-3 right-3 flex items-center gap-x-1'>                         
                          <img src={item.srcMini[0]} alt='img-mini' className='block object-cover rounded-md w-1/5' />
                          <img src={item.srcMini[1]} alt='img-mini' className='block object-cover rounded-md w-1/5' />
                          <img src={item.srcMini[2]} alt='img-mini' className='block object-cover rounded-md w-1/5' />                                  
                      </div>
                    }
                  />              
              ))
            }
          </div>
          {
            showItem < State.length &&
            <div className='mt-10 flex justify-center'>
              <Button title='Tất cả' className='w-28 px-3 py-2 border border-searchRose text-textZingchart text-sm rounded-full hover:bg-violet hover:text-white transition-all' onClick={showAll} />
            </div>  
          }   
        </Container>

        <Container classContainer='mt-20'>
          <Content>
                {
                  Haha.map((item, index) => (
                    <div key={index} className='w-full'>
                      <Title title='Trữ Tình & Bolero' classNameMore='text-xl my-5'/>
                      <div className='flex flex-wrap gap-y-14 -mx-3'>   
                          {
                            item.card.slice(0, 5).map((cardItem, index) => (                 
                              <Content key={index} description={cardItem.desc || <Skeleton />} thumb='' dataThumb={cardItem.thumb && cardItem.thumb} classNameChild='lazy-load' classNameParent='w-1/5 mt-0' classWrapImg='px-3' />
                            ))
                            
                          }
                      </div>
                    </div>
                  ))
                }
          </Content>  
        </Container>

        <Container classContainer='mt-12'>
          <Content>
                {
                  Haha.map((item, index) => (
                    <div key={index} className='w-full'>
                      <Title title='Hip Hop' classNameMore='text-xl my-5'/>
                      <div className='flex flex-wrap gap-y-14 -mx-3'>   
                          {
                            item.card.slice(0, 5).map((cardItem, index) => (                 
                              <Content key={index} description={cardItem.desc || <Skeleton />} thumb='' dataThumb={cardItem.thumb && cardItem.thumb} classNameChild='lazy-load' classNameParent='w-1/5 mt-0' classWrapImg='px-3' />
                            ))
                            
                          }
                      </div>
                    </div>
                  ))
                }
          </Content>  
        </Container>
      </div>
    </Container>
  )
}

export default Topic