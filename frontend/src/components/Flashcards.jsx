import { useState } from "react";
import axios from "axios";

export default function Flashcards() {

  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [flipped, setFlipped] = useState({});

  const generateFlashcards = async () => {

    try {

      setLoading(true);

      const response = await axios.get(
        "https://edumate-backend-mpko.onrender.com/generate-flashcards"
      );

      setFlashcards(
        response.data.flashcards || []
      );

      setFlipped({});

    } catch (error) {

      console.error(error);

      alert("Failed to generate flashcards");

    } finally {

      setLoading(false);
    }
  };

  const toggleCard = (index) => {

    setFlipped({
      ...flipped,
      [index]: !flipped[index]
    });
  };

  // CLEAN TEXT FUNCTION
  const cleanText = (text) => {

    return text
      ?.replace(/\*\*Card\s*\d+:\*\*/gi, "")
      ?.replace(/Card\s*\d+:/gi, "")
      ?.replace(/Card\s*\d+/gi, "")
      ?.replace(/\*\*/g, "")
      ?.trim();

  };

  return (

    <div className="bg-black border border-red-700 rounded-3xl p-8">

      <div className="flex justify-between items-center mb-8">

        <h2 className="text-4xl font-bold text-red-500">
          AI Flashcards
        </h2>

        <button
          onClick={generateFlashcards}
          className="bg-red-700 hover:bg-red-600 px-6 py-3 rounded-2xl text-white font-semibold"
        >
          {loading
            ? "Generating..."
            : "Generate Flashcards"}
        </button>

      </div>

      <div className="grid md:grid-cols-2 gap-8">

        {flashcards.map((card, index) => (

          <div
            key={index}
            onClick={() => toggleCard(index)}
            className="bg-neutral-900 border border-red-900 rounded-3xl p-8 cursor-pointer hover:scale-105 transition-all duration-300 min-h-[250px] flex flex-col justify-center"
          >

            {!flipped[index] ? (

              <div>

                <h3 className="text-red-500 text-2xl font-bold mb-6">
                  Question
                </h3>

                <p className="text-white text-xl leading-relaxed">
                  {cleanText(card.question)}
                </p>

              </div>

            ) : (

              <div>

                <h3 className="text-green-400 text-2xl font-bold mb-6">
                  Answer
                </h3>

                <p className="text-white text-xl leading-relaxed">
                  {cleanText(card.answer)}
                </p>

              </div>

            )}

          </div>

        ))}

      </div>

    </div>
  );
}