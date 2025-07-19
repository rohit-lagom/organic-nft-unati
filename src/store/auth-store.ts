'use client';

import { create } from 'zustand';
import { generateRandomUsername } from '@/utils/username';
import { createUser, getUser } from '@/lib/api';

interface AuthState {
  walletAddress: string | null;
  userName?: string;
  name?: string;
  email?: string;
  profileImage?: string;
  isLoggedIn: boolean;
  hydrated: boolean;
  hydrate: () => void;
  setAuth: (
    walletAddress: string,
    name?: string,
    email?: string,
    profileImage?: string
  ) => Promise<void>;
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

  setAuth: async (walletAddress, name, email, profileImage) => {
    try {
      const existingUser = await getUser(walletAddress);

      let userName = existingUser?.userName;
      if (!userName) {
        userName = generateRandomUsername();
        await createUser({
          walletAddress,
          userName,
          email: email || '',
          phoneNumber: '',
        });
      }

      localStorage.setItem('wallet_address', walletAddress);
      localStorage.setItem('user_name', userName);
      if (name) localStorage.setItem('name', name);
      if (email) localStorage.setItem('email', email);
      if (profileImage) localStorage.setItem('profile_image', profileImage);

      set({
        walletAddress,
        userName,
        name,
        email,
        profileImage,
        isLoggedIn: true,
      });
    } catch (error) {
      console.error('Auth error:', error);
    }
  },

  logout: () => {
    localStorage.clear();
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
