import { useState } from "react";
import axios from "axios";

import {
  Volume2,
  Square,
  Video,
  Sparkles,
} from "lucide-react";

import {
  speakText,
  stopSpeaking,
} from "../utils/speakText";

export default function YouTubeSummarizer() {

  const [url, setUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const generateSummary = async () => {

    try {

      setLoading(true);

      const response = await axios.post(
        "http://127.0.0.1:8000/youtube-summary",
        {
          url: url
        }
      );

      setSummary(response.data.summary);

    } catch (error) {

      console.error(error);

      if (error.response) {

        setSummary(
          "Backend Error: " +
          JSON.stringify(error.response.data)
        );

      } else {

        setSummary(
          "Failed to generate summary"
        );
      }

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="bg-black border border-red-700 rounded-3xl p-8">

      {/* Header */}
      <div className="flex items-center gap-4 mb-6">

        <div className="bg-red-600/20 p-4 rounded-2xl">

          <Video
            className="text-red-500"
            size={30}
          />

        </div>

        <div>

          <h2 className="text-3xl font-bold text-red-500">
            YouTube Lecture Summarizer
          </h2>

          <p className="text-gray-400 mt-1 text-base">
            Convert long lectures into quick AI summaries.
          </p>

        </div>

      </div>

      {/* Input */}
      <input
        type="text"
        placeholder="Paste YouTube URL"
        value={url}
        onChange={(e) =>
          setUrl(e.target.value)
        }
        className="w-full bg-black border border-red-700 rounded-2xl p-4 text-white text-base mb-6 outline-none focus:border-red-500"
      />

      {/* Button */}
      <button
        onClick={generateSummary}
        className="bg-red-700 hover:bg-red-600 px-6 py-3 rounded-2xl text-white text-base font-semibold flex items-center gap-3"
      >

        <Sparkles size={18} />

        {loading
          ? "Generating..."
          : "Generate Summary"
        }

      </button>

      {/* Summary */}
      {summary && (

        <div className="mt-8 bg-neutral-900 border border-red-900 rounded-2xl p-6">

          {/* Title */}
          <div className="flex items-center gap-3 mb-5">

            <Sparkles
              className="text-yellow-400"
              size={24}
            />

            <h3 className="text-red-400 text-2xl font-bold">
              AI Summary
            </h3>

          </div>

          {/* Voice Buttons */}
          <div className="flex gap-4 mb-6">

            <button
              onClick={() => speakText(summary)}
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

          {/* Summary Content */}
          <p className="text-white text-lg leading-relaxed whitespace-pre-wrap">
            {summary}
          </p>

        </div>

      )}

    </div>
  );
}