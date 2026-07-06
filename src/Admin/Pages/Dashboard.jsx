import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import Sidebar from '../components/Sidebar'
import { FaUser, FaEnvelope, FaPhone, FaSignOutAlt } from 'react-icons/fa'
import { MdOutlineWavingHand, MdSpaceDashboard, MdWavingHand } from 'react-icons/md'

const Dashboard = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => {
    // localStorage se user data lo
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  // Logout function
  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure you want to logout?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#6366f1',
      cancelButtonColor: '#ef4444',
      confirmButtonText: 'Logout',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        navigate('/login')
      }
    })
  }

  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <Sidebar active="userinfo" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Top Bar */}
        <div className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">

          
          <h2 className="text-2xl font-bold flex items-center text-gray-700 tracking-wide">
            Dashboard <span><MdSpaceDashboard className='ml-2 text-[#751CDD] text-2xl'/></span>
          </h2>

         
           <button
            onClick={handleLogout}
            className="flex items-center cursor-pointer gap-2 px-4 py-2 bg-linear-to-r from-rose-400 to-amber-500 text-white rounded-xl font-medium transition"
          >
            <FaSignOutAlt />
            Logout
          </button>

        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8">

          
          <div className="mb-8">
            <h3 className="text-2xl font-bold flex items-center  text-gray-800">
              Hello, {user?.name}! <span><MdWavingHand className='ml-2 text-amber-500 text-3xl' /></span>
            </h3>
            <p className="text-gray-500 mt-1">
                Your profile information. 
            </p>
          </div>

          {/* User Info Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-xl">

            {/* Card Header */}
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
              <div className="w-16 h-16 rounded-full bg-linear-to-r from-purple-500 to-blue-500 flex items-center justify-center shadow-lg">
                <FaUser className="text-white text-2xl" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-800">{user?.name}</h4>
                <p className="text-gray-400 text-sm">Registered User</p>
              </div>
            </div>

            {/* Info Rows */}
            <div className="space-y-5">

              {/* Name */}
              <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  <FaUser className="text-purple-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
                    Full Name
                  </p>
                  <p className="text-gray-800 font-semibold">{user?.name}</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <FaEnvelope className="text-blue-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
                    Email Address
                  </p>
                  <p className="text-gray-800 font-semibold">{user?.email}</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-4 p-4 bg-pink-50 rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center">
                  <FaPhone className="text-pink-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
                    Phone Number
                  </p>
                  <p className="text-gray-800 font-semibold">{user?.phone}</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard