import React from 'react'

import Input from '../../shared/components/FormElements/Input'
import './NewPlace.css'

const NewPlace = () => {
  return (
    <form className="place-form">
      <Input
        element="input"
        label="Title"
        validator={[]}
        errorText="Please Enter a valid Title"
      />
    </form>
  )
}

export default NewPlace
