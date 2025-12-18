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

  /**
   * Returns headers safe for fetch/axios. Always satisfies Record<string,string>.
   * Only includes Authorization when a token is present.
   */
  authHeader: () => Record<string, string>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Optional: allow either localStorage or sessionStorage without breaking existing users.
// If you only want localStorage, keep as-is.
function getStoredAuth(): { user: User | null; token: string | null } {
  if (typeof window === "undefined") return { user: null, token: null };

  // Prefer your canonical keys; keep compatibility with earlier keys if you used them.
  const rawUser =
    localStorage.getItem("imbari_user") ||
    sessionStorage.getItem("imbari_user") ||
    localStorage.getItem("user") ||
    sessionStorage.getItem("user");

  const rawToken =
    localStorage.getItem("imbari_token") ||
    sessionStorage.getItem("imbari_token") ||
    localStorage.getItem("token") ||
    sessionStorage.getItem("token") ||
    localStorage.getItem("jwt") ||
    sessionStorage.getItem("jwt");

  let parsedUser: User | null = null;
  if (rawUser) {
    try {
      parsedUser = JSON.parse(rawUser) as User;
    } catch {
      parsedUser = null;
    }
  }

  return {
    user: parsedUser,
    token: rawToken || null,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Load persisted auth state once on mount
  useEffect(() => {
    const stored = getStoredAuth();
    if (stored.user) setUser(stored.user);
    if (stored.token) setToken(stored.token);
  }, []);

  function persist(nextUser: User | null, nextToken: string | null) {
    setUser(nextUser);
    setToken(nextToken);

    if (typeof window === "undefined") return;

    if (nextUser) {
      localStorage.setItem("imbari_user", JSON.stringify(nextUser));
      // optional: keep other legacy keys clean
      // sessionStorage.removeItem("imbari_user");
    } else {
      localStorage.removeItem("imbari_user");
      sessionStorage.removeItem("imbari_user");
      localStorage.removeItem("user");
      sessionStorage.removeItem("user");
    }

    if (nextToken) {
      localStorage.setItem("imbari_token", nextToken);
      // optional: keep other legacy keys clean
      // sessionStorage.removeItem("imbari_token");
    } else {
      localStorage.removeItem("imbari_token");
      sessionStorage.removeItem("imbari_token");
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      localStorage.removeItem("jwt");
      sessionStorage.removeItem("jwt");
    }
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

  /**
   * IMPORTANT:
   * This must always return Record<string,string> (no union with undefined).
   * This avoids the exact build error you hit.
   */
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

