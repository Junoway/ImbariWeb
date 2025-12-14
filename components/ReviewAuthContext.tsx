"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type ReviewUser = {
  name: string;
  email: string;
};

type ReviewAuthContextType = {
  user: ReviewUser | null;
  login: (name: string, email: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
};

const ReviewAuthContext = createContext<ReviewAuthContextType | undefined>(undefined);

export function ReviewAuthProvider({ children }: { children: ReactNode }) {
  // Initialize user from localStorage immediately to avoid flash
  const [user, setUser] = useState<ReviewUser | null>(() => {
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('reviewUser');
      if (savedUser) {
        try {
          return JSON.parse(savedUser);
        } catch {
          return null;
        }
      }
    }
    return null;
  });

  const login = (name: string, email: string) => {
    const userData = { name, email };
    setUser(userData);
    localStorage.setItem('reviewUser', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('reviewUser');
  };

  return (
    <ReviewAuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated: !!user,
    }}>
      {children}
    </ReviewAuthContext.Provider>
  );
}

export function useReviewAuth() {
  const context = useContext(ReviewAuthContext);
  if (context === undefined) {
    throw new Error('useReviewAuth must be used within ReviewAuthProvider');
  }
  return context;
}

