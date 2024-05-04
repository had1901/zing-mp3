import React, { useContext } from 'react'
import { Context } from '../ContextGlobal/ContextGlobal'

function Modal({ classNameMore, children }) {
  const context = useContext(Context)
  return (
    <div className={`${classNameMore} ${context.isActive ? 'block' : 'hidden'}`}>{children}</div>
  )
}

export default Modal