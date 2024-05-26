import React from 'react'
import { useSelector } from 'react-redux'

function Modal({ classNameMore, children }) {
  const state = useSelector(state => state.openThemeModalReducer)
  return (
    <div className={`${classNameMore} ${state.isOpen ? 'block' : 'hidden'}`}>{children}</div>
  )
}

export default Modal