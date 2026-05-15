function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between px-10 py-5 bg-black/90 backdrop-blur-md border-b border-red-950">
      
      <h1 className="text-4xl font-bold text-red-600">
        EduMate
      </h1>

      <div className="hidden md:flex gap-10 text-white font-medium">
        <a href="#" className="hover:text-red-500 transition">Home</a>
        <a href="#" className="hover:text-red-500 transition">Features</a>
        <a href="#" className="hover:text-red-500 transition">About</a>
      </div>

      <button className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl text-white font-semibold transition">
        Get Started
      </button>
    </nav>
  )
}

export default Navbar