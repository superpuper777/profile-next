"use client";

import React, { createContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  apiKey: string | null;
  setApiKey: (key: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [apiKey, setApiKey] = useState<string | null>(
    localStorage.getItem("api_key")
  );

  // useEffect(() => {
  //   const storedApiKey = ;
  //   if (storedApiKey) {
  //     setApiKey(storedApiKey);
  //   }
  // }, []);

  useEffect(() => {
    if (apiKey) {
      localStorage.setItem("api_key", apiKey);
    } else {
      localStorage.removeItem("api_key");
    }
  }, [apiKey]);

  return (
    <AuthContext.Provider value={{ apiKey, setApiKey }}>
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
