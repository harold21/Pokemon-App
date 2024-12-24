import React, { createContext, useState, useEffect, useMemo } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const session = localStorage.getItem("session");
    if (session) setIsLoggedIn(true);
  }, []);

  const login = (username, password) => {
    if (username === "admin" && password === "admin") {
      localStorage.setItem("session", "logged_in");
      setIsLoggedIn(true);

      return true;
    }

    return false;
  };

  const logout = () => {
    localStorage.removeItem("session");
    setIsLoggedIn(false);
  };

  const value = useMemo(() => ({ isLoggedIn, login, logout }), [isLoggedIn]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;

};

export default AuthContext;
