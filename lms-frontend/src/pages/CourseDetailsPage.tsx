import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Card } from '../components/ui/Card'
import { ErrorAlert } from '../components/ui/ErrorAlert'
import { Loader } from '../components/ui/Loader'
import { courseService } from '../services/courseService'
import type { Course, Module } from '../types/api'

export const CourseDetailsPage = () => {
  const { id } = useParams()
  const courseId = Number(id)
  const [course, setCourse] = useState<Course | null>(null)
  const [modules, setModules] = useState<Module[]>([])
  const [loading, setLoading] = useState(true)
  const [enrollLoading, setEnrollLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const invalidId = useMemo(() => Number.isNaN(courseId) || courseId <= 0, [courseId])

  useEffect(() => {
    if (invalidId) {
      setLoading(false)
      setError('Invalid course id.')
      return
    }

    const fetchDetails = async () => {
      setLoading(true)
      setError('')
      try {
        const [allCourses, courseModules] = await Promise.all([
          courseService.getCourses(),
          courseService.getCourseModules(courseId),
        ])
        setCourse(allCourses.find((item) => item.id === courseId) ?? null)
        setModules(courseModules)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load course details.')
      } finally {
        setLoading(false)
      }
    }

    fetchDetails()
  }, [courseId, invalidId])

  const handleEnroll = async () => {
    setEnrollLoading(true)
    setError('')
    setMessage('')
    try {
      const responseMessage = await courseService.enrollInCourse(courseId)
      setMessage(responseMessage)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Enrollment failed.')
    } finally {
      setEnrollLoading(false)
    }
  }

  if (loading) return <Loader label="Loading course details..." />

  return (
    <section className="space-y-4">
      <Link to="/courses" className="text-sm font-medium text-indigo-700 hover:underline">
        Back to courses
      </Link>

      <Card>
        <h1 className="text-2xl font-semibold">{course?.title ?? `Course #${courseId}`}</h1>
        <p className="mt-2 text-slate-600">{course?.description ?? 'Course description unavailable.'}</p>
        <button
          type="button"
          onClick={handleEnroll}
          disabled={enrollLoading}
          className="mt-4 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {enrollLoading ? 'Enrolling...' : 'Enroll in Course'}
        </button>
        {message && <p className="mt-3 text-sm text-green-700">{message}</p>}
      </Card>

      {error && <ErrorAlert message={error} />}

      <Card>
        <h2 className="text-lg font-semibold">Modules</h2>
        {modules.length === 0 ? (
          <p className="mt-2 text-sm text-slate-600">No modules available for this course.</p>
        ) : (
          <div className="mt-3 space-y-3">
            {modules.map((module) => (
              <div key={module.id} className="rounded-md border border-slate-200 p-3">
                <h3 className="font-medium">{module.title}</h3>
                <p className="mt-1 whitespace-pre-wrap text-sm text-slate-600">{module.content}</p>
              </div>
            ))}
          </div>
        )}
      </Card>
    </section>
  )
}
