// pages/api/upload-avatar.js
import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"
import { PrismaClient } from "@prisma/client"
import formidable from 'formidable'
import { v2 as cloudinary } from 'cloudinary'

const prisma = new PrismaClient()

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const config = {
  api: {
    bodyParser: false, // Disable Next.js body parsing
  },
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Check if user is authenticated
  const session = await getServerSession(req, res, authOptions)
  
  if (!session?.user?.email) {
    return res.status(401).json({ error: "Unauthorized" })
  }

  try {
    // Parse the uploaded file using formidable
    const form = formidable({
      maxFileSize: 5 * 1024 * 1024, // 5MB limit
      keepExtensions: true,
    })

    const [fields, files] = await form.parse(req)
    const file = files.avatar?.[0]

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    if (!allowedTypes.includes(file.mimetype)) {
      return res.status(400).json({ error: 'Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.' })
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(file.filepath, {
      folder: 'user-avatars', // Organize uploads in folders
      public_id: `user-${session.user.id || session.user.email.replace('@', '-')}-${Date.now()}`,
      transformation: [
        { width: 400, height: 400, crop: 'fill', gravity: 'face' }, // Smart crop focusing on faces
        { quality: 'auto:good' }, // Automatic quality optimization
        { format: 'auto' } // Automatic format selection (WebP for modern browsers)
      ],
      overwrite: true, // Replace existing file with same public_id
    })

    // Update user's avatar in database
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: { image: result.secure_url },
    })

    // Return the new image URL
    res.status(200).json({ 
      success: true,
      imageUrl: result.secure_url,
      message: 'Avatar updated successfully'
    })

  } catch (error) {
    console.error('Upload error:', error)
    
    // Handle specific Cloudinary errors
    if (error.message.includes('File size too large')) {
      return res.status(400).json({ error: 'File size too large. Maximum 5MB allowed.' })
    }
    
    res.status(500).json({ error: 'Upload failed. Please try again.' })
  } finally {
    // Close Prisma connection
    await prisma.$disconnect()
  }
}