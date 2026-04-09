import { Link } from 'react-router-dom'
import { Card } from '../components/ui/Card'
import { useAuth } from '../hooks/useAuth'

export const DashboardPage = () => {
  const { user } = useAuth()

  return (
    <div className="space-y-4">
      <Card>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="mt-2 text-slate-600">
          Welcome, <span className="font-medium">{user?.name ?? 'Learner'}</span>. You are logged in as{' '}
          <span className="font-medium">{user?.role ?? 'student'}</span>.
        </p>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <h2 className="text-lg font-semibold">Explore Courses</h2>
          <p className="mt-2 text-sm text-slate-600">Browse available courses and enroll with one click.</p>
          <Link
            to="/courses"
            className="mt-4 inline-block rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-500"
          >
            Go to Courses
          </Link>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold">Profile</h2>
          <p className="mt-2 text-sm text-slate-600">Review your account details and session information.</p>
          <Link
            to="/profile"
            className="mt-4 inline-block rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-700"
          >
            View Profile
          </Link>
        </Card>
      </div>
    </div>
  )
}
