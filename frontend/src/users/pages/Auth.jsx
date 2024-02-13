import React, { useState } from 'react'

import Card from '../../shared/components/UIElements/Card'
import Input from '../../shared/components/FormElements/Input'
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/utils/validators'

import { useForm } from '../../shared/hooks/Form-Hooks'
import Button from '../../shared/components/FormElements/Button'
import './Auth.css'

const Auth = () => {
  const [isLoginMode, setLoginMode] = useState(true)
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false,
      },
      password: { value: '', isValid: false },
    },
    false
  )

  //Responsibal for changing sign up and login mode.
  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.name.isValid && formState.inputs.password.isValid
      )
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: false,
          },
        },
        false
      )
    }
    setLoginMode(!isLoginMode)
  }

  const authSubmitHandler = (e) => {
    e.preventDefault()
    console.log(formState.inputs)
  }
  return (
    <Card className="authentication">
      <h2>{isLoginMode ? 'Login' : 'Sign up'} Required</h2>
      <hr />
      <form onSubmit={authSubmitHandler}>
        {!isLoginMode && (
          <Input
            element="input"
            id="name"
            type="text"
            label="Your Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid name."
            onInput={inputHandler}
          />
        )}
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
          {isLoginMode ? 'LOGIN' : 'SIGN UP'}
        </Button>
      </form>
      <Button inverse onClick={switchModeHandler}>
        SWITCH TO{isLoginMode ? ' SIGN UP' : ' LOGIN'}
      </Button>
    </Card>
  )
}

export default Auth
