import { createContext, useContext, useEffect, useState } from 'react';

// Set to 'firebase' for real authentication or 'mock' for testing
const AUTH_MODE = 'mock'; // Change to 'firebase' once your .env.local is configured

let firebaseAuthModule = null;
let firebaseConfigModule = null;

// Lazy load Firebase only if AUTH_MODE is 'firebase'
if (AUTH_MODE === 'firebase') {
  try {
    firebaseAuthModule = require('firebase/auth');
    firebaseConfigModule = require('./firebaseConfig');
  } catch (e) {
    console.warn('Firebase not available, falling back to mock auth');
  }
}

const AuthContext = createContext();

const mockUsers = {
  'test@example.com': 'password123',
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is logged in (from localStorage in mock mode)
    if (AUTH_MODE === 'mock') {
      const savedUser = localStorage.getItem('mockAuthUser');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      setLoading(false);
    } else {
      // Firebase mode
      if (firebaseAuthModule && firebaseConfigModule) {
        const { onAuthStateChanged } = firebaseAuthModule;
        const { auth } = firebaseConfigModule;

        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
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
      }
    }
  }, []);

  const signUp = async (email, password) => {
    try {
      setError(null);

      if (AUTH_MODE === 'mock') {
        // Mock sign-up
        if (mockUsers[email]) {
          setError('Email already registered');
          return false;
        }
        mockUsers[email] = password;
        const userData = { uid: Date.now().toString(), email };
        setUser(userData);
        localStorage.setItem('mockAuthUser', JSON.stringify(userData));
        return true;
      } else {
        // Firebase sign-up
        const { createUserWithEmailAndPassword } = firebaseAuthModule;
        const { auth } = firebaseConfigModule;

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        setUser({
          uid: userCredential.user.uid,
          email: userCredential.user.email,
        });
        return true;
      }
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
        // Mock sign-in
        if (mockUsers[email] && mockUsers[email] === password) {
          const userData = { uid: Date.now().toString(), email };
          setUser(userData);
          localStorage.setItem('mockAuthUser', JSON.stringify(userData));
          return true;
        }
        setError('Invalid email or password');
        return false;
      } else {
        // Firebase sign-in
        const { signInWithEmailAndPassword } = firebaseAuthModule;
        const { auth } = firebaseConfigModule;

        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        setUser({
          uid: userCredential.user.uid,
          email: userCredential.user.email,
        });
        return true;
      }
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
        // Mock sign-out
        setUser(null);
        localStorage.removeItem('mockAuthUser');
      } else {
        // Firebase sign-out
        const { signOut: firebaseSignOut } = firebaseAuthModule;
        const { auth } = firebaseConfigModule;

        await firebaseSignOut(auth);
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
