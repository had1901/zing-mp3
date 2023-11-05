import React from 'react'

function Title({title, classNameParent,  classNameMore}) {
  return (
    <div className={classNameParent}>
      <h3 className={`font-bold capitalize text-white ${classNameMore || ''} `}>{title}</h3>
    </div>
   
  )
}

export default Title