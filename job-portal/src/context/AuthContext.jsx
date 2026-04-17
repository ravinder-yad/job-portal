import React, { useMemo, useState } from 'react';
import { AuthContext } from './AuthContextStore';

const getStoredUser = () => {
  const storedUser = localStorage.getItem('user');

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser);
  } catch {
    localStorage.removeItem('user');
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [user, setUser] = useState(getStoredUser);

  const login = ({ token: authToken, user: authUser }) => {
    if (authToken) {
      localStorage.setItem('token', authToken);
      setToken(authToken);
    }

    if (authUser) {
      localStorage.setItem('user', JSON.stringify(authUser));
      setUser(authUser);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  const updateUser = (updates) => {
    setUser((currentUser) => {
      const nextUser = {
        ...currentUser,
        ...updates,
      };

      localStorage.setItem('user', JSON.stringify(nextUser));
      return nextUser;
    });
  };

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token && user),
      isAdmin: user?.role === 'admin',
      login,
      logout,
      updateUser,
    }),
    [token, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
