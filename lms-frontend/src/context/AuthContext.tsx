import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { LoginPayload, RegisterPayload, User } from '../types/api'
import { authService, getSavedUser } from '../services/authService'
import { TOKEN_KEY } from '../services/http'
import { AuthContext } from './authContextValue'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY))
  const [user, setUser] = useState<User | null>(() => getSavedUser())

  const login = async (payload: LoginPayload) => {
    const auth = await authService.login(payload)
    setToken(auth.token)
    setUser(auth.user ?? null)
  }

  const register = async (payload: RegisterPayload) => {
    const auth = await authService.register(payload)
    setToken(auth.token)
    setUser(auth.user ?? null)
  }

  const logout = () => {
    authService.logout()
    setToken(null)
    setUser(null)
  }

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token),
      login,
      register,
      logout,
    }),
    [user, token],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
