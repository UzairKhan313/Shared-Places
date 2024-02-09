import React from 'react'
import { useParams } from 'react-router-dom'

import PlaceList from '../components/PlaceList'

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

const UserPlaces = () => {
  const { userId } = useParams()

  const USER_PLACES = DUMMYPLACES.filter((place) => place.creator === userId)
  return <PlaceList places={USER_PLACES} />
}

export default UserPlaces
