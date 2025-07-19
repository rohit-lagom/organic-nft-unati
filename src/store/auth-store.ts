'use client';

import { create } from 'zustand';
import { generateRandomUsername } from '@/utils/username';
import { getUser, createUser } from '@/lib/api';

interface AuthState {
  walletAddress: string | null;
  userName?: string;
  name?: string;
  email?: string;
  profileImage?: string;
  isLoggedIn: boolean;
  hydrated: boolean;
  hydrate: () => Promise<void>;
  setAuth: (
    walletAddress: string,
    userName?: string,
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

  hydrate: async () => {
    const walletAddress = localStorage.getItem('wallet_address');
    if (!walletAddress) {
      set({ hydrated: true });
      return;
    }

    try {
      const user = await getUser(walletAddress);
      if (user) {
        set({
          walletAddress,
          userName: user.userName,
          name: user.name,
          email: user.email,
          profileImage: user.profileImage,
          isLoggedIn: true,
        });
      }
    } catch (err) {
      console.warn('hydrate error:', err);
    } finally {
      set({ hydrated: true });
    }
  },

  setAuth: async (
    walletAddress,
    incomingUserName,
    incomingName,
    incomingEmail,
    incomingProfileImage
  ) => {
    try {
      let user = await getUser(walletAddress);

      // if no existing user, create one
      if (!user) {
        const finalUserName = incomingUserName || generateRandomUsername();
        user = await createUser({
          walletAddress,
          userName: finalUserName,
          email: incomingEmail || '',
          phoneNumber: '',
        });
      }

      // persist to localStorage
      localStorage.setItem('wallet_address', walletAddress);
      localStorage.setItem('user_name', user.userName);
      if (incomingName) localStorage.setItem('name', incomingName);
      if (user.email) localStorage.setItem('email', user.email);
      if (incomingProfileImage) localStorage.setItem('profile_image', incomingProfileImage);

      set({
        walletAddress,
        userName: user.userName,
        name: incomingName,
        email: user.email,
        profileImage: incomingProfileImage,
        isLoggedIn: true,
      });
    } catch (err) {
      console.error('setAuth error:', err);
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
