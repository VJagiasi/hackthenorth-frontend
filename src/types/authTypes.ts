export interface User {
  username: string;
  isAuthenticated: boolean;
}

export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export interface LoginCredentials {
  username: string;
  password: string;
} 