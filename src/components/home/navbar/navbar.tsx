'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { toast } from 'sonner';
import {
  useWeb3AuthConnect,
  useWeb3AuthUser,
} from '@web3auth/modal/react';
import { useAccount } from 'wagmi';
import NavLogo from '@/assets/images/NavLogo.png';
import Button from '@/components/common/button/button';
import LogoutButton from '@/components/common/button/logout-button';
import { useAuthStore } from '@/store/auth-store';
import WelcomeModal from './welcome-modal';

const navLinks = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Product', href: '#' },
];

export function Navbar() {
  const {
    connect,
    loading,
    error: connectError,
  } = useWeb3AuthConnect();
  const { userInfo: web3User } = useWeb3AuthUser();
  const { address, isConnected } = useAccount();
  const { walletAddress, userName, setAuth } = useAuthStore();
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showAccountCreated, setShowAccountCreated] = useState(false);
  const [redirectAfterConnect, setRedirectAfterConnect] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);

  const dropdownRef = useRef<HTMLDivElement>(null);

 const handleConnect = async () => {
  try {
    const provider = await connect();

    if (!provider) {
      toast.warning('Wallet not connected. Please try again.');
      return;
    }

    if (!sessionStorage.getItem('welcome_shown')) {
      sessionStorage.setItem('welcome_shown', 'true');
      setShowAccountCreated(true);
      setTimeout(() => setShowAccountCreated(false), 6000);
      setTimeout(() => setShowWelcome(true), 2000);
    }
  } catch (err: unknown) {
    console.error('Connection failed:', err);

    if (typeof err === 'object' && err !== null && 'message' in err) {
      const msg = String((err as { message: string }).message).toLowerCase();
      if (msg.includes('rejected') || msg.includes('cancelled')) {
        toast.warning('User rejected the wallet connection.');
      } else {
        toast.error('Connection failed. Please try again.');
      }
    } else {
      toast.error('An unknown error occurred.');
    }
  }
};


  useEffect(() => {
    if (isConnected && address) {
      setAuth(address, web3User?.name, web3User?.email);
      if (redirectAfterConnect) {
        router.push('/dashboard');
        setRedirectAfterConnect(false);
      }
    }
  }, [isConnected, address, web3User, redirectAfterConnect, router, setAuth]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setIsAtTop(window.scrollY <= 10);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (connectError) {
      const msg = connectError.message?.toLowerCase();
      if (msg?.includes('rejected') || msg?.includes('cancelled')) {
        toast.warning('User rejected the wallet connection.');
      } else {
        toast.error('Connection failed. Please try again.');
      }
    }
  }, [connectError]);

  const maskedAddress = walletAddress
    ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
    : '';

  return (
    <>
      {showAccountCreated && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-md shadow-lg z-[999] transition">
          Account created successfully!
        </div>
      )}

   <header
  className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
    isAtTop
      ? 'bg-transparent'
      : 'bg-[#1e1e1e]/60 backdrop-blur-md border-b border-white/10 shadow-md'
  }`}
>

        <div className="flex items-center justify-between max-w-7xl mx-auto px-6 md:px-8 py-4">
          <Link href="/" className="flex items-center gap-3">
            <Image src={NavLogo} alt="Logo" height={48} className="rounded-lg" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-white text-sm">
            {navLinks.map(({ label, href }) => (
              <button
                key={label}
                onClick={async () => {
                  if (label === 'Dashboard') {
                    if (isConnected && walletAddress) {
                      router.push('/dashboard');
                    } else {
                      setRedirectAfterConnect(true);
                      await handleConnect();
                    }
                  } else {
                    router.push(href);
                  }
                }}
                className="hover:text-purple-400 cursor-pointer transition"
              >
                {label}
              </button>
            ))}

            {isConnected && walletAddress ? (
              <div className="relative" ref={dropdownRef}>
                <Button onClick={() => setDropdownOpen((prev) => !prev)}>
                  {maskedAddress}
                </Button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 bg-[#2a2a2a] border border-white/10 rounded-md shadow-lg">
                    <LogoutButton />
                  </div>
                )}
              </div>
            ) : (
              <Button onClick={handleConnect} disabled={loading}>
                {loading ? 'Connecting...' : 'Connect Wallet'}
              </Button>
            )}
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white cursor-pointer"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {menuOpen && (
          <div className="md:hidden bg-[#242424] border-t border-white/10 p-6 space-y-4 text-white text-base">
            {navLinks.map(({ label, href }) => (
              <button
                key={label}
                onClick={async () => {
                  if (label === 'Dashboard') {
                    if (isConnected && walletAddress) {
                      router.push('/dashboard');
                    } else {
                      await handleConnect();
                    }
                  } else {
                    router.push(href);
                  }
                  setMenuOpen(false);
                }}
                className="block w-full text-left hover:text-purple-400 transition"
              >
                {label}
              </button>
            ))}

            {isConnected && walletAddress ? (
              <div className="space-y-2">
                <Button fullWidth>{maskedAddress}</Button>
                <LogoutButton />
              </div>
            ) : (
              <Button
                fullWidth
                onClick={async () => {
                  await handleConnect();
                  setMenuOpen(false);
                }}
                disabled={loading}
              >
                {loading ? 'Connecting...' : 'Connect Wallet'}
              </Button>
            )}
          </div>
        )}
      </header>

      {showWelcome && (
        <WelcomeModal
          walletAddress={walletAddress}
          userName={userName}
          onClose={() => setShowWelcome(false)}
          onGoToDashboard={() => router.push('/dashboard')}
        />
      )}
    </>
  );
}
