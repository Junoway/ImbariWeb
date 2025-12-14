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

// Backdoor test account - DO NOT commit to production!
const TEST_ACCOUNT = {
  email: "imbaricoffee@gmail.com",
  password: "Coffee2025!",
  firstName: "Arthur",
  lastName: "Kenrald",
  isSubscribed: true,
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (firstName: string, lastName: string, email: string, password: string) => Promise<boolean>;
  verifyEmail: (code: string) => Promise<boolean>;
  logout: () => void;
  toggleSubscription: () => void;
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
    verificationCode?: string;
  } | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("imbari_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    // Load pending verification if exists
    const pending = localStorage.getItem("imbari_pending_verification");
    if (pending) {
      setPendingVerification(JSON.parse(pending));
    }
  }, []);

  const signup = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      // Generate verification code
      const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
      
      // Store pending verification data with code
      const pendingData = { 
        email, 
        firstName, 
        lastName, 
        password,
        verificationCode 
      };
      setPendingVerification(pendingData);
      localStorage.setItem("imbari_pending_verification", JSON.stringify(pendingData));
      
      // Send verification email via EmailJS
      try {
        const { sendVerificationEmail } = await import("@/lib/emailService");
        const emailSent = await sendVerificationEmail(email, firstName, verificationCode);
        if (!emailSent) {
          console.error("Failed to send verification email");
          // Still allow signup to proceed for demo purposes
        }
      } catch (error) {
        console.error("Error sending verification email:", error);
        // Still allow signup to proceed for demo purposes
      }
      
      console.log(`Verification code for ${email}: ${verificationCode}`);
      
      return true;
    } catch (error) {
      console.error("Signup error:", error);
      return false;
    }
  };

  const verifyEmail = async (code: string): Promise<boolean> => {
    try {
      if (code.length === 6 && pendingVerification) {
        // Check if code matches the sent verification code
        if (pendingVerification.verificationCode && code !== pendingVerification.verificationCode) {
          console.error("Invalid verification code");
          return false;
        }
        
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
        localStorage.removeItem("imbari_pending_verification");
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

  const toggleSubscription = () => {
    if (user) {
      const updatedUser = { ...user, isSubscribed: !user.isSubscribed };
      setUser(updatedUser);
      localStorage.setItem("imbari_user", JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        verifyEmail,
        logout,
        toggleSubscription,
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

