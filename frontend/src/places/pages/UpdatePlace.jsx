import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
import Card from '../../shared/components/UIElements/Card'
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/utils/validators'
import { useForm } from '../../shared/hooks/Form-Hooks'
import './NewPlace.css'

const DUMMYPLACES = [
  {
    id: 'p1',
    title: 'Unniversity of Peshawar',
    description: 'One of the best University in Pakistan',
    imageUrl:
      'https://www.app.com.pk/wp-content/uploads/2023/12/University-of-Peshawar.jpg',
    address: 'University road peshawar kpk pakistan',
    location: {
      lat: 34.025917,
      lng: 71.560135,
    },

    creator: 'u1',
  },
  {
    id: 'p2',
    title: 'Government Collage Peshawar',
    description: 'One of the best Collage in Pakistan',
    imageUrl:
      'https://photo-cdn.urdupoint.com/media/2022/08/_2/740x404/pic_1660398873.jpg',
    address: 'University road peshawar kpk pakistan',
    location: {
      lat: 34.025917,
      lng: 71.560135,
    },

    creator: 'u2',
  },
]
const UpdatePlace = () => {
  const { placeId } = useParams()
  const [isLoading, setIsLoading] = useState(true)

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: { value: '', isValid: false },
      description: { value: '', isValid: false },
    },
    false
  )
  const updatePlaceSubmitHandler = (event) => {
    event.preventDefault()
    console.log(formState)
  }
  const place = DUMMYPLACES.find((place) => place.id === placeId)
  useEffect(() => {
    if (place) {
      setFormData(
        {
          title: { value: place.title, isValid: true },
          description: { value: place.description, isValid: true },
        },
        true
      )
    }
    setIsLoading(false)
  }, [setFormData, place])

  if (!place) {
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
        <h2>Loading....</h2>
      </div>
    )
  }
  return (
    <form className="place-form" onSubmit={updatePlaceSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        errorText="Plase provide a valid title"
        validators={[VALIDATOR_REQUIRE()]}
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
        onInput={inputHandler}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        errorText="Plase provide a valid description (atleast 5 charachter long)"
        validators={[VALIDATOR_MINLENGTH(5)]}
        initialValue={formState.inputs.description.value}
        initialValid={formState.inputs.description.isValid}
        onInput={inputHandler}
      />
      <Button type="submit" disabled={!formState.isValid}>
        Update Place
      </Button>
    </form>
  )
}

export default UpdatePlace
