// components/AuthContext.tsx
"use client";

import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";

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

  /** Returns headers safe for fetch. Always Record<string,string> */
  authHeader: () => Record<string, string>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function safeParseUser(raw: string | null): User | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const API_BASE = useMemo(() => {
    return (
      process.env.NEXT_PUBLIC_API_URL ||
      process.env.NEXT_PUBLIC_API_BASE_URL ||
      "https://api.imbaricoffee.com"
    );
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedUser = safeParseUser(localStorage.getItem("imbari_user"));
    const storedToken = localStorage.getItem("imbari_token");

    if (storedUser) setUser(storedUser);
    if (storedToken) setToken(storedToken);
  }, []);

  function persist(nextUser: User | null, nextToken: string | null) {
    setUser(nextUser);
    setToken(nextToken);

    if (typeof window === "undefined") return;

    if (nextUser) localStorage.setItem("imbari_user", JSON.stringify(nextUser));
    else localStorage.removeItem("imbari_user");

    if (nextToken) localStorage.setItem("imbari_token", nextToken);
    else localStorage.removeItem("imbari_token");
  }

  const signup = async (firstName: string, lastName: string, email: string, password: string) => {
    try {
      const r = await fetch(`${API_BASE}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: String(firstName || "").trim(),
          lastName: String(lastName || "").trim(),
          email: String(email || "").trim().toLowerCase(),
          password,
        }),
      });

      return r.ok;
    } catch {
      return false;
    }
  };

  const verifyEmail = async (email: string, code: string) => {
    try {
      const r = await fetch(`${API_BASE}/api/auth/verify-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: String(email || "").trim().toLowerCase(),
          code: String(code || "").trim(),
        }),
      });

      return r.ok;
    } catch {
      return false;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const r = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: String(email || "").trim().toLowerCase(),
          password,
        }),
      });

      if (!r.ok) return false;

      const data = await r.json().catch(() => null);
      if (!data?.token || !data?.user?.email) return false;

      persist(data.user as User, String(data.token));
      return true;
    } catch {
      return false;
    }
  };

  const logout = () => {
    persist(null, null);
  };

  const authHeader = useMemo(() => {
    return () => {
      const headers: Record<string, string> = {};
      if (token) headers.Authorization = `Bearer ${token}`;
      return headers;
    };
  }, [token]);

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


