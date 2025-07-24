import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { decodeJwt } from '@/lib/jwt';
import { getUser, createUser } from '@/lib/api';

import { generateRandomUsername } from '@/utils/username'; 


export interface AuthUser {
  walletAddress: string | null;
  userName?: string;
  email?: string;
  phoneNumber?: string;
  profileImage?: string;
  token?: string;
  isLoggedIn: boolean;
}

interface AuthContextType extends AuthUser {
  setAuth: (
    walletAddress: string,
    incomingUserName?: string,
    incomingEmail?: string,
    incomingPhoneNumber?: string,
    incomingProfileImage?: string 
  ) => Promise<void>;
  logout: () => void;
  hydrated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


const creatorAvatars = [
  '/src/assets/images/creators/creator1.jpeg',
  '/src/assets/images/creators/creator2.jpeg',
  '/src/assets/images/creators/creator3.jpeg',
  '/src/assets/images/creators/creator4.jpeg',
];
function getRandomAvatar() {
  return creatorAvatars[Math.floor(Math.random() * creatorAvatars.length)];
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser>({
    walletAddress: null,
    userName: undefined,
    email: undefined,
    phoneNumber: undefined,
    profileImage: undefined,
    token: undefined,
    isLoggedIn: false,
  });
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from sessionStorage
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      setHydrated(true);
      return;
    }
    const payload = decodeJwt(token);
    if (!payload || !payload.walletAddress) {
      localStorage.removeItem('auth_token');
      setHydrated(true);
      return;
    }
    getUser(payload.walletAddress)
      .then((apiUser) => {
        if (apiUser) {
          setUser({
            walletAddress: payload.walletAddress,
            userName: apiUser.userName,
            email: apiUser.email,
            phoneNumber: apiUser.phoneNumber,
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
    incomingEmail?: string,
    incomingPhoneNumber?: string,
    incomingProfileImage?: string // Add profile image param
  ) => {
    try {
      // Always call createUser to get a JWT and user info for both new and existing users
      const finalUserName = incomingUserName || user.userName || generateRandomUsername();
      let profileImage: string | undefined = incomingProfileImage;
      if (!profileImage) {
        profileImage = getRandomAvatar();
      }
      const resp = await createUser({
        walletAddress,
        userName: finalUserName,
        email: incomingEmail || '',
        phoneNumber: incomingPhoneNumber || '',
      });
      console.log('createUser response:', resp);
      let token: string | undefined = undefined;
      if (resp && resp.token) {
        token = resp.token;
        console.log('Saving JWT token to localStorage:', token);
        if (token) localStorage.setItem('auth_token', token);
      }
      // Use user info from resp if available, else fallback to input
      setUser({
        walletAddress,
        userName: resp.userName || finalUserName,
        email: resp.email || incomingEmail || '',
        phoneNumber: resp.phoneNumber || incomingPhoneNumber || '',
        profileImage: resp.profileImage || profileImage,
        token: token || localStorage.getItem('auth_token') || undefined,
        isLoggedIn: true,
      });
    } catch (err) {
      console.error('setAuth error:', err);
    }
  }, [user.userName]); // Added user.userName to dependency array

  // logout logic
  const logout = useCallback(() => {
    localStorage.removeItem('auth_token');
    setUser({
      walletAddress: null,
      userName: undefined,
      email: undefined,
      phoneNumber: undefined,
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