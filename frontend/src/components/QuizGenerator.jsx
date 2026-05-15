import { useState } from "react";
import axios from "axios";
import { Volume2, Square } from "lucide-react"
import { speakText, stopSpeaking } from "../utils/speakText"

export default function QuizGenerator() {

  const [quiz, setQuiz] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);

  const parseQuiz = (text) => {

    const blocks = text.split(/Q\d+:/).filter(Boolean);

    const parsedQuiz = blocks.map((block) => {

      const lines = block
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);

      const question = lines[0];

      const options = lines.filter(
        (line) =>
          line.startsWith("A)") ||
          line.startsWith("B)") ||
          line.startsWith("C)") ||
          line.startsWith("D)")
      );

      const answerLine = lines.find(
        (line) =>
          line.toLowerCase().startsWith("answer:")
      );

      const explanationLine = lines.find(
        (line) =>
          line.toLowerCase().startsWith("explanation:")
      );

      let correctAnswer = "";

      if (answerLine) {

        const match = answerLine.match(
          /Answer:\s*([A-D])/i
        );

        if (match) {
          correctAnswer = match[1].toUpperCase();
        }
      }

      return {
        question,
        options,
        correctAnswer,
        explanation: explanationLine
          ? explanationLine.replace(/Explanation:/i, "").trim()
          : "",
      };
    });

    return parsedQuiz;
  };

  const generateQuiz = async () => {

    try {

      setLoading(true);

      const response = await axios.get(
        "http://127.0.0.1:8000/generate-quiz"
      );

      const parsedQuiz = parseQuiz(
        response.data.quiz
      );

      setQuiz(parsedQuiz);

      setSelectedAnswers({});
      setSubmitted(false);
      setScore(0);

    } catch (error) {

      console.error(error);

      alert("Failed to generate quiz");

    } finally {

      setLoading(false);
    }
  };

  const handleOptionClick = (
    questionIndex,
    option
  ) => {

    if (submitted) return;

    const answerLetter = option.charAt(0);

    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: answerLetter,
    });
  };

  const submitQuiz = () => {

    let total = 0;

    quiz.forEach((q, index) => {

      if (
        selectedAnswers[index] ===
        q.correctAnswer
      ) {
        total++;
      }
    });

    setScore(total);
    setSubmitted(true);
  };

  const getOptionClass = (
    questionIndex,
    option
  ) => {

    const optionLetter = option.charAt(0);

    const selected =
      selectedAnswers[questionIndex];

    const correct =
      quiz[questionIndex].correctAnswer;

    if (!submitted) {

      if (selected === optionLetter) {
        return "bg-red-700";
      }

      return "bg-neutral-800 hover:bg-neutral-700";
    }

    if (optionLetter === correct) {
      return "bg-green-600";
    }

    if (
      selected === optionLetter &&
      selected !== correct
    ) {
      return "bg-red-600";
    }

    return "bg-neutral-800";
  };

  return (
    <div className="bg-black border border-red-700 rounded-3xl p-8">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-4xl font-bold text-red-500">
          Interactive AI Quiz
        </h2>

        <button
          onClick={generateQuiz}
          className="bg-red-700 hover:bg-red-600 px-6 py-3 rounded-2xl text-white font-semibold"
        >
          {loading
            ? "Generating..."
            : "Generate Quiz"}
        </button>

      </div>

      <div className="space-y-8">

        {quiz.map((item, index) => (

          <div
            key={index}
            className="bg-neutral-900 p-6 rounded-2xl border border-red-900"
          >

            <h3 className="text-2xl font-bold text-white mb-6">
              Question {index + 1}
            </h3>

            <p className="text-white text-xl mb-6">
              {item.question}
            </p>

            <div className="space-y-4">

              {item.options.map(
                (option, optionIndex) => (

                  <button
                    key={optionIndex}
                    onClick={() =>
                      handleOptionClick(
                        index,
                        option
                      )
                    }
                    className={`w-full text-left p-5 rounded-2xl text-white text-xl transition-all duration-300 ${getOptionClass(
                      index,
                      option
                    )}`}
                  >
                    {option}
                  </button>
                )
              )}

            </div>

            {submitted && (

              <div className="mt-6">

                {selectedAnswers[index] ===
                item.correctAnswer ? (

                  <div className="text-green-400 text-2xl font-bold">
                    ✅ Correct Answer
                  </div>

                ) : (

                  <div>

                    <div className="text-red-400 text-2xl font-bold">
                      ❌ Wrong Answer
                    </div>

                    <div className="text-white text-xl mt-3">
                      Correct Answer:{" "}
                      <span className="text-green-400 font-bold">
                        {item.correctAnswer}
                      </span>
                    </div>

                  </div>
                )}

                {item.explanation && (

                  <div className="mt-4 text-lg text-gray-300">
                    <span className="text-red-400 font-bold">
                      Explanation:
                    </span>{" "}
                    {item.explanation}
                  </div>
                )}

              </div>
            )}

          </div>
        ))}

      </div>

      {quiz.length > 0 && !submitted && (

        <div className="flex justify-center mt-10">

          <button
            onClick={submitQuiz}
            className="bg-green-600 hover:bg-green-500 px-10 py-4 rounded-2xl text-white text-2xl font-bold"
          >
            Submit Quiz
          </button>

        </div>
      )}

      {submitted && (

        <div className="text-center mt-10">

          <h2 className="text-6xl font-bold text-green-400">
            Score: {score} / {quiz.length}
          </h2>

        </div>
      )}

    </div>
  );
}