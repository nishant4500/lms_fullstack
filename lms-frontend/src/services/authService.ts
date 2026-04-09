import { AxiosError } from 'axios'
import type { AuthResponse, LoginPayload, RegisterPayload, User } from '../types/api'
import { TOKEN_KEY, USER_KEY, http } from './http'

const getErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) {
    return error.response?.data?.detail?.[0]?.msg || error.response?.data?.detail || error.message
  }
  return 'Something went wrong. Please try again.'
}

const extractToken = (payload: Record<string, unknown>) => {
  return (
    (payload.token as string | undefined) ||
    (payload.access_token as string | undefined) ||
    (payload.jwt as string | undefined) ||
    ''
  )
}

const extractUser = (payload: Record<string, unknown>): User | undefined => {
  const user = payload.user as User | undefined
  if (user?.email) return user

  const fallbackEmail = payload.email as string | undefined
  const fallbackName = payload.name as string | undefined
  const fallbackRole = payload.role as string | undefined

  if (!fallbackEmail) return undefined
  return {
    email: fallbackEmail,
    name: fallbackName ?? 'User',
    role: fallbackRole ?? 'student',
  }
}

const saveSession = (auth: AuthResponse) => {
  localStorage.setItem(TOKEN_KEY, auth.token)
  if (auth.user) {
    localStorage.setItem(USER_KEY, JSON.stringify(auth.user))
  }
}

export const getSavedUser = (): User | null => {
  const raw = localStorage.getItem(USER_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as User
  } catch {
    return null
  }
}

export const authService = {
  async login(payload: LoginPayload): Promise<AuthResponse> {
    try {
      const { data } = await http.post<Record<string, unknown>>('/login', payload)
      const auth: AuthResponse = {
        token: extractToken(data),
        user: extractUser(data),
      }
      if (!auth.token) throw new Error('Token not found in login response.')
      saveSession(auth)
      return auth
    } catch (error) {
      throw new Error(getErrorMessage(error))
    }
  },

  async register(payload: RegisterPayload): Promise<AuthResponse> {
    try {
      const { data } = await http.post<Record<string, unknown>>('/register', payload)
      const auth: AuthResponse = {
        token: extractToken(data),
        user: extractUser(data) ?? {
          name: payload.name,
          email: payload.email,
          role: payload.role,
        },
      }
      if (!auth.token) throw new Error('Token not found in register response.')
      saveSession(auth)
      return auth
    } catch (error) {
      throw new Error(getErrorMessage(error))
    }
  },

  logout() {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
  },
}
