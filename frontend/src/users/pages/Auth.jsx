import React from 'react'

import Card from '../../shared/components/UIElements/Card'
import Input from '../../shared/components/FormElements/Input'
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from '../../shared/utils/validators'

import { useForm } from '../../shared/hooks/Form-Hooks'
import Button from '../../shared/components/FormElements/Button'
import './Auth.css'

const Auth = () => {
  const [formState, inputHandler] = useForm(
    {
      email: {
        value: '',
        isValid: false,
      },
      password: { value: '', isValid: false },
    },
    false
  )

  const authSubmitHandler = (e) => {
    e.preventDefault()
    console.log(formState.inputs)
  }
  return (
    <Card className="authentication">
      <h2>Login Required</h2>
      <hr />
      <form onSubmit={authSubmitHandler}>
        <Input
          element="input"
          id="email"
          type="text"
          label="E-mail"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid Email."
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="password"
          type="password"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Password should be atleast 5 character long."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          LOGIN
        </Button>
      </form>
    </Card>
  )
}

export default Auth
