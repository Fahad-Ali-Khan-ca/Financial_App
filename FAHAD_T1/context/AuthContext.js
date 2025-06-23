import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const signIn = (email, password) => {
    if (email === "test@senecapolytechnic.ca" && password === "test123") {
      setUser({ email });
      return { success: true };
    }
    return { success: false, message: "Invalid credentials" };
  };

  const signOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
