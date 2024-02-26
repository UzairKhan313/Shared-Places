// import React, { useEffect, useRef, useState } from 'react'

// import Button from './Button'
// import './ImageUpload.css'

// const ImageUpload = (props) => {
//   const [file, setFile] = useState()
//   const [previewUrl, setPreviewUrl] = useState()
//   const [isValid, setIsValid] = useState(false)
//   const filePickerRef = useRef()

//   const pickImageHandler = () => {
//     filePickerRef.current.click()
//   }

//   useEffect(() => {
//     if (!file) {
//       return
//     }
//     // Javascript browser API. help to parse file from binary to create image preview.
//     const fileReader = new FileReader()

//     // the onload get function which excute only when the reading of file is done
//     fileReader.onload = () => {
//       setPreviewUrl(fileReader.result)
//     }

//     fileReader.readAsDataURL(file)
//   }, [file])

//   const pickHandler = (event) => {
//     let pickedFile
//     let fileIsValid = isValid
//     if (event.target.files && event.target.files.length === 1) {
//       pickedFile = event.target.files[0]
//       setFile(pickedFile)
//       setIsValid(true)
//       fileIsValid = true
//     } else {
//       setIsValid(false)

//       fileIsValid = false
//     }
//     props.onInput(props.id, pickedFile, fileIsValid)
//   }
//   return (
//     <div className="from-control">
//       <input
//         type="file"
//         ref={filePickerRef}
//         id={props.id}
//         style={{ display: 'none' }}
//         accept=".jpg,.png,jpeg"
//         onChange={pickHandler}
//       />
//       <div className={`image-upload ${props.center && 'center'}`}>
//         <div className="image-upload__preview">
//           {previewUrl && <img src={previewUrl} alt="preview" />}
//           {!previewUrl && <p>Please pick profile Image</p>}
//         </div>
//         <Button type="button" onClick={pickImageHandler}>
//           PICK IMAGE
//         </Button>
//       </div>
//       {!isValid && <p>{props.errorText}</p>}
//     </div>
//   )
// }

// export default ImageUpload
import React, { useRef, useState, useEffect } from 'react'

import Button from './Button'
import './ImageUpload.css'

const ImageUpload = (props) => {
  const [file, setFile] = useState()
  const [previewUrl, setPreviewUrl] = useState()
  const [isValid, setIsValid] = useState(false)

  const filePickerRef = useRef()

  useEffect(() => {
    if (!file) {
      return
    }
    const fileReader = new FileReader()
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result)
    }
    fileReader.readAsDataURL(file)
  }, [file])

  const pickedHandler = (event) => {
    let pickedFile
    let fileIsValid = isValid
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0]
      setFile(pickedFile)
      setIsValid(true)
      fileIsValid = true
    } else {
      setIsValid(false)
      fileIsValid = false
    }
    props.onInput(props.id, pickedFile, fileIsValid)
  }

  const pickImageHandler = () => {
    filePickerRef.current.click()
  }

  return (
    <div className="form-control">
      <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: 'none' }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
      <div className={`image-upload ${props.center && 'center'}`}>
        <div className="image-upload__preview">
          {previewUrl && <img src={previewUrl} alt="Preview" />}
          {!previewUrl && <p>Please pick an image.</p>}
        </div>
        <Button type="button" onClick={pickImageHandler}>
          PICK IMAGE
        </Button>
      </div>
      {!isValid && <p style={{ color: 'red' }}>{props.errorText}</p>}
    </div>
  )
}

export default ImageUpload
