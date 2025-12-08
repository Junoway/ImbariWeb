// components/AuthContext.tsx
"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isSubscribed: boolean;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (firstName: string, lastName: string, email: string, password: string) => Promise<boolean>;
  verifyEmail: (code: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [pendingVerification, setPendingVerification] = useState<{
    email: string;
    firstName: string;
    lastName: string;
    password: string;
  } | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("imbari_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const signup = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      // Store pending verification data
      setPendingVerification({ email, firstName, lastName, password });
      
      // In a real app, send verification email here
      // For now, we'll simulate it
      console.log("Verification code sent to:", email);
      
      return true;
    } catch (error) {
      console.error("Signup error:", error);
      return false;
    }
  };

  const verifyEmail = async (code: string): Promise<boolean> => {
    try {
      // In a real app, verify the code with backend
      // For demo, accept any 6-digit code
      if (code.length === 6 && pendingVerification) {
        const newUser: User = {
          id: Date.now().toString(),
          firstName: pendingVerification.firstName,
          lastName: pendingVerification.lastName,
          email: pendingVerification.email,
          isSubscribed: false,
        };
        
        setUser(newUser);
        localStorage.setItem("imbari_user", JSON.stringify(newUser));
        localStorage.setItem(
          `imbari_auth_${pendingVerification.email}`,
          pendingVerification.password
        );
        setPendingVerification(null);
        
        return true;
      }
      return false;
    } catch (error) {
      console.error("Verification error:", error);
      return false;
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // In a real app, authenticate with backend
      // For demo, check localStorage
      const storedPassword = localStorage.getItem(`imbari_auth_${email}`);
      
      if (storedPassword === password) {
        // Find user data (in real app, get from backend)
        const users = JSON.parse(localStorage.getItem("imbari_users") || "[]");
        let userData = users.find((u: User) => u.email === email);
        
        if (!userData) {
          // Create mock user if not found
          userData = {
            id: Date.now().toString(),
            firstName: "Arthur",
            lastName: "Kenrald",
            email: email,
            isSubscribed: false,
          };
        }
        
        setUser(userData);
        localStorage.setItem("imbari_user", JSON.stringify(userData));
        return true;
      }
      
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("imbari_user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        verifyEmail,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
