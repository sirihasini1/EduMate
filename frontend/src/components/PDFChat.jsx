import { useState } from "react"
import axios from "axios"

import {
  Volume2,
  Square,
  MessageSquareText,
  Sparkles,
} from "lucide-react"

import {
  speakText,
  stopSpeaking,
} from "../utils/speakText"

function PDFChat() {

  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [loading, setLoading] = useState(false)

  const askQuestion = async () => {

    if (!question) return

    try {

      setLoading(true)

      const response = await axios.post(
        `https://edumate-backend-mpko.onrender.com/ask?question=${question}`
      )

      setAnswer(response.data.answer)

    } catch (error) {

      console.error(error)

      setAnswer("Something went wrong.")

    } finally {

      setLoading(false)

    }
  }

  return (
    <div className="bg-zinc-950 border border-red-950 rounded-3xl p-8 mt-12">

      {/* Header */}
      <div className="flex items-center gap-4 mb-6">

        <div className="bg-red-600/20 p-4 rounded-2xl">

          <MessageSquareText
            className="text-red-500"
            size={30}
          />

        </div>

        <div>

          <h2 className="text-3xl font-bold text-red-500">
            Chat with Your PDF
          </h2>

          <p className="text-gray-400 mt-1 text-base">
            Ask AI questions about your uploaded notes.
          </p>

        </div>

      </div>

      {/* Input */}
      <div className="flex flex-col gap-5">

        <textarea
          placeholder="Ask anything about your uploaded notes..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="bg-black border border-red-900 rounded-2xl p-5 text-white text-base outline-none min-h-[120px] focus:border-red-500"
        />

        {/* Ask Button */}
        <button
          onClick={askQuestion}
          className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-2xl font-semibold text-base w-fit flex items-center gap-3"
        >

          <Sparkles size={18} />

          {loading
            ? "Thinking..."
            : "Ask AI"
          }

        </button>

        {/* AI Response */}
        {answer && (

          <div className="bg-black border border-red-900 rounded-2xl p-6 mt-4">

            {/* Title */}
            <div className="flex items-center gap-3 mb-5">

              <Sparkles
                className="text-yellow-400"
                size={24}
              />

              <h3 className="text-2xl font-bold text-red-500">
                AI Answer
              </h3>

            </div>

            {/* Voice Buttons */}
            <div className="flex gap-4 mb-6">

              <button
                onClick={() => speakText(answer)}
                className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-xl flex items-center gap-2"
              >

                <Volume2 size={18} />

                Listen

              </button>

              <button
                onClick={stopSpeaking}
                className="bg-zinc-800 hover:bg-zinc-700 px-5 py-2 rounded-xl flex items-center gap-2"
              >

                <Square size={18} />

                Stop

              </button>

            </div>

            {/* Answer */}
            <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-wrap">
              {answer}
            </p>

          </div>
        )}

      </div>

    </div>
  )
}

export default PDFChat