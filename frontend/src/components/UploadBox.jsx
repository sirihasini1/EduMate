import { useState } from "react"
import axios from "axios"

function UploadBox() {

  const [selectedFiles, setSelectedFiles] = useState([])
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  // Handle Multiple File Selection
  const handleFileChange = (e) => {

    setSelectedFiles(
      Array.from(e.target.files)
    )

    setMessage("")
  }

  // Upload Multiple PDFs
  const handleUpload = async () => {

    if (selectedFiles.length === 0) {

      setMessage("Please select PDF files.")

      return
    }

    try {

      setLoading(true)

      for (let i = 0; i < selectedFiles.length; i++) {

        const formData = new FormData()

        formData.append(
          "file",
          selectedFiles[i]
        )

        await axios.post(
          "http://127.0.0.1:8000/upload-pdf",
          formData
        )
      }

      setMessage(
        `${selectedFiles.length} PDFs uploaded successfully`
      )

    } catch (error) {

      console.error(error)

      setMessage("Upload failed.")

    } finally {

      setLoading(false)
    }
  }

  return (

    <div className="bg-zinc-950 border-2 border-dashed border-red-900 rounded-3xl p-12 flex flex-col items-center justify-center text-center hover:border-red-600 transition">

      {/* Icon */}
      <div className="text-6xl mb-6">
        📄
      </div>

      {/* Title */}
      <h2 className="text-3xl font-bold mb-4">
        Upload Your Notes
      </h2>

      {/* Subtitle */}
      <p className="text-gray-400 max-w-xl mb-8">
        Upload multiple PDFs, lecture notes, or study material and chat with all of them together using AI.
      </p>

      {/* File Input */}
      <input
        type="file"
        accept=".pdf"
        multiple
        onChange={handleFileChange}
        className="bg-zinc-900 border border-red-900 rounded-xl px-4 py-3 w-full max-w-md text-gray-300"
      />

      {/* Selected Files */}
      {selectedFiles.length > 0 && (

        <div className="mt-6 w-full max-w-md text-left">

          <p className="text-red-400 mb-3 font-semibold">
            Selected Files:
          </p>

          <div className="space-y-2">

            {selectedFiles.map((file, index) => (

              <div
                key={index}
                className="bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-lg text-gray-300"
              >
                {file.name}
              </div>
            ))}

          </div>

        </div>
      )}

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        className="mt-8 bg-red-600 hover:bg-red-700 px-8 py-3 rounded-xl font-semibold transition"
      >
        {loading
          ? "Uploading..."
          : "Upload PDFs"}
      </button>

      {/* Status Message */}
      {message && (

        <div className="mt-6 px-6 py-3 rounded-xl bg-red-950 border border-red-800 text-red-300">

          {message}

        </div>
      )}

    </div>
  )
}

export default UploadBox