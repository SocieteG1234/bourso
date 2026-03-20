// context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import UserService from '../services/UserService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Charger l'utilisateur au démarrage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Écouter les mises à jour (virements, etc.)
  useEffect(() => {
    const handleUserUpdate = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        setCurrentUser({ ...parsed, _timestamp: Date.now() });
      }
    };
    window.addEventListener('userUpdated', handleUserUpdate);
    return () => window.removeEventListener('userUpdated', handleUserUpdate);
  }, []);

  const login = async (username, password) => {
    try {
      const userData = await UserService.authenticate(username, password);
      const token = btoa(JSON.stringify({ userId: userData.id, timestamp: Date.now() }));
      setCurrentUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', token);
      window.dispatchEvent(new CustomEvent('userUpdated'));
      return { success: true, user: userData };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const register = async (userData) => {
    try {
      const newUser = await UserService.createUser(userData);
      const token = btoa(JSON.stringify({ userId: newUser.id, timestamp: Date.now() }));
      setCurrentUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      localStorage.setItem('token', token);
      return { success: true, user: newUser };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const updateUser = (updatedUserData) => {
    setCurrentUser({ ...updatedUserData, _timestamp: Date.now() });
    localStorage.setItem('user', JSON.stringify(updatedUserData));
    window.dispatchEvent(new CustomEvent('userUpdated'));
    return { success: true };
  };

  const value = {
    currentUser,           // ← utilisé dans toutes tes pages
    user: currentUser,     // ← alias pour compatibilité
    loading,
    isLoggedIn: !!currentUser,       // ← utilisé dans App.jsx et PrivateRoute
    isAuthenticated: !!currentUser,  // ← alias
    login,
    logout,
    register,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};