import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { apiRequest } from '../config/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState('');

  const clearAuthError = () => setAuthError('');

  const refreshProfile = async () => {
    try {
      const res = await apiRequest('/api/profile');
      const profile = res?.data || null;
      setUser(profile);
      return profile;
    } catch {
      setUser(null);
      return null;
    }
  };

  useEffect(() => {
    (async () => {
      setAuthLoading(true);
      await refreshProfile();
      setAuthLoading(false);
    })();
  }, []);

  const register = async ({ name, email, password }) => {
    setAuthError('');
    try {
      const res = await apiRequest('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
      });

      const registeredUser = res?.data
        ? {
            _id: res.data._id,
            name: res.data.name,
            email: res.data.email,
          }
        : null;

      setUser(registeredUser);
      return { success: true, user: registeredUser };
    } catch (error) {
      const message = error?.message || 'Registration failed';
      setAuthError(message);
      return { success: false, message };
    }
  };

  const login = async ({ email, password }) => {
    setAuthError('');
    try {
      const res = await apiRequest('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      const loggedInUser = res?.data
        ? {
            _id: res.data._id,
            name: res.data.name,
            email: res.data.email,
          }
        : await refreshProfile();

      setUser(loggedInUser || null);
      return { success: true, user: loggedInUser || null };
    } catch (error) {
      const message = error?.message || 'Login failed';
      setAuthError(message);
      return { success: false, message };
    }
  };

  const logout = async () => {
    setAuthError('');
    try {
      await apiRequest('/api/auth/logout');
    } catch {
      // Ignore backend logout errors and clear local auth state anyway.
    }
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      authLoading,
      authError,
      register,
      login,
      logout,
      refreshProfile,
      clearAuthError,
    }),
    [user, authLoading, authError]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
