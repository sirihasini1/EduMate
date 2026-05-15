import { useState } from "react"
import axios from "axios"
import { Volume2, Square } from "lucide-react"
import { speakText, stopSpeaking } from "../utils/speakText"

import {
  CalendarDays,
  Sparkles,
  Clock3,
} from "lucide-react"

function StudyPlanner() {

  const [goal, setGoal] = useState("")
  const [hours, setHours] = useState("")
  const [planner, setPlanner] = useState("")
  const [loading, setLoading] = useState(false)

  const generatePlanner = async () => {

    if (!goal || !hours) return

    try {

      setLoading(true)

      const response = await axios.post(
        "https://edumate-backend-mpko.onrender.com/generate-study-plan",
        {
          goal,
          hours_per_day: hours,
        }
      )

      setPlanner(response.data.study_plan)

    } catch (error) {

      console.error(error)

      setPlanner("Failed to generate study planner.")

    } finally {

      setLoading(false)

    }
  }

  const formatPlanner = (text) => {

    const lines = text.split("\n")

    return lines.map((line, index) => {

      const clean = line
        .replace(/[#*]/g, "")
        .trim()

      if (!clean) return null

      const isHeading =
        clean.includes("Daily Schedule") ||
        clean.includes("Topics to Study") ||
        clean.includes("Week") ||
        clean.includes("Revision") ||
        clean.includes("Practice")

      if (isHeading) {

        return (
          <h2
            key={index}
            className="text-3xl font-bold text-red-500 mt-10 mb-6"
          >
            {clean}
          </h2>
        )
      }

      return (
        <div
          key={index}
          className="bg-[#070707] border border-red-900 rounded-2xl p-5 mb-5"
        >

          <div className="flex items-start gap-4">

            <div className="w-3 h-3 rounded-full bg-red-500 mt-2"></div>

            <p className="text-lg text-gray-200 leading-relaxed">
              {clean}
            </p>

          </div>

        </div>
      )
    })
  }

  return (
    <div className="bg-[#0d0d0d] border border-red-900 rounded-3xl p-8">

      {/* Header */}
      <div className="flex items-center gap-3 mb-4">

        <CalendarDays
          className="text-red-500"
          size={30}
        />

        <h1 className="text-3xl font-bold text-red-500">
          AI Study Planner
        </h1>

      </div>

      <p className="text-base text-gray-400 mb-8 leading-relaxed">
        Generate personalized AI-powered daily study schedules based on your goals and available study hours.
      </p>

      {/* Inputs */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">

        <input
          type="text"
          placeholder="Enter Goal (DSA, AI, Web Dev...)"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          className="bg-black border border-red-900 rounded-2xl px-5 py-3 text-base outline-none focus:border-red-500"
        />

        <input
          type="number"
          placeholder="Study Hours Per Day"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          className="bg-black border border-red-900 rounded-2xl px-5 py-3 text-base outline-none focus:border-red-500"
        />

      </div>

      {/* Button */}
      <button
        onClick={generatePlanner}
        className="bg-red-600 hover:bg-red-700 transition px-6 py-3 rounded-2xl text-base font-semibold flex items-center gap-3"
      >

        <Sparkles size={18} />

        {loading
          ? "Generating..."
          : "Generate Study Planner"
        }

      </button>

      {/* Result */}
      {planner && (

        <div className="border border-red-900 rounded-3xl p-8 bg-black mt-10">

          <div className="flex items-center gap-3 mb-8">

            <Clock3
              className="text-yellow-400"
              size={30}
            />

            <h2 className="text-3xl font-bold text-white">
              Your AI Study Schedule
            </h2>

          </div>

          {formatPlanner(planner)}

        </div>

      )}

    </div>
  )
}

export default StudyPlanner