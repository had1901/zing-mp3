import React from 'react'

function Label({ title, classNameParent, classNameChild }) {
  const colorYellow = 'bg-yellow-500'
  return (
    <span className={classNameParent}>
      <label className={`rounded-sm ${title !== '' ? colorYellow : ''} text-white px-1 text-ss uppercase ml-2 ${classNameChild}`}>
        {title}
      </label>
    </span>
  )
}

export default Label