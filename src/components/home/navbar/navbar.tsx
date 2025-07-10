// Navbar.tsx

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useWeb3AuthConnect, useWeb3AuthUser } from '@web3auth/modal/react';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import Button from '@/components/common/button/button';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/assets/images/Logo.png';
import LogoutButton from '@/components/common/button/logout-button';
import { generateRandomUsername } from '@/utils/username';

const navLinks = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Product', href: '#' },
];

export function Navbar() {
  const { connect, loading } = useWeb3AuthConnect();
  const { address, isConnected } = useAccount();
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [masked, setMasked] = useState(true);
  const [copied, setCopied] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [userName, setUserName] = useState('');
  const [redirectAfterConnect, setRedirectAfterConnect] = useState(false);
  const [showAccountCreated, setShowAccountCreated] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedAddress = sessionStorage.getItem('wallet_address');
    const storedName = sessionStorage.getItem('user_name');
    if (storedAddress) setWalletAddress(storedAddress);
    if (storedName) setUserName(storedName);
  }, []);

  useEffect(() => {
    if (isConnected && address) {
      setWalletAddress(address);
      sessionStorage.setItem('wallet_address', address);
      if (!sessionStorage.getItem('user_name')) {
        const randomUsername = generateRandomUsername();
        setUserName(randomUsername);
        sessionStorage.setItem('user_name', randomUsername);
      }
      if (redirectAfterConnect) {
        router.push('/dashboard');
        setRedirectAfterConnect(false);
      }
    }
  }, [isConnected, address, redirectAfterConnect, router]);

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
    const handler = (e: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(e.target as Node) &&
        !isRedirecting
      ) {
        handleGoToDashboard();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isRedirecting]);

  const handleConnect = async () => {
    try {
      await connect();
      if (!sessionStorage.getItem('welcome_shown')) {
        setShowWelcome(true);
        sessionStorage.setItem('welcome_shown', 'true');
        setShowAccountCreated(true);
        setTimeout(() => setShowAccountCreated(false), 3000);
      }
    } catch (err) {
      console.error('Connection failed:', err);
    }
  };

  const handleGoToDashboard = () => {
    if (isRedirecting) return;
    setIsRedirecting(true);
    setShowWelcome(false);
    router.push('/dashboard');
  };

  const toggleMask = () => setMasked(!masked);

  const handleCopy = async () => {
    if (walletAddress) {
      await navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

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

      <header className="fixed top-0 left-0 right-0 z-50 bg-[#242424] backdrop-blur-lg border-b border-white/10 shadow-md">
        <div className="flex items-center justify-between px-6 md:px-8 py-4">
          <Link href="/" className="flex items-center gap-3">
            <Image src={Logo} alt="Logo" width={36} height={36} className="rounded-lg" />
            <span className="text-white text-lg font-semibold">Organic NFTs</span>
          </Link>

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

          <button
            className="md:hidden text-white cursor-pointer"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

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
                      setRedirectAfterConnect(true);
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
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-[999]">
          <div
            ref={modalRef}
            className="bg-[#1f1f1f] p-8 rounded-2xl shadow-xl text-center space-y-5 border border-white/10 w-[90%] max-w-md"
          >
            <h2 className="text-white text-xl font-semibold">
              Welcome {userName || 'Rockstar'}!
            </h2>
            <p className="text-white/70">
              You have successfully logged in via Web3Auth.
            </p>

            <div className="bg-[#2a2a2a] p-3 rounded-md border border-white/10 text-white text-sm break-all">
              <p className="mb-2">This is your wallet address:</p>
              <p className="font-mono">
                {masked ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : walletAddress}
              </p>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={toggleMask}
                  className="text-xs px-3 py-1 rounded-md border border-white/20 text-white hover:bg-white/10 transition"
                >
                  {masked ? 'Show' : 'Hide'}
                </button>
                <button
                  onClick={handleCopy}
                  className="text-xs px-3 py-1 rounded-md border border-white/20 text-white hover:bg-white/10 transition"
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>

            <Button
              onClick={handleGoToDashboard}
              className="mt-4 w-full"
              disabled={isRedirecting}
            >
              {isRedirecting ? 'Redirecting...' : 'Go to Dashboard'}
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
