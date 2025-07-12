'use client';

import { create } from 'zustand';
import { generateRandomUsername } from '@/utils/username';

interface AuthState {
  walletAddress: string | null;
  userName: string | undefined;
  name: string | undefined;
  email: string | undefined;
  profileImage: string | undefined;
  isLoggedIn: boolean;
  hydrated: boolean;
  hydrate: () => void;
  setAuth: (
    walletAddress: string,
    userName?: string,
    name?: string,
    email?: string,
    profileImage?: string
  ) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  walletAddress: null,
  userName: undefined,
  name: undefined,
  email: undefined,
  profileImage: undefined,
  isLoggedIn: false,
  hydrated: false,

  hydrate: () => {
    const walletAddress = localStorage.getItem('wallet_address');
    const userName = localStorage.getItem('user_name') || undefined;
    const name = localStorage.getItem('name') || undefined;
    const email = localStorage.getItem('email') || undefined;
    const profileImage = localStorage.getItem('profile_image') || undefined;

    set({
      walletAddress,
      userName,
      name,
      email,
      profileImage,
      isLoggedIn: !!walletAddress,
      hydrated: true,
    });
  },

  setAuth: (walletAddress, incomingUserName, incomingName, incomingEmail, incomingProfileImage) => {
    const storedUserName = localStorage.getItem('user_name') || undefined;
    const storedEmail = localStorage.getItem('email') || undefined;

    const finalUserName = incomingUserName || storedUserName || generateRandomUsername();
    const finalEmail = storedEmail || incomingEmail;

    localStorage.setItem('wallet_address', walletAddress);
    localStorage.setItem('user_name', finalUserName);
    if (incomingName) localStorage.setItem('name', incomingName);
    if (finalEmail) localStorage.setItem('email', finalEmail);
    if (incomingProfileImage) localStorage.setItem('profile_image', incomingProfileImage);

    set({
      walletAddress,
      userName: finalUserName,
      name: incomingName,
      email: finalEmail,
      profileImage: incomingProfileImage,
      isLoggedIn: true,
    });
  },

  logout: () => {
    localStorage.removeItem('wallet_address');
    localStorage.removeItem('user_name');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('profile_image');

    set({
      walletAddress: null,
      userName: undefined,
      name: undefined,
      email: undefined,
      profileImage: undefined,
      isLoggedIn: false,
    });
  },
}));
