import Navbar from "../components/Navbar"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"

function Home() {

  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">

      <Navbar />

      {/* Hero Section */}
      <div className="relative flex flex-col items-center justify-center text-center px-6 py-32">

        {/* Background Glow */}
        <div className="absolute w-[500px] h-[500px] bg-red-600/20 blur-[140px] rounded-full top-20"></div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="border border-red-800 bg-red-950/30 text-red-400 px-5 py-2 rounded-full mb-8 z-10"
        >
          AI that studies with you
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-8xl font-extrabold max-w-5xl leading-tight z-10"
        >
          Your AI Powered
          <span className="text-red-600"> Study Companion</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-400 text-xl mt-8 max-w-3xl z-10 leading-relaxed"
        >
          Chat with PDFs, generate quizzes, create flashcards,
          summarize YouTube lectures, generate roadmaps,
          create study planners, and study smarter with AI.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col md:flex-row gap-5 mt-12 z-10"
        >

          <button
            onClick={() => navigate("/login")}
            className="bg-red-600 hover:bg-red-700 px-8 py-4 rounded-2xl text-lg font-semibold transition shadow-lg shadow-red-900/30"
          >
            Get Started
          </button>

          <button
            onClick={() => navigate("/register")}
            className="border border-red-800 hover:border-red-600 px-8 py-4 rounded-2xl text-lg font-semibold transition"
          >
            Create Account
          </button>

        </motion.div>

      </div>

      {/* Features Section */}
      <div className="px-8 md:px-20 py-24">

        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="text-5xl font-bold text-center mb-16"
        >
          Why Students
          <span className="text-red-600"> Love EduMate</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {[
            {
              emoji: "📄",
              title: "Chat with PDFs",
              text: "Upload your notes and interact with them using AI-powered conversations.",
            },
            {
              emoji: "🧠",
              title: "AI Quizzes",
              text: "Generate smart quizzes automatically from your uploaded study material.",
            },
            {
              emoji: "⚡",
              title: "Flashcards",
              text: "Create quick revision flashcards instantly for better memory retention.",
            },
            {
              emoji: "🎥",
              title: "YouTube Summaries",
              text: "Convert long educational videos into short and easy AI summaries.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.03 }}
              className="border border-red-950 bg-zinc-950 hover:border-red-700 transition rounded-3xl p-8"
            >

              <div className="w-14 h-14 rounded-2xl bg-red-600/10 flex items-center justify-center mb-6 text-3xl">
                {feature.emoji}
              </div>

              <h3 className="text-2xl font-bold mb-4 text-red-500">
                {feature.title}
              </h3>

              <p className="text-gray-400 leading-relaxed">
                {feature.text}
              </p>

            </motion.div>
          ))}

        </div>

      </div>

    </div>
  )
}

export default Home