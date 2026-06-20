import { create } from 'zustand'

type User = {
  id: number
  email: string
  username: string
}

type AuthStore = {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (user: User, token: string) => void
  logout: () => void
}

function getInitialState(): Pick<AuthStore, 'user' | 'token' | 'isAuthenticated'> {
  try {
    const token = localStorage.getItem('token')
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]))
      return {
        token,
        user: { id: payload.id, email: payload.email, username: payload.username },
        isAuthenticated: true,
      }
    }
  } catch {
    localStorage.removeItem('token')
  }
  return { user: null, token: null, isAuthenticated: false }
}

export const useAuthStore = create<AuthStore>((set) => ({
  ...getInitialState(),

  login: (user, token) => {
    localStorage.setItem('token', token)
    set({ user, token, isAuthenticated: true })
  },

  logout: () => {
    localStorage.removeItem('token')
    set({ user: null, token: null, isAuthenticated: false })
  }
}))