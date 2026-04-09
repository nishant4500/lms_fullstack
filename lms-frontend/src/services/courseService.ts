import { AxiosError } from 'axios'
import type { Course, Module } from '../types/api'
import { http } from './http'

const getErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) {
    return error.response?.data?.detail?.[0]?.msg || error.response?.data?.detail || error.message
  }
  return 'Something went wrong. Please try again.'
}

export const courseService = {
  async getCourses(): Promise<Course[]> {
    try {
      const { data } = await http.get<Course[]>('/courses')
      return data
    } catch (error) {
      throw new Error(getErrorMessage(error))
    }
  },

  async getCourseModules(courseId: number): Promise<Module[]> {
    try {
      const { data } = await http.get<Module[]>(`/modules/${courseId}`)
      return data
    } catch (error) {
      throw new Error(getErrorMessage(error))
    }
  },

  async enrollInCourse(courseId: number): Promise<string> {
    try {
      const { data } = await http.post<{ message?: string }>(`/courses/${courseId}/enroll`)
      return data?.message ?? 'Enrollment successful.'
    } catch (error) {
      throw new Error(getErrorMessage(error))
    }
  },
}
