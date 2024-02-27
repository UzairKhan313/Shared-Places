import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
import Card from '../../shared/components/UIElements/Card'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/utils/validators'
import { useForm } from '../../shared/hooks/Form-Hooks'
import './NewPlace.css'
import { useHttpClient } from '../../shared/hooks/Http-Hook'
import { useAuthContext } from '../../shared/context/Auth-Context'

const UpdatePlace = () => {
  const { error, isLoading, sendRequest, clearError } = useHttpClient()
  const [loadedPlace, setIsLoadedPlace] = useState()
  const { userId, token } = useAuthContext()
  const { placeId } = useParams()
  const navigate = useNavigate()

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: { value: '', isValid: false },
      description: { value: '', isValid: false },
    },
    false
  )
  const updatePlaceSubmitHandler = async (event) => {
    event.preventDefault()
    try {
      sendRequest(
        `http://localhost:5000/api/v1/places/${placeId}`,
        'PATCH',
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        }
      )
      navigate('/' + userId + '/places')
    } catch (error) {}
  }

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/v1/places/${placeId}`
        )
        setIsLoadedPlace(responseData.place)
        setFormData(
          {
            title: { value: loadedPlace.title, isValid: true },
            description: { value: loadedPlace.description, isValid: true },
          },
          true
        )
      } catch (error) {}
    }
    fetchPlace()
  }, [sendRequest, placeId, setFormData])

  if (!loadedPlace && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find the place.</h2>
        </Card>
      </div>
    )
  }
  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    )
  }
  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedPlace && (
        <form className="place-form" onSubmit={updatePlaceSubmitHandler}>
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            errorText="Plase provide a valid title"
            validators={[VALIDATOR_REQUIRE()]}
            initialValue={loadedPlace.title}
            initialValid={true}
            onInput={inputHandler}
          />
          <Input
            id="description"
            element="textarea"
            label="Description"
            errorText="Plase provide a valid description (atleast 5 charachter long)"
            validators={[VALIDATOR_MINLENGTH(5)]}
            initialValue={loadedPlace.description}
            initialValid={true}
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            Update Place
          </Button>
        </form>
      )}
    </>
  )
}

export default UpdatePlace
