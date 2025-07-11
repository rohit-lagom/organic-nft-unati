// /store/auth-store.ts
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
  // logout: () => void;
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
    const userName = localStorage.getItem('user_name');
    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');
    const profileImage = localStorage.getItem('profile_image');

    set({
      walletAddress,
      userName: userName || undefined,
      name: name || undefined,
      email: email || undefined,
      profileImage: profileImage || undefined,
      isLoggedIn: !!walletAddress,
      hydrated: true,
    });
  },

  setAuth: (walletAddress, userName, name, email, profileImage) => {
    const finalUserName = userName || generateRandomUsername();

    localStorage.setItem('wallet_address', walletAddress);
    localStorage.setItem('user_name', finalUserName);
    if (name) localStorage.setItem('name', name);
    if (email) localStorage.setItem('email', email);
    if (profileImage) localStorage.setItem('profile_image', profileImage);

    set({
      walletAddress,
      userName: finalUserName,
      name,
      email,
      profileImage,
      isLoggedIn: true,
    });
  },

  // logout: () => {
  //   localStorage.removeItem('wallet_address');
  //   localStorage.removeItem('user_name');
  //   localStorage.removeItem('name');
  //   localStorage.removeItem('email');
  //   localStorage.removeItem('profile_image');
  //   set({
  //     walletAddress: null,
  //     userName: undefined,
  //     name: undefined,
  //     email: undefined,
  //     profileImage: undefined,
  //     isLoggedIn: false,
  //   });
  // },
}));
