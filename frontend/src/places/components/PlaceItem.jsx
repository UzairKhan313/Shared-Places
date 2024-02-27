import React, { useState } from 'react'

import Card from '../../shared/components/UIElements/Card'
import Button from '../../shared/components/FormElements/Button'
import Modal from '../../shared/components/UIElements/Modal'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import { useAuthContext } from '../../shared/context/Auth-Context'
import './PlaceItem.css'
import { useHttpClient } from '../../shared/hooks/Http-Hook'

const PlaceItem = ({
  id,
  image,
  title,
  description,
  address,
  creatorId,
  onDelete,
}) => {
  const [showMap, setShowMap] = useState(false)
  const [showConfrimModal, setShowConfirmModal] = useState(false)
  const { userId, token } = useAuthContext()
  const { error, isLoading, sendRequest, clearError } = useHttpClient()

  const showDeleteHandler = () => {
    setShowConfirmModal(true)
  }
  const closeDeleteHandler = () => {
    setShowConfirmModal(false)
  }

  const confirmDeleteHandler = async (id) => {
    setShowConfirmModal(false)
    try {
      await sendRequest(
        `http://localhost:5000/api/v1/places/${id}`,
        'DELETE',
        null,
        { Authorization: 'Bearer ' + token }
      )
      onDelete(id)
    } catch (error) {}
  }

  const openMapHandler = () => {
    setShowMap(true)
  }
  const closeMapHandler = () => {
    setShowMap(false)
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        headerText="The Map"
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footerChildren={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <div className="map-container">
          <h2>We Are Working on it.</h2>
        </div>
      </Modal>
      <Modal
        headerText="Are you sure ?"
        footerClass="place-item__modal-actions"
        show={showConfrimModal}
        onCancel={closeDeleteHandler}
        footerChildren={
          <>
            <Button inverse onClick={closeDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={() => confirmDeleteHandler(id)}>
              DELETE
            </Button>
          </>
        }
      >
        <p>
          Do you want to proceed and delete this place? Please note that it
          can't be undone thereafter.
        </p>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          {isLoading && <LoadingSpinner asOverlay />}
          <div className="place-item__image">
            <img src={`http://localhost:5000/${image}`} alt={title} />
          </div>
          <div className="place-item__info">
            <h2>{title}</h2>
            <h3>{address}</h3>
            <p>{description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMapHandler}>
              VIEW ON MAP
            </Button>
            {userId === creatorId && <Button to={`/places/${id}`}>Edit</Button>}
            {userId === creatorId && (
              <Button danger onClick={showDeleteHandler}>
                DELETE
              </Button>
            )}
          </div>
        </Card>
      </li>
    </React.Fragment>
  )
}

export default PlaceItem
