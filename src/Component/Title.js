import React from 'react'
import { useSelector } from 'react-redux'

function Title({title, classNameParent,  classNameMore}) {
  const state = useSelector(state => state.backgroundReducer)
  return (
    <div className={classNameParent}>
      <h3 className={`${classNameMore || ''} md:font-bold xs:font-medium ${state.textColor}`}>{title}</h3>
    </div>
   
  )
}

export default Title