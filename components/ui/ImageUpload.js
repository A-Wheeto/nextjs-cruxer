// components/ImageUpload.js
import { useState } from 'react'
import Image from 'next/image'
import styles from "../../styles/ui/ImageUpload.module.css"

export default function ImageUpload({ currentImage, onImageUpdate }) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(currentImage)

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Show preview
    const reader = new FileReader()
    reader.onload = (e) => setPreview(e.target?.result)
    reader.readAsDataURL(file)

    // Upload file
    setUploading(true)
    const formData = new FormData()
    formData.append('avatar', file)

    try {
      const response = await fetch('/api/upload-avatar', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const { imageUrl } = await response.json()
        onImageUpdate(imageUrl)
        setPreview(imageUrl)
      } else {
        alert('Upload failed')
        setPreview(currentImage) // Reset preview
      }
    } catch (error) {
      alert('Upload error')
      setPreview(currentImage) // Reset preview
    } finally {
      setUploading(false)
    }
  }

  return (
      <div className="d-flex flex-column">
        <div className="overflow-hidden mx-auto">
          {preview ? (
            <Image
              src={preview}
              alt="Profile"
              width={200}
              height={200}
              className="object-cover rounded-circle"
            />
          ) : (
            <svg className="text-gray-400" fill="currentColor" viewBox="0 0 20 20" style={{ width: "200px", height: "200px" }}>
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          )}
        </div>
        <div className="mt-4 text-center">
          <label htmlFor="file-upload" className={styles.customFileUpload}>
            Edit Photo
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
            className={styles.hiddenFileInput}
          />
          {uploading && <p className="text-sm text-gray-500 mt-1">Uploading...</p>}
        </div>
      </div>
  )
}