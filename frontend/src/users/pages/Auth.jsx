import React, { useState } from 'react'

import Card from '../../shared/components/UIElements/Card'
import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import ImageUpload from '../../shared/components/FormElements/ImageUpload'
import { useForm } from '../../shared/hooks/Form-Hooks'
import { useAuthContext } from '../../shared/context/Auth-Context'
import { useHttpClient } from '../../shared/hooks/Http-Hook'
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/utils/validators'

import './Auth.css'

const Auth = () => {
  const [isLoginMode, setLoginMode] = useState(true)
  const { error, isLoading, sendRequest, clearError } = useHttpClient()

  const { login } = useAuthContext()
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
          image: undefined,
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
          image: { value: null, isValid: false },
        },
        false
      )
    }
    setLoginMode(!isLoginMode)
  }

  const authSubmitHandler = async (e) => {
    e.preventDefault()

    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          'http://localhost:5000/api/v1/users/login',
          'POST',
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            'Content-Type': 'application/json',
          }
        )

        login(responseData.userId, responseData.token) // Auth Context login
      } catch (err) {}
    } else {
      try {
        const formData = new FormData()

        formData.append('name', formState.inputs.name.value)
        formData.append('email', formState.inputs.email.value)
        formData.append('password', formState.inputs.password.value)
        formData.append('image', formState.inputs.image.value)

        const responseData = await sendRequest(
          'http://localhost:5000/api/v1/users/signup',
          'POST',
          formData // The fetch api automatically add right header for the form data.
        )
        login(responseData.userId, responseData.token) // Auth Context login
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>{isLoginMode ? 'Login' : 'Sign up'} Required</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <ImageUpload
              center
              id="image"
              onInput={inputHandler}
              errorText="Please Provide an image"
            />
          )}
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
            validators={[VALIDATOR_MINLENGTH(6)]}
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
    </>
  )
}

export default Auth
