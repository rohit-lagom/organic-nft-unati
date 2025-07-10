'use client';

import { ExternalProvider } from '@ethersproject/providers';
import { useWeb3AuthUser } from '@web3auth/modal/react';
import { useAccount, useBalance } from 'wagmi';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { formatEther } from 'viem';
import LogoutButton from '@/components/common/button/logout-button';
import { Web3Provider } from '@ethersproject/providers';

interface AuthUserInfo {
  name?: string;
  email?: string;
  profileImage?: string;
  username?: string;
}

export default function SettingsPage() {
  const { userInfo: web3User } = useWeb3AuthUser();
  const { address, connector } = useAccount();
  const { data: balanceData } = useBalance({ address });

  const [userInfo, setUserInfo] = useState<Partial<AuthUserInfo>>({});
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [networkName, setNetworkName] = useState('Loading...');
  const [masked, setMasked] = useState(true);
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Load user info & assign random username if missing
  useEffect(() => {
    if (web3User) {
      const updatedUser = { ...web3User };
   
      localStorage.setItem('organic-user', JSON.stringify(updatedUser));
      setUserInfo(updatedUser);
    } else {
      const cached = localStorage.getItem('organic-user');
      if (cached) setUserInfo(JSON.parse(cached));
    }
  }, [web3User]);

  // Load wallet address
  useEffect(() => {
    const loadWallet = async () => {
      if (address) {
        localStorage.setItem('organic-wallet', address);
        setWalletAddress(address);
      } else if (connector) {
        try {
          const provider = await connector.getProvider();
          const ethersProvider = new Web3Provider(provider as ExternalProvider);
          const signer = ethersProvider.getSigner();
          const fetchedAddress = await signer.getAddress();
          localStorage.setItem('organic-wallet', fetchedAddress);
          setWalletAddress(fetchedAddress);
        } catch {
          const cached = localStorage.getItem('organic-wallet');
          if (cached) setWalletAddress(cached);
        }
      }
    };
    loadWallet();
  }, [address, connector]);

  // Load network
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
  const maskedAddress = walletAddress ? (masked ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : walletAddress) : '';

  const handleChange = (field: keyof AuthUserInfo, value: string) => {
    const updated = { ...userInfo, [field]: value };
    setUserInfo(updated);
    localStorage.setItem('organic-user', JSON.stringify(updated));
  };

  const imageSrc = userInfo?.profileImage?.trim() ? userInfo.profileImage : '/Avatar.jpg';

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image src={imageSrc} alt="Avatar" width={56} height={56} className="rounded-full border border-white/10" />
          <h2 className="text-white text-lg font-semibold">Settings</h2>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setIsEditing(!isEditing)} className="text-xs px-3 py-1 rounded-md border border-white/20 text-white hover:bg-white/10">
            {isEditing ? 'Done' : 'Edit'}
          </button>
          <LogoutButton />
        </div>
      </div>

      {/* User Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name */}
        <div className="bg-[#2a2a2a] border border-white/10 rounded-xl p-5 shadow">
          <h4 className="text-gray-400 text-xs mb-1">Name</h4>
          {isEditing ? (
            <input
              type="text"
              value={userInfo?.name || ''}
              onChange={(e) => handleChange('name', e.target.value)}
              className="bg-transparent border-b border-white/20 text-white text-lg font-semibold focus:outline-none"
            />
          ) : (
            <p className="text-white text-lg font-semibold">{userInfo?.name || 'Anonymous'}</p>
          )}
        </div>

        {/* Username */}
        <div className="bg-[#2a2a2a] border border-white/10 rounded-xl p-5 shadow">
          <h4 className="text-gray-400 text-xs mb-1">Username</h4>
          {isEditing ? (
            <input
              type="text"
              value={userInfo?.username || ''}
              onChange={(e) => handleChange('username', e.target.value)}
              className="bg-transparent border-b border-white/20 text-white text-lg font-semibold focus:outline-none"
            />
          ) : (
            <p className="text-white text-lg font-semibold">@{userInfo?.username || 'username'}</p>
          )}
        </div>

        {/* Email */}
        <div className="bg-[#2a2a2a] border border-white/10 rounded-xl p-5 shadow">
          <h4 className="text-gray-400 text-xs mb-1">Email</h4>
          <p className="text-white text-lg">{userInfo?.email || 'No email'}</p>
        </div>

        {/* Profile Image */}
        <div className="bg-[#2a2a2a] border border-white/10 rounded-xl p-5 shadow">
          <h4 className="text-gray-400 text-xs mb-1">Profile Image URL</h4>
          {isEditing ? (
            <input
              type="url"
              value={userInfo?.profileImage || ''}
              onChange={(e) => handleChange('profileImage', e.target.value)}
              className="bg-transparent border-b border-white/20 text-white text-lg font-semibold focus:outline-none"
            />
          ) : (
            <div className="flex items-center gap-3">
              <Image src={imageSrc} alt="Profile" width={40} height={40} className="rounded-full border border-white/10" />
              <span className="text-white text-sm truncate">{userInfo?.profileImage || 'Not Set'}</span>
            </div>
          )}
        </div>
      </div>

      {/* Wallet Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Wallet Address */}
        <div className="bg-[#2a2a2a] border border-white/10 rounded-xl p-5 shadow">
          <h4 className="text-white text-sm mb-2">Wallet Address</h4>
          <div className="flex flex-col gap-2">
            <p className="text-sm text-gray-300 break-all">{maskedAddress || 'Not connected'}</p>
            <div className="flex gap-2">
              <button onClick={toggleMask} className="text-xs px-3 py-1 rounded-md border border-white/20 text-white hover:bg-white/10">
                {masked ? 'Show' : 'Hide'}
              </button>
              <button onClick={handleCopy} className="text-xs px-3 py-1 rounded-md border border-white/20 text-white hover:bg-white/10">
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
