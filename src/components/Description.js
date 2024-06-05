import React from 'react'

function Description({ desc, classNameMore }) {
  return (
    <p className={classNameMore}>{desc}</p>
  )
}

export default Description