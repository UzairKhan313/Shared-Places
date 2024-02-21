import React, { useEffect, useId, useState } from 'react'
import { useParams } from 'react-router-dom'

import PlaceList from '../components/PlaceList'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import { useHttpClient } from '../../shared/hooks/Http-Hook'

const UserPlaces = () => {
  const [loadedPlace, setIsLoadedPlace] = useState([])
  const { userId } = useParams()
  const { error, isLoading, sendRequest, clearError } = useHttpClient()

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/v1/places/user/${userId}/`
        )
        setIsLoadedPlace(responseData.places)
      } catch (error) {}
    }
    fetchPlaces()
  }, [sendRequest])

  const placeDeletedHandler = (deletedPlaceId) => {
    setIsLoadedPlace((prevState) =>
      prevState.filter((place) => place.id !== deletedPlaceId)
    )
  }
  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedPlace && (
        <PlaceList places={loadedPlace} onDeletePlace={placeDeletedHandler} />
      )}
    </>
  )
}

export default UserPlaces
