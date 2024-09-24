import React, { createContext, useContext, useEffect, useState } from 'react';
import { initializeApp, getApps } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzFtuXEQGY2PHCdF0jJy96Gk1MOJYnTgE",
  authDomain: "bus-tracking-87f10.firebaseapp.com",
  projectId: "bus-tracking-87f10",
  storageBucket: "bus-tracking-87f10.appspot.com",
  messagingSenderId: "101155764389",
  appId: "1:101155764389:web:54e74d137f58e3c62db54c",
  measurementId: "G-ZCSY892FP9"
};

// Initialize Firebase only if it hasn't been initialized yet
if (!getApps().length) {
  initializeApp(firebaseConfig);
}

const auth = initializeAuth(getApp(), {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Create AuthContext
const AuthContext = createContext({});

// Custom hook to access auth context
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe(); 
  }, []);

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const register = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
