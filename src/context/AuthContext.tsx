"use client"

import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { authenticate } from '@/lib/api/auth';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Initialize with false for server-side rendering
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Check localStorage after component mounts (client-side only)
  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    setIsAuthenticated(storedAuth === 'true');
    setIsInitialized(true);
  }, []);

  // Update localStorage when auth state changes, but only after initialization
  useEffect(() => {
    if (isInitialized) {
      if (isAuthenticated) {
        localStorage.setItem('isAuthenticated', 'true');
      } else {
        localStorage.removeItem('isAuthenticated');
      }
    }
  }, [isAuthenticated, isInitialized]);

  const login = useCallback(async (username: string, password: string) => {
    try {
      const success = await authenticate(username, password);
      if (success) {
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Authentication error:', error);
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
  }, []);

  // Don't render children until we've initialized from localStorage
  if (!isInitialized) {
    return null; // Or a loading spinner if you prefer
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 