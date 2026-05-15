function Sidebar() {
  return (
    <div className="w-72 min-h-screen bg-zinc-950 border-r border-red-950 p-6">

      <h1 className="text-4xl font-bold text-red-600 mb-12">
        EduMate
      </h1>

      <div className="flex flex-col gap-4">

        <button className="bg-red-600 text-white px-5 py-4 rounded-2xl text-left font-semibold hover:bg-red-700 transition">
          Dashboard
        </button>

        <button className="hover:bg-zinc-900 px-5 py-4 rounded-2xl text-left transition text-gray-300">
          Chat with PDFs
        </button>

        <button className="hover:bg-zinc-900 px-5 py-4 rounded-2xl text-left transition text-gray-300">
          AI Quizzes
        </button>

        <button className="hover:bg-zinc-900 px-5 py-4 rounded-2xl text-left transition text-gray-300">
          Flashcards
        </button>

        <button className="hover:bg-zinc-900 px-5 py-4 rounded-2xl text-left transition text-gray-300">
          YouTube Summaries
        </button>

      </div>

    </div>
  )
}

export default Sidebar