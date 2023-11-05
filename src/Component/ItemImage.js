import React, { useEffect, useState } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import img from '../mp3/imgTop100/img-prev.jpg'
import { GoHeart, GoHeartFill } from 'react-icons/go'
import { PiPauseCircleLight, PiPlayCircleLight } from 'react-icons/pi'
import { IoIosMore } from 'react-icons/io'
import BtnRadius from './BtnRadius'
import { BsPatchCheck } from 'react-icons/bs'

function ItemImage({ children, icon, addElement, addImg, style, classNameParent, classNameChild, classNameMore, classWrapImg, dataThumb, description, isDesc, thumb, onClick }) {
  
  // useEffect(() => {
  //   function callback(entries, observer) {
  //     entries.forEach(entry => {
  //       const lazyImg = entry.target
  //       if(lazyImg.src && entry.isIntersecting) {    
  //         let data = lazyImg.getAttribute('data')   
  //         lazyImg.src = `./mp3/${data}`            
  //         lazyImg.classList.add('lazy-loading')  
  //         lazyImg.classList.remove('lazy-loading1')  
  //         observer.unobserve(lazyImg)
  //       } 
        
  //       else {
  //         lazyImg.classList.add('lazy-loading1')  
  //         lazyImg.src = ''

  //         lazyImg.classList.remove('lazy-loading')                                        
  //       }
  //     })
  //   }
  //   const observer = new IntersectionObserver(callback, {
  //     root: null, // Sử dụng viewport làm phần tử gốc
  //     rootMargin: '0px 0px 0px 0px', // Phần tử được xem là nằm trong tầm nhìn khi nó xuất hiện 50px trước khi ra khỏi tầm nhìn
  //     threshold: 0.5, // Phần tử được xem là nằm trong tầm nhìn khi ít nhất 50% của nó nằm trong tầm nhìn
  //     once: true
  //   });
    
  //   const elements = document.querySelectorAll('.lazy-load') // Lấy ra các phần tử có class
  //   elements.forEach(element => { // Lặp qua các element và gán cho đối tượng observe() để theo dõi 
  //     observer.observe(element)
  //   })

  //   return () => observer.disconnect();
  // }, [])
  
  return (
    <SkeletonTheme baseColor="#a6a6a6" highlightColor="#56595b">
      <div className={`text-white ${classNameParent}`}>
        {children ? children : 
          <div className={`w-full ${classWrapImg}`}>
              {
                <div className='cursor-pointer relative rounded-xl overflow-hidden group/parent' >
                  <img 
                    
                    src={thumb} 
                    alt='img' 
                    className={`w-full object-cover block rounded-xl group-hover/parent:scale-105 select-none ${classNameChild}`}   
                    onClick={onClick}
                  />                  
                  {icon}                                 
                  {addElement}            
                  { 
                    addImg &&
                    <div className='absolute left-0 right-0 top-0 bottom-0' style={{backgroundImage: 'linear-gradient(180deg,transparent,rgba(0,0,0,.5) 85%)',backgroundSize: '100% auto',}}>
                      {addImg}
                    </div> 
                  }            
                </div>     
                ||
                <Skeleton height={280} width={200}/>
              }     
            {
              isDesc
              &&
              <p className={`my-2 text-sm text-gray-400 font-medium ${classNameMore}`}>{description || <Skeleton />}</p>
            }
          </div>
        }
      </div>
    </SkeletonTheme>
  )
}

export default ItemImage