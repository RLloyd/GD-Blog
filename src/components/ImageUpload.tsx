// src/components/ImageUpload.tsx
'use client'
import { useState } from 'react'
import { supabaseClient } from '@/lib/auth'
import { Upload, Loader2 } from 'lucide-react'
import Image from 'next/image'

type ImageUploadProps = {
  onUploadComplete: (url: string) => void
  existingUrl?: string
}

export function ImageUpload({ onUploadComplete, existingUrl }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(existingUrl || null)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be less than 5MB')
      return
    }

    setIsUploading(true)
    setError(null)

    try {
      // Create a unique file name
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}.${fileExt}`

      // Directly attempt upload
      const { error: uploadError, data } = await supabaseClient
        .storage
        .from('images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (uploadError) {
        throw new Error(uploadError.message)
      }

      // Get public URL
      const { data: { publicUrl } } = supabaseClient
        .storage
        .from('images')
        .getPublicUrl(fileName)

      setPreview(publicUrl)
      onUploadComplete(publicUrl)
    } catch (err) {
      console.error('Upload error:', err)
      setError(err instanceof Error ? err.message : 'Failed to upload image')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-500/10 text-red-500 p-4 rounded">
          {error}
        </div>
      )}

      <label className="block">
        <div className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-700 rounded-lg hover:border-gray-500 cursor-pointer bg-gray-800">
          <div className="space-y-2 text-center">
            {isUploading ? (
              <div className="flex items-center gap-2 text-gray-300">
                <Loader2 className="animate-spin" />
                <span>Uploading...</span>
              </div>
            ) : (
              <>
                <Upload className="mx-auto text-gray-400" />
                <div className="text-gray-400">Click to upload image</div>
                <div className="text-gray-500 text-sm">Max size: 5MB</div>
              </>
            )}
          </div>
        </div>
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
          disabled={isUploading}
        />
      </label>

      {preview && (
        <div className="mt-4 relative aspect-video w-full max-w-sm">
          <Image
            src={preview}
            alt="Upload preview"
            fill
            className="rounded border border-gray-700 object-cover"
            sizes="(max-width: 640px) 100vw, 384px"
          />
        </div>
      )}
    </div>
  )
}
// 'use client'
// import { useState } from 'react'
// import { supabaseClient } from '@/lib/auth'
// import { Upload, Loader2 } from 'lucide-react'
// import Image from 'next/image'

// type ImageUploadProps = {
//   onUploadComplete: (url: string) => void
//   existingUrl?: string
// }

// export function ImageUpload({ onUploadComplete, existingUrl }: ImageUploadProps) {
//   const [isUploading, setIsUploading] = useState(false)
//   const [preview, setPreview] = useState<string | null>(existingUrl || null)
//   const [error, setError] = useState<string | null>(null)

//   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (!file) return

//     console.log('Selected file:', file.name, 'Size:', file.size, 'Type:', file.type)

//     // Validate file type
//     if (!file.type.startsWith('image/')) {
//       setError('Please select an image file')
//       return
//     }

//     // Validate file size (max 5MB)
//     if (file.size > 5 * 1024 * 1024) {
//       setError('Image must be less than 5MB')
//       return
//     }

//     setIsUploading(true)
//     setError(null)

//     try {
//       // Create a unique file name
//       const fileExt = file.name.split('.').pop()
//       const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
//       const filePath = `${fileName}` // Simplified path

//       console.log('Attempting upload to:', filePath)

//       // First, check if we can access the bucket
//       const { data: bucketData, error: bucketError } = await supabaseClient
//         .storage
//         .getBucket('images')

//       if (bucketError) {
//         console.error('Bucket access error:', bucketError)
//         throw new Error('Unable to access storage bucket')
//       }

//       console.log('Bucket access confirmed:', bucketData)

//       // Attempt the upload
//       const { error: uploadError, data: uploadData } = await supabaseClient
//         .storage
//         .from('images')
//         .upload(filePath, file, {
//           cacheControl: '3600',
//           upsert: false
//         })

//       if (uploadError) {
//         console.error('Upload error details:', uploadError)
//         throw new Error(uploadError.message || 'Failed to upload file')
//       }

//       console.log('Upload successful:', uploadData)

//       // Get public URL
//       const { data: { publicUrl } } = supabaseClient
//         .storage
//         .from('images')
//         .getPublicUrl(filePath)

//       console.log('Generated public URL:', publicUrl)

//       setPreview(publicUrl)
//       onUploadComplete(publicUrl)
//     } catch (err) {
//       console.error('Full error details:', err)
//       setError(err instanceof Error ? err.message : 'Failed to upload image. Please try again.')
//     } finally {
//       setIsUploading(false)
//     }
//   }

//   return (
//     <div className="space-y-4">
//       {error && (
//         <div className="bg-red-500/10 text-red-500 p-4 rounded">
//           {error}
//         </div>
//       )}

//       <label className="block">
//         <div className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-700 rounded-lg hover:border-gray-500 cursor-pointer bg-gray-800">
//           <div className="space-y-2 text-center">
//             {isUploading ? (
//               <div className="flex items-center gap-2 text-gray-300">
//                 <Loader2 className="animate-spin" />
//                 <span>Uploading...</span>
//               </div>
//             ) : (
//               <>
//                 <Upload className="mx-auto text-gray-400" />
//                 <div className="text-gray-400">Click to upload image</div>
//                 <div className="text-gray-500 text-sm">Max size: 5MB</div>
//               </>
//             )}
//           </div>
//         </div>
//         <input
//           type="file"
//           className="hidden"
//           accept="image/*"
//           onChange={handleFileChange}
//           disabled={isUploading}
//         />
//       </label>

//       {preview && (
//         <div className="mt-4 relative aspect-video w-full max-w-sm">
//           <Image
//             src={preview}
//             alt="Upload preview"
//             fill
//             className="rounded border border-gray-700 object-cover"
//             sizes="(max-width: 640px) 100vw, 384px"
//           />
//         </div>
//       )}
//     </div>
//   )
// }
// // 'use client'
// // import { useState } from 'react'
// // import { supabaseClient } from '@/lib/auth'
// // import { Upload, Loader2 } from 'lucide-react'
// // import Image from 'next/image'

// // type ImageUploadProps = {
// //   onUploadComplete: (url: string) => void
// //   existingUrl?: string
// // }

// // export function ImageUpload({ onUploadComplete, existingUrl }: ImageUploadProps) {
// //   const [isUploading, setIsUploading] = useState(false)
// //   const [preview, setPreview] = useState<string | null>(existingUrl || null)
// //   const [error, setError] = useState<string | null>(null)

// //   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const file = e.target.files?.[0]
// //     if (!file) return

// //     console.log('Selected file:', file)

// //     // Validate file type
// //     if (!file.type.startsWith('image/')) {
// //       setError('Please select an image file')
// //       return
// //     }

// //     // Validate file size (max 5MB)
// //     if (file.size > 5 * 1024 * 1024) {
// //       setError('Image must be less than 5MB')
// //       return
// //     }

// //     setIsUploading(true)
// //     setError(null)

// //     try {
// //       // Create a unique file name
// //       const fileExt = file.name.split('.').pop()
// //       const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`
// //       const filePath = `blog-images/${fileName}`

// //       console.log('Uploading to path:', filePath)

// //       // Upload to Supabase Storage
// //       const { error: uploadError, data } = await supabaseClient.storage
// //         .from('images')
// //         .upload(filePath, file, {
// //           cacheControl: '3600',
// //           upsert: false
// //         })

// //       if (uploadError) {
// //         console.error('Upload error:', uploadError)
// //         throw uploadError
// //       }

// //       console.log('Upload successful:', data)

// //       // Get public URL
// //       const { data: { publicUrl } } = supabaseClient.storage
// //         .from('images')
// //         .getPublicUrl(filePath)

// //       console.log('Public URL:', publicUrl)

// //       setPreview(publicUrl)
// //       onUploadComplete(publicUrl)
// //     } catch (err) {
// //       console.error('Upload error:', err)
// //       setError('Failed to upload image. Please try again.')
// //     } finally {
// //       setIsUploading(false)
// //     }
// //   }

// //   return (
// //     <div className="space-y-4">
// //       {error && (
// //         <div className="text-red-500 text-sm">{error}</div>
// //       )}

// //       <label className="block">
// //         <div className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-700 rounded-lg hover:border-gray-500 cursor-pointer bg-gray-800">
// //           <div className="space-y-2 text-center">
// //             {isUploading ? (
// //               <div className="flex items-center gap-2">
// //                 <Loader2 className="animate-spin" />
// //                 <span>Uploading...</span>
// //               </div>
// //             ) : (
// //               <>
// //                 <Upload className="mx-auto text-gray-400" />
// //                 <div className="text-gray-400">Click to upload image</div>
// //                 <div className="text-gray-500 text-sm">Max size: 5MB</div>
// //               </>
// //             )}
// //           </div>
// //         </div>
// //         <input
// //           type="file"
// //           className="hidden"
// //           accept="image/*"
// //           onChange={handleFileChange}
// //           disabled={isUploading}
// //         />
// //       </label>

// //       {preview && (
// //         <div className="mt-4 relative aspect-video w-full max-w-sm">
// //           <Image
// //             src={preview}
// //             alt="Upload preview"
// //             fill
// //             className="rounded border border-gray-700 object-cover"
// //             sizes="(max-width: 640px) 100vw, 384px"
// //           />
// //         </div>
// //       )}
// //     </div>
// //   )
// // }