import React, { useEffect, useState } from 'react'
import { GoHeart, GoHeartFill } from 'react-icons/go'
import { PiPlayCircleLight } from 'react-icons/pi'
import { IoIosMore } from 'react-icons/io'
import BtnRadius from './BtnRadius'

import Skeleton, {SkeletonTheme} from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useSelector } from 'react-redux'

function Content({ onClick, ...props }) {
  const [isLove, setIsLove] = useState(false)
  const state = useSelector(state => state.backgroundReducer)

  useEffect(() => {
    function callback(entries, observer) {
      entries.forEach(entry => {
        const lazyImg = entry.target
        if(lazyImg.src && entry.isIntersecting) {    
          let data = lazyImg.getAttribute('data')   
          lazyImg.src = `./mp3/${data}`            
          lazyImg.classList.add('lazy-loading')  
          lazyImg.classList.remove('lazy-loading1')  
          observer.unobserve(lazyImg)
        } 
        
        else {
          lazyImg.classList.add('lazy-loading1')  
          lazyImg.src = ''
          lazyImg.classList.remove('lazy-loading')                                        
        }
      })
    }
    const observer = new IntersectionObserver(callback, {
      root: null, // Sử dụng viewport làm phần tử gốc
      rootMargin: '0px 0px 0px 0px', // Phần tử được xem là nằm trong tầm nhìn khi nó xuất hiện 50px trước khi ra khỏi tầm nhìn
      threshold: 0.5, // Phần tử được xem là nằm trong tầm nhìn khi ít nhất 50% của nó nằm trong tầm nhìn
      once: true
    });
    
    const elements = document.querySelectorAll('.lazy-load') // Lấy ra các phần tử có class
    elements.forEach(element => { // Lặp qua các element và gán cho đối tượng observe() để theo dõi 
      observer.observe(element)
    })

    return () => observer.disconnect();
  }, [])
  const handleBtnLove = () => {
    setIsLove(!isLove)
  }
  return (
    <SkeletonTheme baseColor="#a6a6a6" highlightColor="#56595b">
      <div className={`${state.textColor} ${props.classNameParent}`}>
        {props.children ? props.children : 
          <div className={`w-full ${props.classWrapImg}`}>
              {
                <div className={`${props.classOurImg} cursor-pointer relative rounded-xl overflow-hidden group/parent`}>
                  <img 
                    data={props.dataThumb}
                    src={`./mp3${props.thumb }`} 
                    alt='img' 
                    className={`w-full object-cover block rounded-xl group-hover/parent:scale-110 delay-75 select-none ${props.classNameChild}`}   
                    onClick={onClick}
                  /> 
                  <div className='hidden items-center text-xl absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 justify-center gap-4 group-hover/parent:flex'>
                    <BtnRadius props='p-3 hover:bg-bgOpacity' onClick={handleBtnLove}>
                      {
                        isLove ? (<GoHeartFill />) : (<GoHeart />)
                      }
                    </BtnRadius>
                    <PiPlayCircleLight className='text-6xl' />
                    <BtnRadius props='p-2 hover:bg-bgOpacity'>
                      <IoIosMore className='text-2xl' />
                    </BtnRadius>
                  </div>   
                </div>     
                
                
              }     
            {/* {
                isLoading
              ?
              : 
            } */}
            <p className={`my-2 text-sm text-gray-400 font-medium ${props.classNameMore}`}>{props.description || <Skeleton />}</p>
          </div>
        }
      </div>
    </SkeletonTheme>
  )
}

export default Content