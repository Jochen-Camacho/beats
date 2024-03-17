import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const register = (username, password) => {
    const userData = { username };
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(username));
    localStorage.setItem("password", JSON.stringify(password));
  };

  const login = (username, password) => {
    if (
      localStorage.getItem("user") === JSON.stringify(username) &&
      localStorage.getItem("password") === JSON.stringify(password)
    ) {
      const userData = { username };
      setUser(userData);

      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
