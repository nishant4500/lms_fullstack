import { Card } from '../components/ui/Card'
import { useAuth } from '../hooks/useAuth'

export const ProfilePage = () => {
  const { user, token } = useAuth()

  return (
    <section className="max-w-2xl">
      <Card>
        <h1 className="text-2xl font-semibold">Profile</h1>
        <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
          <div className="rounded-md bg-slate-50 p-3">
            <p className="text-slate-500">Name</p>
            <p className="font-medium">{user?.name ?? 'N/A'}</p>
          </div>
          <div className="rounded-md bg-slate-50 p-3">
            <p className="text-slate-500">Email</p>
            <p className="font-medium">{user?.email ?? 'N/A'}</p>
          </div>
          <div className="rounded-md bg-slate-50 p-3">
            <p className="text-slate-500">Role</p>
            <p className="font-medium capitalize">{user?.role ?? 'N/A'}</p>
          </div>
          <div className="rounded-md bg-slate-50 p-3">
            <p className="text-slate-500">Session</p>
            <p className="font-medium">{token ? 'Active' : 'Inactive'}</p>
          </div>
        </div>
      </Card>
    </section>
  )
}
