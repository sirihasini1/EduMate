import { useState } from "react";
import axios from "axios";

import {
  Sparkles,
  Map,
  Clock,
  Rocket,
  BookOpen,
  Volume2,
  Square,
} from "lucide-react";

import {
  speakText,
  stopSpeaking,
} from "../utils/speakText";

function RoadmapGenerator() {

  const [topic, setTopic] = useState("");
  const [roadmap, setRoadmap] = useState("");
  const [loading, setLoading] = useState(false);

  const generateRoadmap = async () => {

    if (!topic) return;

    try {

      setLoading(true);

      const response = await axios.post(
        "https://edumate-backend-mpko.onrender.com/generate-roadmap",
        {
          topic,
        }
      );

      setRoadmap(response.data.roadmap);

    } catch (error) {

      console.error(error);

      setRoadmap("Failed to generate roadmap.");

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="bg-[#0d0d0d] border border-red-900 rounded-3xl p-8">

      {/* Header */}
      <div className="flex items-center gap-4 mb-6">

        <div className="bg-red-600/20 p-4 rounded-2xl">
          <Map className="text-red-500" size={34} />
        </div>

        <div>

          <h2 className="text-3xl font-bold text-red-500">
            AI Roadmap Generator
          </h2>

          <p className="text-gray-400 mt-2 text-base">
            Generate personalized AI-powered learning paths.
          </p>

        </div>

      </div>

      {/* Input */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">

        <input
          type="text"
          placeholder="Enter topic like AI/ML, Web Dev, Data Analyst..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="flex-1 bg-black border border-red-900 rounded-2xl px-5 py-3 text-base outline-none focus:border-red-500"
        />

        <button
          onClick={generateRoadmap}
          className="bg-red-600 hover:bg-red-700 transition px-6 py-3 rounded-2xl text-base font-semibold flex items-center gap-3"
        >

          <Sparkles size={20} />

          {loading ? "Generating..." : "Generate"}

        </button>

      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">

        <div className="bg-black border border-red-900 rounded-2xl p-5">

          <Rocket className="text-red-500 mb-3" size={26} />

          <h3 className="text-lg font-bold mb-2">
            Career Focused
          </h3>

          <p className="text-gray-400 text-sm">
            Structured roadmap from beginner to advanced.
          </p>

        </div>

        <div className="bg-black border border-red-900 rounded-2xl p-5">

          <Clock className="text-red-500 mb-3" size={26} />

          <h3 className="text-lg font-bold mb-2">
            Timelines Included
          </h3>

          <p className="text-gray-400 text-sm">
            AI estimates realistic learning durations.
          </p>

        </div>

        <div className="bg-black border border-red-900 rounded-2xl p-5">

          <BookOpen className="text-red-500 mb-3" size={26} />

          <h3 className="text-lg font-bold mb-2">
            Resources & Projects
          </h3>

          <p className="text-gray-400 text-sm">
            Includes project ideas and learning resources.
          </p>

        </div>

      </div>

      {/* Output */}
      {roadmap && (

        <div className="bg-black border border-red-900 rounded-3xl p-8">

          {/* Title */}
          <div className="flex items-center gap-3 mb-8">

            <Sparkles
              className="text-yellow-400"
              size={28}
            />

            <h3 className="text-3xl font-bold">
              Your AI Learning Roadmap
            </h3>

          </div>

          {/* Voice Buttons */}
          <div className="flex gap-4 mb-8">

            <button
              onClick={() => speakText(roadmap)}
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

          {/* Roadmap Content */}
          <div className="space-y-4 text-gray-300 text-lg leading-9">

            {roadmap
              .replace(/#/g, "")
              .replace(/\*\*/g, "")
              .split("\n")
              .map((line, index) => {

                const trimmed = line.trim();

                // Empty line
                if (!trimmed) {

                  return (
                    <div
                      key={index}
                      className="h-2"
                    ></div>
                  );
                }

                // MAIN HEADINGS ONLY
                if (
                  /^Beginner Level/i.test(trimmed) ||
                  /^Intermediate Level/i.test(trimmed) ||
                  /^Advanced Level/i.test(trimmed) ||
                  /^Career Opportunities/i.test(trimmed) ||
                  /^Resources$/i.test(trimmed)
                ) {

                  return (
                    <h2
                      key={index}
                      className="text-3xl font-bold text-red-500 mt-8"
                    >
                      {trimmed}
                    </h2>
                  );
                }

                // SUB HEADINGS
                if (
                  /^Topics/i.test(trimmed) ||
                  /^Projects/i.test(trimmed) ||
                  /^Skills/i.test(trimmed) ||
                  /^Timeline/i.test(trimmed) ||
                  /^Job/i.test(trimmed) ||
                  /^Industries/i.test(trimmed)
                ) {

                  return (
                    <h3
                      key={index}
                      className="text-2xl font-semibold text-white mt-6"
                    >
                      {trimmed}
                    </h3>
                  );
                }

                // BULLET POINTS
                if (
                  trimmed.startsWith("+") ||
                  trimmed.startsWith("-") ||
                  /^\d+\./.test(trimmed)
                ) {

                  return (
                    <div
                      key={index}
                      className="flex items-start gap-3 pl-4"
                    >

                      <div className="w-2 h-2 bg-red-500 rounded-full mt-4"></div>

                      <p>
                        {trimmed
                          .replace(/^\+/, "")
                          .replace(/^-/, "")
                        }
                      </p>

                    </div>
                  );
                }

                // NORMAL TEXT
                return (

                  <p
                    key={index}
                    className="text-gray-300"
                  >
                    {trimmed}
                  </p>

                );
              })}
          </div>

        </div>
      )}

    </div>
  );
}

export default RoadmapGenerator;