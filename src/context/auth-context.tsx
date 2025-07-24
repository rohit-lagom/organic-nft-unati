import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { decodeJwt } from '@/lib/jwt';
import { getUser, createUser } from '@/lib/api';

export interface AuthUser {
  walletAddress: string | null;
  userName?: string;
  name?: string;
  email?: string;
  profileImage?: string;
  token?: string;
  isLoggedIn: boolean;
}

interface AuthContextType extends AuthUser {
  setAuth: (
    walletAddress: string,
    incomingUserName?: string,
    incomingName?: string,
    incomingEmail?: string
  ) => Promise<void>;
  logout: () => void;
  hydrated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Add a loginUser API call (dummy for now)
async function loginUser(walletAddress: string): Promise<{ token?: string }> {
  // TODO: Replace with real login endpoint if available
  // For now, return a dummy token for testing
  return { token: 'DUMMY.JWT.TOKEN' };
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser>({
    walletAddress: null,
    userName: undefined,
    name: undefined,
    email: undefined,
    profileImage: undefined,
    token: undefined,
    isLoggedIn: false,
  });
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from sessionStorage
  useEffect(() => {
    const token = sessionStorage.getItem('auth_token');
    if (!token) {
      setHydrated(true);
      return;
    }
    const payload = decodeJwt(token);
    if (!payload || !payload.walletAddress) {
      sessionStorage.removeItem('auth_token');
      setHydrated(true);
      return;
    }
    getUser(payload.walletAddress)
      .then((apiUser) => {
        if (apiUser) {
          setUser({
            walletAddress: payload.walletAddress,
            userName: apiUser.userName,
            name: apiUser.name,
            email: apiUser.email,
            profileImage: apiUser.profileImage,
            token,
            isLoggedIn: true,
          });
        }
      })
      .catch(() => {})
      .finally(() => setHydrated(true));
  }, []);

  // setAuth logic
  const setAuth = useCallback(async (
    walletAddress: string,
    incomingUserName?: string,
    incomingName?: string,
    incomingEmail?: string
  ) => {
    try {
      let apiUser = await getUser(walletAddress);
      let token: string | undefined = undefined;

      if (!apiUser) {
        const finalUserName = incomingUserName || 'user' + Math.floor(Math.random() * 10000);
        const resp = await createUser({
          walletAddress,
          userName: finalUserName,
          email: incomingEmail || '',
          phoneNumber: '',
        });
        if (resp && resp.token) {
          token = resp.token;
          if (token) sessionStorage.setItem('auth_token', token);
        }
        apiUser = await getUser(walletAddress);
      } else {
        // User exists, try to get a JWT via login endpoint or fallback
        const loginResp = await loginUser(walletAddress);
        if (loginResp && loginResp.token) {
          token = loginResp.token;
          sessionStorage.setItem('auth_token', token);
        }
      }
      setUser({
        walletAddress,
        userName: apiUser.userName,
        name: incomingName ?? apiUser.name,
        email: apiUser.email,
        profileImage: apiUser.profileImage,
        token: token || sessionStorage.getItem('auth_token') || undefined,
        isLoggedIn: true,
      });
    } catch (err) {
      console.error('setAuth error:', err);
    }
  }, []);

  // logout logic
  const logout = useCallback(() => {
    sessionStorage.removeItem('auth_token');
    setUser({
      walletAddress: null,
      userName: undefined,
      name: undefined,
      email: undefined,
      profileImage: undefined,
      token: undefined,
      isLoggedIn: false,
    });
  }, []);

  return (
    <AuthContext.Provider value={{ ...user, setAuth, logout, hydrated }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
} 