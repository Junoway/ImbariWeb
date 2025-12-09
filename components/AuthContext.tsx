// components/AuthContext.tsx
"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { maskEmailForLogging } from "@/lib/utils";

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
      console.log('🔐 Starting signup process for:', maskEmailForLogging(email));
      
      // Generate verification code
      const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
      console.log('✅ Generated verification code:', process.env.NODE_ENV === 'development' ? verificationCode : '[REDACTED]');
      
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
      console.log('✅ Stored pending verification data in localStorage');
      
      // Send verification email via EmailJS
      console.log('📧 Attempting to send verification email...');
      try {
        const { sendVerificationEmail } = await import("@/lib/emailService");
        const emailSent = await sendVerificationEmail(email, firstName, verificationCode);
        if (!emailSent) {
          console.error("❌ Failed to send verification email");
          console.warn("⚠️ Proceeding with signup anyway for demo purposes");
          console.warn("⚠️ User should check spam folder or use console verification code");
          // Still allow signup to proceed for demo purposes
        } else {
          console.log('✅ Verification email sent successfully!');
        }
      } catch (error) {
        console.error("❌ Error sending verification email:", error);
        console.warn("⚠️ Proceeding with signup anyway for demo purposes");
        console.warn("⚠️ User should check spam folder or use console verification code");
        // Still allow signup to proceed for demo purposes
      }
      
      // Log verification code for testing in development only
      if (process.env.NODE_ENV === 'development') {
        console.log(`📋 Verification code for ${email}: ${verificationCode}`);
      } else {
        console.log('📋 Verification code sent to email (check inbox/spam folder)');
      }
      console.log('✅ Signup process completed successfully');
      
      return true;
    } catch (error) {
      console.error("❌ Signup error:", error);
      return false;
    }
  };

  const verifyEmail = async (code: string): Promise<boolean> => {
    try {
      console.log('🔍 Verifying email with code...');
      console.log('📋 Pending verification data:', pendingVerification ? {
        email: maskEmailForLogging(pendingVerification.email),
        hasCode: !!pendingVerification.verificationCode
      } : 'None');
      
      if (code.length === 6 && pendingVerification) {
        // Check if code matches the sent verification code
        if (pendingVerification.verificationCode && code !== pendingVerification.verificationCode) {
          console.error("❌ Invalid verification code - code does not match");
          return false;
        }
        
        console.log('✅ Verification code matches!');
        
        const newUser: User = {
          id: Date.now().toString(),
          firstName: pendingVerification.firstName,
          lastName: pendingVerification.lastName,
          email: pendingVerification.email,
          isSubscribed: false,
        };
        
        console.log('✅ Creating new user:', maskEmailForLogging(newUser.email));
        
        setUser(newUser);
        localStorage.setItem("imbari_user", JSON.stringify(newUser));
        localStorage.setItem(
          `imbari_auth_${pendingVerification.email}`,
          pendingVerification.password
        );
        localStorage.removeItem("imbari_pending_verification");
        setPendingVerification(null);
        
        console.log('✅ Email verification completed successfully!');
        return true;
      }
      console.error('❌ Verification failed: Invalid code length or no pending verification');
      return false;
    } catch (error) {
      console.error("❌ Verification error:", error);
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
