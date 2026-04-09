import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card } from '../components/ui/Card'
import { ErrorAlert } from '../components/ui/ErrorAlert'
import { Loader } from '../components/ui/Loader'
import { courseService } from '../services/courseService'
import type { Course } from '../types/api'

export const CoursesPage = () => {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true)
      setError('')
      try {
        const response = await courseService.getCourses()
        setCourses(response)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load courses.')
      } finally {
        setLoading(false)
      }
    }
    fetchCourses()
  }, [])

  return (
    <section className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">Courses</h1>
        <p className="text-sm text-slate-600">Available courses from your backend.</p>
      </div>

      {loading && <Loader label="Loading courses..." />}
      {error && <ErrorAlert message={error} />}

      {!loading && !error && courses.length === 0 && (
        <Card>
          <p className="text-sm text-slate-600">No courses found yet.</p>
        </Card>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <Card key={course.id}>
            <h2 className="text-lg font-semibold">{course.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{course.description}</p>
            <Link
              to={`/courses/${course.id}`}
              className="mt-4 inline-block rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-500"
            >
              View Details
            </Link>
          </Card>
        ))}
      </div>
    </section>
  )
}
