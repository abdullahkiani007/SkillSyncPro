import React, { useState } from 'react'

const ImageUpload = ({ setimg }) => {
  const [image, setImage] = useState(null)
  const [url, setUrl] = useState('')
  const [preview, setPreview] = useState('')

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    console.log('file -> ', file)
    if (file) {
      setImage(file)
      setPreview(URL.createObjectURL(file))
      console.log('File selected:', file)
    } else {
      console.error('No file selected')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!image) {
      console.error('No image to upload')
      console.log(image)
      return
    }

    const formData = new FormData()
    formData.append('file', image)
    formData.append(
      'upload_preset',
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    )
    console.log(formData)

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      )
      const data = await response.json()

      if (data.secure_url) {
        setUrl(data.secure_url)
        setImage(null)
        setimg(data.secure_url)
        console.log('Image uploaded successfully:', data.secure_url)
      } else {
        console.error('Error in response:', data)
      }
    } catch (error) {
      console.error('Error uploading image:', error)
    }
  }

  return (
    <div>
      <form >
        <input type='file' onChange={handleImageChange} />
        <button
          className='bg-secondary-dark text-white px-2 py-1'
          onClick={handleSubmit}
        >
          Upload
        </button>
      </form>
      {preview && (
        <div>
          <h3>Image Preview:</h3>
          <img
            src={preview}
            alt='Preview'
            style={{ maxWidth: '300px', maxHeight: '300px' }}
          />
        </div>
      )}
    </div>
  )
}

export default ImageUpload
