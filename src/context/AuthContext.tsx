/* eslint-disable react-refresh/only-export-components */
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    chrome.storage.local.get(['token'], (result) => {
      if (result.token) {
        setToken(result.token);
      }
    });
  }, []);

  const login = useCallback((newToken: string) => {
    setToken(newToken);
    chrome.storage.local.set({ token: newToken });
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    chrome.storage.local.remove('token');
  }, []);

  const value = useMemo(
    () => ({ token, login, logout }),
    [token, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
