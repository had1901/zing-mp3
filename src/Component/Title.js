import React from 'react'

function Title({title, classNameParent,  classNameMore}) {
  return (
    <div className={classNameParent}>
      <h3 className={`${classNameMore || ''} md:font-bold xs:font-medium text-white `}>{title}</h3>
    </div>
   
  )
}

export default Title