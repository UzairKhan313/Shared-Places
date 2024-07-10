import React from 'react'

import Modal from './Modal'
import Button from '../FormElements/Button'

const ErrorModal = (props) => {
  return (
    <Modal
      onClose={props.onClear}
      headerText="An Error Occurred!"
      show={!!props.error}
      footerChildren={<Button onClick={props.onClear}>Okay</Button>}
    >
      <p>{props.error}</p>
    </Modal>
  )
}

export default ErrorModal
