import React from 'react'
import { useParams } from 'react-router-dom'
import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/utils/validators'

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
  const place = DUMMYPLACES.find((place) => place.id === placeId)

  if (!place) {
    return (
      <div className="center">
        <h2>Could not find the place.</h2>
      </div>
    )
  }
  return (
    <form action="place-form">
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        errorText="Plase provide a valid title"
        validators={[VALIDATOR_REQUIRE()]}
        value={place.title}
        valid={true}
        onInput={() => {}}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        errorText="Plase provide a valid description (atleast 5 charachter long)"
        validators={[VALIDATOR_MINLENGTH(5)]}
        value={place.description}
        valid={true}
        onInput={() => {}}
      />
      <Button type="submit" disabeld={true}>
        Update Place
      </Button>
    </form>
  )
}

export default UpdatePlace
