import React, { useContext } from 'react'
import { Context } from '../ContextGlobal/ContextGlobal'

function Modal({ classNameMore, children }) {
  const modal = useContext(Context)
  return (
    <div className={`${classNameMore} ${modal.isActive ? 'block' : 'hidden'}`}>{children}</div>
  )
}

export default Modal