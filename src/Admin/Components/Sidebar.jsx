import { FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Sidebar = ({ active }) => {
  return (
    <div className="h-screen w-64 bg-linear-to-b from-purple-700 to-blue-700 text-white flex flex-col shadow-2xl">

      {/* Logo */}
      <div className="p-6 border-b border-white/20">
        <h1 className="text-2xl font-bold tracking-wide">User Panel</h1>
        
      </div>

      {/* Nav Links */}
      <nav className="flex-1 p-4 space-y-2 mt-2">

        {/* User Info Link */}
        <Link
          to="/dashboard"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition font-medium
            ${active === 'userinfo'
              ? 'bg-white/30 text-white shadow'
              : 'hover:bg-white/20 text-white/80'
            }`}
        >
          <FaUser className="text-lg" />
          <span>User Info</span>
        </Link>

      </nav>

      {/* Bottom */}
      <div className="p-4 border-t border-white/20">
        <p className="text-white/40 text-xs text-center">© 2026 MyApp</p>
      </div>

    </div>
  )
}

export default Sidebar