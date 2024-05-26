import React, { useContext, useState } from 'react'
import classNames from 'classnames'
import { Link } from 'react-router-dom';
import { Context } from '../../ContextGlobal/ContextGlobal';
import { useSelector } from 'react-redux';


function SidebarItem({item, props, className, classNameMore, active, elementAfter, element, onClick, refElement}) {
  const state = useSelector(state => state.backgroundReducer)
  const  context = useContext(Context)
  const linkBtn = item.link
  const customClasses = classNames(`w-full z-30 flex items-center justify-between gap-2 select-none text-sm font-medium cursor-pointer ${context.colorTextHover} users`, className)
  const bg = `${state.activeTab} group/item z-30 relative w-full flex items-center justify-between text-sm select-none gap-2 ${context.sidebarItemActive} ${state.textActiveTabColor} font-medium cursor-pointer h-12 px-6`
  let controlActive = active ? bg : customClasses
  

  return (  
    <div ref={refElement} className={classNameMore}>
      <Link to={linkBtn} className={controlActive} onClick={onClick}>
        <div className='flex flex-1 gap-x-3'>
          {<item.icon className='text-xl'/> || <props.icon className='text-xl jus'/>}
          <span className='flex-1'>{item.title || props.title}</span>
        </div>
        <div className={active ? `${state.backgroundUpdateAccount} absolute w-1 h-full left-0 top-0` : 'hidden'}></div>
        {element}
      </Link>
      {elementAfter}
    </div> 
  )
}

export default SidebarItem