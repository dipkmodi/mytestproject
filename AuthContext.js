import React, { createContext, useContext, useEffect, useState } from 'react';

// Change this to 'firebase' once you've configured Firebase in .env.local
// For now, use 'mock' to test the app without Firebase
const AUTH_MODE = process.env.EXPO_PUBLIC_AUTH_MODE || 'mock';

let firebaseImports = null;

// Lazy load Firebase only if AUTH_MODE is 'firebase'
if (AUTH_MODE === 'firebase') {
  try {
    const firebase = require('firebase/auth');
    const firebaseConfig = require('./firebaseConfig');
    firebaseImports = {
      createUserWithEmailAndPassword: firebase.createUserWithEmailAndPassword,
      signInWithEmailAndPassword: firebase.signInWithEmailAndPassword,
      signOut: firebase.signOut,
      onAuthStateChanged: firebase.onAuthStateChanged,
      auth: firebaseConfig.auth,
    };
  } catch (e) {
    console.warn('Firebase not configured, using mock auth');
  }
}

const AuthContext = createContext();

// Mock user database (only for testing)
const mockUsers = {
  'test@example.com': 'password123',
  'demo@example.com': 'demo123',
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (AUTH_MODE === 'mock') {
      // Check localStorage for mock auth
      const savedUser = typeof localStorage !== 'undefined' ? localStorage.getItem('mockAuthUser') : null;
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      setLoading(false);
    } else if (AUTH_MODE === 'firebase' && firebaseImports) {
      // Firebase auth listener
      const unsubscribe = firebaseImports.onAuthStateChanged(firebaseImports.auth, (firebaseUser) => {
        if (firebaseUser) {
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
          });
        } else {
          setUser(null);
        }
        setLoading(false);
      });
      return unsubscribe;
    } else {
      setLoading(false);
    }
  }, []);

  const signUp = async (email, password) => {
    try {
      setError(null);

      if (AUTH_MODE === 'mock') {
        if (mockUsers[email]) {
          setError('Email already registered. Try another email.');
          return false;
        }
        mockUsers[email] = password;
        const userData = { uid: Date.now().toString(), email };
        setUser(userData);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('mockAuthUser', JSON.stringify(userData));
        }
        return true;
      } else if (AUTH_MODE === 'firebase' && firebaseImports) {
        const userCredential = await firebaseImports.createUserWithEmailAndPassword(
          firebaseImports.auth,
          email,
          password
        );
        setUser({
          uid: userCredential.user.uid,
          email: userCredential.user.email,
        });
        return true;
      }
      return false;
    } catch (err) {
      const errorMsg = err.message || 'Sign up failed';
      setError(errorMsg);
      return false;
    }
  };

  const signIn = async (email, password) => {
    try {
      setError(null);

      if (AUTH_MODE === 'mock') {
        if (mockUsers[email] && mockUsers[email] === password) {
          const userData = { uid: Date.now().toString(), email };
          setUser(userData);
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('mockAuthUser', JSON.stringify(userData));
          }
          return true;
        }
        setError('Invalid email or password');
        return false;
      } else if (AUTH_MODE === 'firebase' && firebaseImports) {
        const userCredential = await firebaseImports.signInWithEmailAndPassword(
          firebaseImports.auth,
          email,
          password
        );
        setUser({
          uid: userCredential.user.uid,
          email: userCredential.user.email,
        });
        return true;
      }
      return false;
    } catch (err) {
      const errorMsg = err.message || 'Login failed';
      setError(errorMsg);
      return false;
    }
  };

  const signOut = async () => {
    try {
      setError(null);

      if (AUTH_MODE === 'mock') {
        setUser(null);
        if (typeof localStorage !== 'undefined') {
          localStorage.removeItem('mockAuthUser');
        }
      } else if (AUTH_MODE === 'firebase' && firebaseImports) {
        await firebaseImports.signOut(firebaseImports.auth);
        setUser(null);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
