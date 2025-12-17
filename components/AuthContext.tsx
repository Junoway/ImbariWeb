// components/AuthContext.tsx
"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isSubscribed: boolean;
};

type AuthContextType = {
  user: User | null;
  token: string | null;

  login: (email: string, password: string) => Promise<boolean>;
  signup: (firstName: string, lastName: string, email: string, password: string) => Promise<boolean>;
  verifyEmail: (email: string, code: string) => Promise<boolean>;

  logout: () => void;

  isAuthenticated: boolean;

  authHeader: () => Record<string, string>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("imbari_user");
    const storedToken = localStorage.getItem("imbari_token");
    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedToken) setToken(storedToken);
  }, []);

  function persist(nextUser: User | null, nextToken: string | null) {
    setUser(nextUser);
    setToken(nextToken);

    if (nextUser) localStorage.setItem("imbari_user", JSON.stringify(nextUser));
    else localStorage.removeItem("imbari_user");

    if (nextToken) localStorage.setItem("imbari_token", nextToken);
    else localStorage.removeItem("imbari_token");
  }

  const signup = async (firstName: string, lastName: string, email: string, password: string) => {
    try {
      const r = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });
      return r.ok;
    } catch {
      return false;
    }
  };

  const verifyEmail = async (email: string, code: string) => {
    try {
      const r = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      return r.ok;
    } catch {
      return false;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const r = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!r.ok) return false;
      const data = await r.json();

      if (!data?.token || !data?.user?.email) return false;

      persist(data.user, data.token);
      return true;
    } catch {
      return false;
    }
  };

  const logout = () => {
    persist(null, null);
  };

  const authHeader = () => (token ? { Authorization: `Bearer ${token}` } : {});

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        signup,
        verifyEmail,
        logout,
        isAuthenticated: !!user,
        authHeader,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

