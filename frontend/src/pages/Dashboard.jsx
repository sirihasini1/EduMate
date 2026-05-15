import React from "react";

import {
  FileText,
  Brain,
  BookOpen,
  Video,
  Sparkles,
  Upload,
  Map,
  CalendarDays,
} from "lucide-react";

import UploadBox from "../components/UploadBox";
import PDFChat from "../components/PDFChat";
import QuizGenerator from "../components/QuizGenerator";
import Flashcards from "../components/Flashcards";
import YoutubeSummary from "../components/YoutubeSummary";
import RoadmapGenerator from "../components/RoadmapGenerator";
import StudyPlanner from "../components/StudyPlanner";

const Dashboard = () => {

  return (

    <div className="min-h-screen bg-black text-white flex">

      {/* Sidebar */}
      <div className="w-64 bg-[#0d0d0d] border-r border-red-900 p-6 fixed h-screen overflow-y-auto">

        {/* Logo */}
        <h1 className="text-5xl font-bold text-red-500 mb-12">
          EduMate
        </h1>

        {/* Navigation */}
        <div className="space-y-5 text-lg">

          <div className="bg-red-600 px-5 py-4 rounded-2xl font-semibold">
            Dashboard
          </div>

          <div className="flex items-center gap-4 text-gray-300 hover:text-red-400 transition cursor-pointer">
            <FileText size={22} />
            <span>Chat with PDFs</span>
          </div>

          <div className="flex items-center gap-4 text-gray-300 hover:text-red-400 transition cursor-pointer">
            <Brain size={22} />
            <span>AI Quizzes</span>
          </div>

          <div className="flex items-center gap-4 text-gray-300 hover:text-red-400 transition cursor-pointer">
            <BookOpen size={22} />
            <span>Flashcards</span>
          </div>

          <div className="flex items-center gap-4 text-gray-300 hover:text-red-400 transition cursor-pointer">
            <Map size={22} />
            <span>AI Roadmaps</span>
          </div>

          <div className="flex items-center gap-4 text-gray-300 hover:text-red-400 transition cursor-pointer">
            <CalendarDays size={22} />
            <span>Study Planner</span>
          </div>

          <div className="flex items-center gap-4 text-gray-300 hover:text-red-400 transition cursor-pointer">
            <Video size={22} />
            <span>YouTube Summaries</span>
          </div>

        </div>

      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1 p-10">

        {/* Header */}
        <div className="mb-14">

          <h1 className="text-5xl font-bold mb-4 flex items-center gap-3">

            Welcome Back

            <Sparkles
              className="text-yellow-400"
              size={38}
            />

          </h1>

          <p className="text-2xl text-gray-400">
            Continue your AI-powered learning journey.
          </p>

        </div>

        {/* Upload Section */}
        <div className="bg-[#0d0d0d] border border-red-900 rounded-3xl p-8 mb-14">

          <div className="flex items-center gap-3 mb-6">

            <Upload
              className="text-red-500"
              size={30}
            />

            <h2 className="text-3xl font-bold text-red-500">
              Upload Your Notes
            </h2>

          </div>

          <UploadBox />

        </div>

        {/* PDF Chat */}
        <div className="mb-14">
          <PDFChat />
        </div>

        {/* Quiz Generator */}
        <div className="mb-14">
          <QuizGenerator />
        </div>

        {/* Flashcards */}
        <div className="mb-14">
          <Flashcards />
        </div>

        {/* AI Roadmap Generator */}
        <div className="mb-14">
          <RoadmapGenerator />
        </div>

        {/* AI Study Planner */}
        <div className="mb-14">
          <StudyPlanner />
        </div>

        {/* YouTube Summary */}
        <div className="mb-14">
          <YoutubeSummary />
        </div>

      </div>

    </div>
  );
};

export default Dashboard;