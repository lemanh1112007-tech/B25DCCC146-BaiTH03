import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('shopmini_user');
    if (!savedUser) return null;
    try {
      const parsed: User = JSON.parse(savedUser) as User;
      return parsed.username ? parsed : null;
    } catch {
      return null;
    }
  });

  const login = (username: string, password: string): boolean => {
    const trimmedUsername = username.trim();
    if (trimmedUsername !== '' && password === '123456') {
      const loggedInUser: User = { username: trimmedUsername };
      setUser(loggedInUser);
      localStorage.setItem('shopmini_user', JSON.stringify(loggedInUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('shopmini_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth phải được dùng bên trong AuthProvider');
  }
  return context;
}
