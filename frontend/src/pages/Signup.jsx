// src/pages/Signup.jsx

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

function Signup() {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSignup = async (e) => {

    e.preventDefault()

    try {

      setLoading(true)
      setError("")

      const response = await axios.post(
        "https://edumate-backend-mpko.onrender.com/register",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      console.log(response.data)

      alert("Signup successful")

      navigate("/login")

    } catch (error) {

      console.log(error)

      if (error.response?.data?.detail) {

        setError(error.response.data.detail)

      } else {

        setError(
          "Signup failed. Please try again."
        )

      }

    } finally {

      setLoading(false)

    }
  }

  return (

    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40 pointer-events-none"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop')",
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70 pointer-events-none" />

      {/* Logo */}
      <div className="absolute top-10 left-12 z-20">

        <h1 className="text-6xl font-extrabold text-red-600">
          EduMate
        </h1>

      </div>

      {/* Signup Card */}
      <div className="relative z-20 w-full max-w-md bg-black/75 backdrop-blur-md p-12 rounded-lg border border-gray-800 shadow-2xl">

        <h2 className="text-5xl font-bold text-white mb-10">
          Sign Up
        </h2>

        {/* Error */}
        {error && (

          <div className="bg-red-900/30 border border-red-700 text-red-300 px-4 py-3 rounded mb-6">
            {error}
          </div>

        )}

        <form
          onSubmit={handleSignup}
          className="space-y-6"
        >

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full p-4 rounded bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-red-600"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full p-4 rounded bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-red-600"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 transition duration-300 text-white font-bold py-4 rounded text-2xl cursor-pointer disabled:opacity-70"
          >

            {loading
              ? "Creating Account..."
              : "Sign Up"}

          </button>

        </form>

        <p className="text-gray-400 mt-8 text-lg">

          Already have an account?{" "}

          <Link
            to="/login"
            className="text-white hover:underline font-semibold"
          >
            Sign in
          </Link>

        </p>

      </div>

    </div>
  )
}

export default Signup