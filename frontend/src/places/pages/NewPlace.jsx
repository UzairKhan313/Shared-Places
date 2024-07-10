import React from "react";
import { useNavigate } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import { useForm } from "../../shared/hooks/Form-Hooks";

import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/utils/validators";
import "./NewPlace.css";
import { useHttpClient } from "../../shared/hooks/Http-Hook";
import { useAuthContext } from "../../shared/context/Auth-Context";

const NewPlace = () => {
  const { error, isLoading, sendRequest, clearError } = useHttpClient();
  const { userId, token } = useAuthContext();
  const navigate = useNavigate();
  const [formState, inputHandler] = useForm(
    {
      title: { value: "", isValid: false },
      description: { value: "", isValid: false },
      address: { value: "", isValid: false },
      image: { value: null, isValid: false },
    },
    false
  );

  const placeFormSubmithandler = async (event) => {
    event.preventDefault(); // send to the form.

    try {
      const formData = new FormData();
      formData.append("title", formState.inputs.title.value);
      formData.append("description", formState.inputs.description.value);
      formData.append("address", formState.inputs.address.value);
      formData.append("creator", userId);
      formData.append("image", formState.inputs.image.value);

      await sendRequest(
        "http://localhost:5000/api/v1/places/new",
        "POST",
        formData,
        {
          Authorization: "Bearer " + token,
        }
      );

      navigate(`/`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <form className="place-form" onSubmit={placeFormSubmithandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please Enter a valid Title"
          onInput={inputHandler}
        />

        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please Enter a valid Description (atleast 5 character long)"
          onInput={inputHandler}
        />
        <Input
          id="address"
          element="input"
          label="Address"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please Enter a valid Address"
          onInput={inputHandler}
        />
        <ImageUpload
          center
          id="image"
          onInput={inputHandler}
          errorText="Please Provide an image"
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD PLACE
        </Button>
      </form>
    </>
  );
};

export default NewPlace;
