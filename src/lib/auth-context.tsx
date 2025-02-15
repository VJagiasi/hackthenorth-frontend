"use client"

import { createContext, useContext, useEffect, useState } from "react"

interface AuthContextType {
  isAuthenticated: boolean
  isLoading: boolean
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Clear any existing auth state on initial load
  useEffect(() => {
    // Clear localStorage on first visit
    if (typeof window !== 'undefined') {
      // Check if this is the first visit
      const hasVisited = sessionStorage.getItem('hasVisited')
      if (!hasVisited) {
        // First visit - clear any existing auth
        localStorage.removeItem('isAuthenticated')
        sessionStorage.setItem('hasVisited', 'true')
      } else {
        // Subsequent visits - check auth state
        const savedAuth = localStorage.getItem('isAuthenticated')
        setIsAuthenticated(savedAuth === 'true')
      }
      setIsLoading(false)
    }
  }, [])

  const login = async (username: string, password: string) => {
    if (username === "hacker" && password === "htn2025") {
      setIsAuthenticated(true)
      localStorage.setItem('isAuthenticated', 'true')
      return true
    }
    return false
  }

  const logout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('isAuthenticated')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

