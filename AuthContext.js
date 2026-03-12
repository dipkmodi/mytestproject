import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signIn = async (email, password) => {
    // Mock sign-in - in production, call your API
    if (email === 'test@example.com' && password === 'password') {
      setUser({ email });
      return true;
    }
    return false;
  };

  const signUp = async (email, password) => {
    // Mock sign-up - in production, call your API
    setUser({ email }); // Automatically sign in after sign up
    return true;
  };

  const signOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
