"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type { User } from "@/types";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<Pick<User, "name" | "email" | "bio" | "phone" | "location">>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_USER: User = {
  id: "1",
  name: "Alex Johnson",
  email: "admin@dashboardpro.com",
  avatar: "/avatars/admin.jpg",
  role: "admin",
  status: "active",
  joinedDate: "2024-01-15",
  bio: "Dashboard administrator",
  location: "San Francisco, CA",
};

const MOCK_PASSWORD = "password123";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for existing session
    const storedAuth = localStorage.getItem("auth_user");
    if (storedAuth) {
      try {
        setUser(JSON.parse(storedAuth));
      } catch {
        localStorage.removeItem("auth_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (email === MOCK_USER.email && password === MOCK_PASSWORD) {
      setUser(MOCK_USER);
      localStorage.setItem("auth_user", JSON.stringify(MOCK_USER));
      return true;
    }
    return false;
  };

  const register = async (
    name: string,
    email: string,
    _password: string
  ): Promise<boolean> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const newUser: User = {
      ...MOCK_USER,
      id: Date.now().toString(),
      name,
      email,
    };
    setUser(newUser);
    localStorage.setItem("auth_user", JSON.stringify(newUser));
    return true;
  };

  const updateProfile = async (
    updates: Partial<Pick<User, "name" | "email" | "bio" | "phone" | "location">>
  ): Promise<boolean> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem("auth_user", JSON.stringify(updatedUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth_user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
