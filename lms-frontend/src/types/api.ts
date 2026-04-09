export interface User {
  id?: number
  name: string
  email: string
  role: 'student' | 'instructor' | string
}

export interface AuthResponse {
  token: string
  user?: User
}

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload extends LoginPayload {
  name: string
  role: 'student' | 'instructor'
}

export interface Course {
  id: number
  title: string
  description: string
  created_at?: string
}

export interface Module {
  id: number
  title: string
  content: string
  course_id: number
}
