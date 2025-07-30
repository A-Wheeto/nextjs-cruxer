// pages/api/upload-avatar.js
import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"
import { PrismaClient } from "@prisma/client"
import formidable from 'formidable'
import fs from 'fs'
import path from 'path'

const prisma = new PrismaClient()

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const session = await getServerSession(req, res, authOptions)
  
  if (!session?.user?.email) {
    return res.status(401).json({ error: "Unauthorized" })
  }

  try {
    const form = formidable({
      uploadDir: './public/uploads',
      keepExtensions: true,
      maxFileSize: 5 * 1024 * 1024, // 5MB limit
    })

    // Create uploads directory if it doesn't exist
    const uploadDir = './public/uploads'
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }

    const [fields, files] = await form.parse(req)
    const file = files.avatar?.[0]

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    // Check file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    if (!allowedTypes.includes(file.mimetype)) {
      fs.unlinkSync(file.filepath) // Delete uploaded file
      return res.status(400).json({ error: 'Invalid file type' })
    }

    // Generate unique filename
    const timestamp = Date.now()
    const extension = path.extname(file.originalFilename || '')
    const filename = `avatar-${session.user.id}-${timestamp}${extension}`
    const newPath = path.join('./public/uploads', filename)

    // Move file to final location
    fs.renameSync(file.filepath, newPath)

    // Update user in database
    const imageUrl = `/uploads/${filename}`
    await prisma.user.update({
      where: { email: session.user.email },
      data: { image: imageUrl },
    })

    res.status(200).json({ imageUrl })
  } catch (error) {
    console.error('Upload error:', error)
    res.status(500).json({ error: 'Upload failed' })
  }
}