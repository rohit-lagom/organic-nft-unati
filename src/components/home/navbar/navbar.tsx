'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useWeb3AuthConnect, useWeb3AuthDisconnect } from '@web3auth/modal/react';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import Button from '@/components/common/button/button';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/assets/images/Logo.png';
import LogoutButton from '@/components/common/button/logout-button';

const navLinks = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Product', href: '#' },
];

export function Navbar() {
  const { connect, loading } = useWeb3AuthConnect();
  // const { disconnect } = useWeb3AuthDisconnect();
  const { address, isConnected } = useAccount();
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Auto-close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const maskedAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '';

  const handleConnect = async () => {
    try {
      await connect();
    } catch (err) {
      console.error('Connection failed:', err);
    }
  };

  return (
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
              onClick={() => router.push(href)}
              className="hover:text-purple-400 cursor-pointer transition"
            >
              {label}
            </button>
          ))}

          {/* Wallet Button */}
          {isConnected && address ? (
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

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#242424] border-t border-white/10 p-6 space-y-4 text-white text-base">
          {navLinks.map(({ label, href }) => (
            <button
              key={label}
              onClick={() => {
                router.push(href);
                setMenuOpen(false);
              }}
              className="block w-full text-left hover:text-purple-400 transition"
            >
              {label}
            </button>
          ))}

          {isConnected && address ? (
            <div className="relative">
              <Button fullWidth onClick={() => setDropdownOpen((prev) => !prev)}
                >
                {maskedAddress}
              </Button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 bg-[#2a2a2a] border border-white/10 rounded-md shadow-lg">
                  <LogoutButton />
                </div>
              )}
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
  );
}
