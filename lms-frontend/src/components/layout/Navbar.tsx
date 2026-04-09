import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

const activeClass = ({ isActive }: { isActive: boolean }) =>
  `rounded px-3 py-2 text-sm font-medium transition ${
    isActive ? 'bg-indigo-100 text-indigo-700' : 'text-slate-700 hover:bg-slate-100'
  }`

export const Navbar = () => {
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="text-lg font-semibold text-indigo-700">
          LMS Frontend
        </Link>

        <nav className="flex items-center gap-2">
          {isAuthenticated ? (
            <>
              <NavLink to="/dashboard" className={activeClass}>
                Dashboard
              </NavLink>
              <NavLink to="/courses" className={activeClass}>
                Courses
              </NavLink>
              <NavLink to="/profile" className={activeClass}>
                Profile
              </NavLink>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={activeClass}>
                Login
              </NavLink>
              <NavLink to="/register" className={activeClass}>
                Register
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
