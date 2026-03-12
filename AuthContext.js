import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Could be user object or null

  const signIn = (email, password) => {
    // Implement actual sign-in logic here (e.g., API call)
    // For now, a mock sign-in
    if (email === 'test@example.com' && password === 'password') {
      setUser({ email });
      return true;
    }
    return false;
  };

  const signUp = (email, password) => {
    // Implement actual sign-up logic here (e.g., API call)
    // For now, a mock sign-up
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
