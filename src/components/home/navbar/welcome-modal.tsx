'use client';

import { useEffect, useRef, useState } from 'react';
import Button from '@/components/common/button/button';

export default function WelcomeModal({
  walletAddress,
  userName,
  onGoToDashboard,
  onClose,
}: {
  walletAddress?: string | null;
  userName?: string;
  onGoToDashboard: () => void;
  onClose: () => void;
}) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [masked, setMasked] = useState(true);
  const [copied, setCopied] = useState(false);

  const toggleMask = () => setMasked(!masked);

  const handleCopy = async () => {
    if (walletAddress) {
      await navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Auto redirect to dashboard in 5 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      onGoToDashboard();
    }, 5000);

    return () => clearTimeout(timeout);
  }, [onGoToDashboard]);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center z-[999]">
      <div
        ref={modalRef}
        className="relative bg-[#1f1f1f] p-8 rounded-2xl shadow-xl text-center space-y-5 border border-white/10 w-[90%] max-w-md"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white text-lg hover:text-red-400 transition"
          aria-label="Close"
        >
          ✕
        </button>

        <h2 className="text-white text-xl font-semibold">
          Welcome {userName || 'Rockstar'}!
        </h2>
        <p className="text-white/70">You have successfully logged in via Web3Auth.</p>

        <div className="bg-[#2a2a2a] p-3 rounded-md border border-white/10 text-white text-sm break-all">
          <p className="mb-2">This is your wallet address:</p>
          <p className="font-mono">
            {masked
              ? `${walletAddress?.slice(0, 6)}...${walletAddress?.slice(-4)}`
              : walletAddress}
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

        <Button onClick={onGoToDashboard} className="mt-4 w-full">
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
}
