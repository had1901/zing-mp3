import React, { useContext } from 'react'

function ToggleButton({ type, name, value, onClick }) {
  let Component = 'button'
  const props = {}
  if(type) {
    Component = 'input'
    props.type = type
  } 
  if(onClick && type) {
    props.type = type
    props.onClick = onClick
  }
  if(type && name) {
    props.name = name
    Component = 'input'
    props.className = 'out-line:none bg-black checked:bg-violet'
  }
  return (
    <div>
       <Component {...props}>{value}</Component>   
    </div>
  )
}

export default ToggleButton