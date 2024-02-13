import React from 'react'

import Card from './../../shared/components/UIElements/Card'
import PlaceItem from './PlaceItem'
import './PlaceList.css'
import Button from '../../shared/components/FormElements/Button'

const PlaceList = ({ places }) => {
  if (places.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No place found. May be create one</h2>
          <Button to="/place/new">Share Place</Button>
        </Card>
      </div>
    )
  }
  return (
    <ul className="place-list">
      {places.map((place) => (
        <PlaceItem
          key={place.id}
          id={place.id}
          image={place.imageUrl}
          title={place.title}
          description={place.description}
          address={place.address}
          creatorId={place.creator}
          coordinates={place.location}
        />
      ))}
    </ul>
  )
}

export default PlaceList
