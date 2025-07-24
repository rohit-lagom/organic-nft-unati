'use client';

import { ExternalProvider } from '@ethersproject/providers';
import { useWeb3AuthUser } from '@web3auth/modal/react';
import { useAccount, useBalance } from 'wagmi';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { formatEther } from 'viem';
import LogoutButton from '@/components/common/button/logout-button';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { updateUser } from '@/lib/api';
import { toast } from 'sonner';

interface LocalUser {
  email?: string;
  phoneNumber?: string;
  username?: string;
}

export default function SettingsPage() {
  const router = useRouter();
  const { userInfo: web3User } = useWeb3AuthUser();
  const { address, connector, isConnected } = useAccount();
  const {
    walletAddress,
    userName,
    email,
    phoneNumber,
    setAuth,
  } = useAuth();
  const { data: balanceData } = useBalance({ address });

  const [networkName, setNetworkName] = useState('Loading...');
  const [masked, setMasked] = useState(true);
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [localUser, setLocalUser] = useState<LocalUser>({
    email,
    phoneNumber: phoneNumber || '',
    username: userName,
  });
  const [error, setError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    if (isConnected && address) {
      const username = (web3User as Record<string, unknown>)?.username as string | undefined;
      setAuth(address, username, email, phoneNumber);
    }
  }, [isConnected, address, web3User, setAuth, email, phoneNumber]);

  useEffect(() => {
    const fetchNetwork = async () => {
      try {
        const provider = await connector?.getProvider();
        const chainIdHex = await (provider as ExternalProvider)?.request?.({ method: 'eth_chainId' });
        const chainId = parseInt(chainIdHex, 16);
        const networks: Record<number, string> = {
          1: 'Lagom Mainnet',
          5: 'Goerli Testnet',
          137: 'Polygon',
          80001: 'Mumbai Testnet',
        };
        setNetworkName(networks[chainId] || `Chain ID: ${chainId}`);
      } catch {
        setNetworkName('Unknown');
      }
    };
    fetchNetwork();
  }, [connector]);

  const handleCopy = async () => {
    if (walletAddress) {
      await navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const toggleMask = () => setMasked(!masked);
  const maskedAddress = walletAddress
    ? masked
      ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
      : walletAddress
    : '';

  const handleChange = (field: keyof LocalUser, value: string) => {
    setLocalUser((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    if (!localUser.username || localUser.username.trim() === '') {
      toast.error('Username is required.');
      return false;
    }
    if (!/^[a-zA-Z0-9_]+$/.test(localUser.username)) {
      toast.error('Username can only contain letters, numbers, and underscores.');
      return false;
    }
    if (!localUser.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(localUser.email)) {
      toast.error('Please enter a valid email address.');
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    setError(null);
    if (!validate()) return;
    try {
      // Only update username if it was changed, otherwise use the current username
      const newUsername = localUser.username && localUser.username !== userName ? localUser.username : userName;
      await updateUser(walletAddress ?? '', {
        userName: newUsername,
        email: localUser.email || email,
        phoneNumber: localUser.phoneNumber || '',
      });
      await setAuth(
        walletAddress ?? '',
        newUsername,
        localUser.email || email,
        localUser.phoneNumber || ''
      );
      setIsEditing(false);
      router.push('/dashboard');
    } catch (err: any) {
      const msg = err?.message || '';
      if (msg.toLowerCase().includes('user') && msg.toLowerCase().includes('exist')) {
        toast.error('Username is already taken or user exists. Please choose another username.');
      } else if (msg.toLowerCase().includes('username')) {
        toast.error('Username is not available.');
      } else {
        toast.error(msg || 'Failed to update user.');
      }
    }
  };

  const imageSrc = web3User?.profileImage?.trim() ? web3User.profileImage : '/Avatar.jpg';

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image src={imageSrc} alt="Avatar" width={56} height={56} className="rounded-full border border-white/10" />
          <h2 className="text-white text-lg font-semibold">Settings</h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            className="text-xs px-3 py-1 cursor-pointer rounded-md border border-white/20 text-white hover:bg-white/10"
          >
            {isEditing ? 'Done' : 'Edit'}
          </button>
          <LogoutButton />
        </div>
      </div>

      {/* User Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Username */}
        <div className="bg-[#2a2a2a] border border-white/10 rounded-xl p-5 shadow">
          <h4 className="text-gray-400 text-xs mb-1">Username</h4>
          {isEditing ? (
            <input
              type="text"
              value={localUser.username || ''}
              onChange={(e) => handleChange('username', e.target.value)}
              className="bg-transparent border-b border-white/20 text-white text-lg font-semibold focus:outline-none"
            />
          ) : (
            <p className="text-white text-lg font-semibold">@{localUser.username || userName}</p>
          )}
        </div>
        {/* Email */}
        <div className="bg-[#2a2a2a] border border-white/10 rounded-xl p-5 shadow">
          <h4 className="text-gray-400 text-xs mb-1">Email</h4>
          {isEditing ? (
            <input
              type="email"
              value={localUser.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
              className="bg-transparent border-b border-white/20 text-white text-lg font-semibold focus:outline-none"
              disabled={!!web3User?.email}
            />
          ) : (
            <p className="text-white text-lg font-semibold">{email || 'No email'}</p>
          )}
        </div>
        {/* Phone Number */}
        <div className="bg-[#2a2a2a] border border-white/10 rounded-xl p-5 shadow">
          <h4 className="text-gray-400 text-xs mb-1">Phone Number</h4>
          {isEditing ? (
            <input
              type="tel"
              value={localUser.phoneNumber || ''}
              onChange={(e) => handleChange('phoneNumber', e.target.value)}
              className="bg-transparent border-b border-white/20 text-white text-lg font-semibold focus:outline-none"
            />
          ) : (
            <p className="text-white text-lg font-semibold">{localUser.phoneNumber || 'Not Set'}</p>
          )}
        </div>
      </div>

      {/* Wallet Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Wallet */}
        <div className="bg-[#2a2a2a] border border-white/10 rounded-xl p-5 shadow">
          <h4 className="text-white text-sm mb-2">Wallet Address</h4>
          <div className="flex flex-col gap-2">
            <p className="text-sm text-gray-300 break-all">{maskedAddress || 'Not connected'}</p>
            <div className="flex gap-2">
              <button onClick={toggleMask} className="text-xs px-3 py-1 cursor-pointer rounded-md border border-white/20 text-white hover:bg-white/10">
                {masked ? 'Show' : 'Hide'}
              </button>
              <button onClick={handleCopy} className="text-xs px-3 py-1 cursor-pointer rounded-md border border-white/20 text-white hover:bg-white/10">
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        </div>

        {/* Balance */}
        <div className="bg-[#2a2a2a] border border-white/10 rounded-xl p-5 shadow">
          <h4 className="text-white text-sm mb-2">Balance</h4>
          <p className="text-white text-xl font-semibold">
            {balanceData ? `${formatEther(balanceData.value)} LAGO` : 'Loading...'}
          </p>
        </div>

        {/* Network */}
        <div className="bg-[#2a2a2a] border border-white/10 rounded-xl p-5 shadow">
          <h4 className="text-white text-sm mb-2">Current Network</h4>
          <p className="text-white text-xl font-semibold">{networkName}</p>
        </div>
      </div>
    </div>
  );
}
