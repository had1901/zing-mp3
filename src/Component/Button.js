import React from 'react'
import classNames from 'classnames'

function Button({title, className, onClick }) {
  
  const customClasses = classNames('flex items-center justify-center cursor-pointer', className)
  return (
    <div onClick={onClick} className={customClasses}>{title}</div>
  )
}

export default Button