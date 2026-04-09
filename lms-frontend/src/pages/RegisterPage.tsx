import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ErrorAlert } from '../components/ui/ErrorAlert'
import { useAuth } from '../hooks/useAuth'
import type { RegisterPayload } from '../types/api'

export const RegisterPage = () => {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [form, setForm] = useState<RegisterPayload>({
    name: '',
    email: '',
    password: '',
    role: 'student',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    try {
      await register(form)
      navigate('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="mb-1 text-2xl font-semibold">Register</h1>
      <p className="mb-5 text-sm text-slate-600">Create your account to start learning.</p>

      <form className="space-y-4" onSubmit={onSubmit}>
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Name</span>
          <input
            type="text"
            required
            minLength={2}
            value={form.name}
            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
            className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none ring-indigo-200 focus:ring"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-medium">Email</span>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
            className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none ring-indigo-200 focus:ring"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-medium">Password</span>
          <input
            type="password"
            required
            minLength={6}
            value={form.password}
            onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
            className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none ring-indigo-200 focus:ring"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-medium">Role</span>
          <select
            value={form.role}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, role: e.target.value as RegisterPayload['role'] }))
            }
            className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none ring-indigo-200 focus:ring"
          >
            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
          </select>
        </label>

        {error && <ErrorAlert message={error} />}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? 'Creating account...' : 'Register'}
        </button>
      </form>

      <p className="mt-4 text-sm text-slate-600">
        Already have an account?{' '}
        <Link className="font-medium text-indigo-700 hover:underline" to="/login">
          Login here
        </Link>
      </p>
    </div>
  )
}
