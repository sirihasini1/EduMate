// src/pages/Login.jsx

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { motion } from "framer-motion"

function Login() {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e) => {

    e.preventDefault()

    try {

      setLoading(true)
      setError("")

      const response = await axios.post(
        "https://edumate-backend-mpko.onrender.com/login",
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

      localStorage.setItem(
        "token",
        response.data.access_token
      )

      navigate("/dashboard")

    } catch (error) {

      console.log(error)

      if (error.response?.data?.detail) {

        setError(error.response.data.detail)

      } else {

        setError(
          "Invalid email or password"
        )

      }

    } finally {

      setLoading(false)

    }
  }

  return (

    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black px-6">

      {/* Background Glow */}
      <div className="absolute w-[600px] h-[600px] bg-red-600/20 blur-[160px] rounded-full"></div>

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop')",
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/80"></div>

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-10 left-10 z-20"
      >

        <Link to="/">
          <h1 className="text-5xl font-extrabold text-red-600 hover:text-red-500 transition">
            EduMate
          </h1>
        </Link>

      </motion.div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-20 w-full max-w-md bg-[#0d0d0d]/95 backdrop-blur-xl p-10 rounded-3xl border border-red-900 shadow-2xl"
      >

        {/* Heading */}
        <div className="mb-10">

          <h2 className="text-5xl font-bold text-white mb-3">
            Welcome Back
          </h2>

          <p className="text-gray-400 text-lg">
            Sign in to continue your AI learning journey.
          </p>

        </div>

        {/* Error */}
        {error && (

          <div className="bg-red-950 border border-red-800 text-red-300 px-4 py-3 rounded-2xl mb-6">
            {error}
          </div>

        )}

        {/* Form */}
        <form
          onSubmit={handleLogin}
          className="space-y-6"
        >

          <div>

            <label className="block text-gray-300 mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full p-4 rounded-2xl bg-black text-white border border-red-900 focus:outline-none focus:border-red-500 transition"
              required
            />

          </div>

          <div>

            <label className="block text-gray-300 mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full p-4 rounded-2xl bg-black text-white border border-red-900 focus:outline-none focus:border-red-500 transition"
              required
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 transition duration-300 text-white font-bold py-4 rounded-2xl text-xl cursor-pointer shadow-lg shadow-red-900/30 disabled:opacity-70"
          >

            {loading
              ? "Signing In..."
              : "Sign In"}

          </button>

        </form>

        {/* Footer */}
        <p className="text-gray-400 mt-8 text-lg text-center">

          New to EduMate?{" "}

          <Link
            to="/register"
            className="text-red-500 hover:text-red-400 font-semibold transition"
          >
            Create an account
          </Link>

        </p>

      </motion.div>

    </div>
  )
}

export default Login