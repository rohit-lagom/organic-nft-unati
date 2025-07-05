'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/assets/images/Logo.png';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Pricing', href: '#' },
  { label: 'Product', href: '#' },
  { label: 'Resources', href: '#' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  const ctaButton = (
    <Link
      href="#"
      className="inline-flex items-center justify-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold rounded-full transition w-full md:w-auto"
    >
      + Create now
    </Link>
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#242424] backdrop-blur-lg border-b border-white/10 shadow-md'
          : 'bg-transparent'
      }`}
    >
      <div className="flex items-center justify-between px-6 md:px-8 py-4 md:py-5">
        <Link href="/" className="flex items-center gap-3">
          <Image src={Logo} alt="Logo" width={36} height={36} className="rounded-lg" />
          <span className="text-white text-lg font-semibold tracking-wide">
            Organic NFTs
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-white text-sm font-medium">
          {navLinks.map(({ label, href }) => (
            <Link key={label} href={href} className="hover:text-purple-400 transition">
              {label}
            </Link>
          ))}
          {ctaButton}
        </nav>

        <button
          className="md:hidden text-white cursor-pointer"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <div
        ref={menuRef}
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          menuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-[#242424] border-t border-white/10 px-6 py-8 mt-2 flex flex-col items-center text-white text-base mx-4 rounded-xl space-y-6">
          {navLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="hover:text-purple-400 transition text-center w-full"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          {ctaButton}
        </div>
      </div>
    </header>
  );
}
