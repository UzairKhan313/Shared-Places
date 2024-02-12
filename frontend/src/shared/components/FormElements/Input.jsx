import React from 'react'

import './Input.css'
const Input = (props) => {
  const element =
    props.element === 'input' ? (
      <input type={props.type} id={props.id} placeholder={props.placeholder} />
    ) : (
      <textarea name="" id={props.id} rows={props.row || 3}></textarea>
    )
  return (
    <div className={`form-control`}>
      <label htmlFor={props.id}>{props.label}</label>
      {element}
    </div>
  )
}

export default Input
