import React from 'react'

function Container({ classContainer, children }) {
  return (
    <div className={classContainer}>{children}</div>
  )
}

export default Container