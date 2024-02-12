import React, { useReducer } from 'react'

import { validate } from '../../utils/validators'
import './Input.css'

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.value,
        isValid: validate(action.value, action.validators),
      }
    case 'TOUCH': {
      return { ...state, isTouched: true }
    }

    default:
      return state
  }
}

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: '',
    isValid: false,
    isTouched: false,
  })

  const changeHandler = (event) => {
    dispatch({
      type: 'CHANGE',
      value: event.target.value,
      validators: props.validators,
    })
  }

  const touchHandler = () => {
    dispatch({ type: 'TOUCH' })
  }

  const element =
    props.element === 'input' ? (
      <input
        type={props.type}
        id={props.id}
        placeholder={props.placeholder}
        value={inputState.value}
        onBlur={touchHandler}
        onChange={changeHandler}
      />
    ) : (
      <textarea
        name=""
        id={props.id}
        rows={props.row || 3}
        value={inputState.value}
        onBlur={touchHandler}
        onChange={changeHandler}
      />
    )

  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && 'form-control--invalid'
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  )
}

export default Input
