// components/AvatarUpload.js
import { useState, useRef } from 'react'
import { useSession } from 'next-auth/react'
import styles from "../../styles/ui/ImageUpload.module.css"
import Image from 'next/image'

export default function AvatarUpload({ currentImage, onImageUpdate }) {
  const { data: session, update } = useSession()
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(currentImage)
  const [error, setError] = useState('')
  const fileInputRef = useRef(null)

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB')
      return
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      setError('Please select a valid image file (JPEG, PNG, GIF, or WebP)')
      return
    }

    setError('')
    
    // Show preview
    const reader = new FileReader()
    reader.onload = (e) => setPreview(e.target.result)
    reader.readAsDataURL(file)

    // Upload the file
    uploadFile(file)
  }

  const uploadFile = async (file) => {
    setUploading(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('avatar', file)

      const response = await fetch('/api/upload-avatar', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed')
      }

      // Add cache buster to force image refresh
      const imageUrlWithCacheBuster = `${data.imageUrl}?t=${Date.now()}`
      
      // Update the preview and notify parent component
      setPreview(imageUrlWithCacheBuster)
      if (onImageUpdate) {
        onImageUpdate(imageUrlWithCacheBuster)
      }

      // Update session data to reflect new avatar
      await update({
        ...session,
        user: {
          ...session.user,
          image: imageUrlWithCacheBuster
        }
      })

    } catch (error) {
      console.error('Upload error:', error)
      setError(error.message || 'Failed to upload image')
      setPreview(currentImage) // Reset preview on error
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="d-flex flex-column align-items-center">
      {/* Avatar Preview */}
      <div className="position-relative mb-3">
        <div className="rounded-circle overflow-hidden bg-light border border-3 border-white shadow" 
             style={{ width: '128px', height: '128px' }}>
          {preview ? (
            <Image
              src={preview}
              alt="Avatar preview"
              width={128}
              height={128}
              className="img-fluid"
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover' 
              }}
              key={preview} // Force re-render when preview changes
            />
          ) : (
            <div className="w-100 h-100 d-flex align-items-center justify-content-center text-secondary">
              <svg className="bi" width="48" height="48" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
        
        {/* Loading overlay */}
        {uploading && (
          <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 rounded-circle d-flex align-items-center justify-content-center">
            <div className="spinner-border text-white" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
      </div>

      {/* Upload Button */}
      <div className="mb-3">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="d-none"
          disabled={uploading}
        />
        
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className={`btn ${styles.customFileUpload} ${uploading ? 'disabled' : ''}`}
        >
          {uploading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status"></span>
              Uploading...
            </>
          ) : (
            'Change Avatar'
          )}
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="alert alert-danger alert-sm text-center" role="alert">
          {error}
        </div>
      )}

      {/* Upload Guidelines */}
      <small className="text-muted text-center">
        Maximum file size: 5MB
      </small>
    </div>
  )
}