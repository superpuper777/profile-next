"use client";

import React, { createContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  apiKey: string | null;
  setApiKey: (key: string | null) => void;
  clearApiKey: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // const [apiKey, setApiKey] = useState<string | null>(
  //   localStorage.getItem("api_key")
  // );
  const [apiKey, setApiKey] = useState<string | null>(null);
  useEffect(() => {
    const storedApiKey = localStorage.getItem("api_key");
    if (storedApiKey) {
      setApiKey(storedApiKey);
    }
  }, []);

  useEffect(() => {
    if (apiKey) {
      localStorage.setItem("api_key", apiKey);
    } else {
      localStorage.removeItem("api_key");
    }
  }, [apiKey]);

  const clearApiKey = () => {
    setApiKey(null);
  };

  return (
    <AuthContext.Provider value={{ apiKey, setApiKey, clearApiKey }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
