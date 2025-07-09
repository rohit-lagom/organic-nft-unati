'use client';

import { useWeb3AuthUser } from '@web3auth/modal/react';
import { useAccount, useBalance } from 'wagmi';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { formatEther } from 'viem';
import LogoutButton from '@/components/common/button/logout-button';

interface AuthUserInfo {
  name?: string;
  email?: string;
  profileImage?: string;
}

export default function DashboardPage() {
  const { userInfo: web3User } = useWeb3AuthUser();
  const { address: liveAddress, connector } = useAccount();
  const { data: balanceData } = useBalance({ address: liveAddress });

  const [userInfo, setUserInfo] = useState<Partial<AuthUserInfo> | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [networkName, setNetworkName] = useState<string>('Loading...');
  const [copied, setCopied] = useState(false);
  const [loginTime, setLoginTime] = useState({ utc: '', local: '' });

  // Handle userInfo from Web3Auth or localStorage
  useEffect(() => {
    if (web3User?.email) {
      localStorage.setItem('organic-user', JSON.stringify(web3User));
      setUserInfo(web3User);
    } else {
      const cached = localStorage.getItem('organic-user');
      if (cached) {
        try {
          setUserInfo(JSON.parse(cached));
        } catch {
          localStorage.removeItem('organic-user');
        }
      }
    }
  }, [web3User]);

  // Handle wallet address from Wagmi or localStorage
  useEffect(() => {
    if (liveAddress) {
      localStorage.setItem('organic-wallet', liveAddress);
      setWalletAddress(liveAddress);
    } else {
      const cachedAddress = localStorage.getItem('organic-wallet');
      if (cachedAddress) {
        setWalletAddress(cachedAddress);
      }
    }
  }, [liveAddress]);

  // Fetch chain/network name & login time
  useEffect(() => {
    const fetchNetwork = async () => {
      try {
        const provider = await connector?.getProvider();
        const chainIdHex = await (provider as any)?.request({ method: 'eth_chainId' });
        const chainId = parseInt(chainIdHex, 16);
        const networks: Record<number, string> = {
          1: 'Ethereum Mainnet',
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

    const now = new Date();
    setLoginTime({
      utc: now.toUTCString(),
      local: now.toLocaleString(),
    });
  }, [connector]);

  const handleCopy = async () => {
    if (walletAddress) {
      await navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const imageSrc = userInfo?.profileImage || '/Avatar.jpg';

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src={imageSrc}
            alt="User Avatar"
            width={56}
            height={56}
            className="rounded-full border border-white/10"
          />
          <div>
            <h2 className="text-lg font-semibold text-white">
              Welcome, {userInfo?.name || 'Anonymous'}
            </h2>
            <p className="text-gray-400 text-sm">{userInfo?.email || 'No email'}</p>
          </div>
        </div>
        <LogoutButton />
      </div>
                  <div className="bg-[#2a2a2a] border border-white/10 rounded-xl p-5 shadow col-span-1 md:col-span-3">
          <h4 className="text-white text-sm mb-2">Login Time</h4>
          <p className="text-white text-sm">UTC: {loginTime.utc}</p>
          <p className="text-white text-sm">Local: {loginTime.local}</p>
        </div>


      {/* Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Wallet Address */}
        <div className="bg-[#2a2a2a] border border-white/10 rounded-xl p-5 shadow">
          <h4 className="text-white text-sm mb-2">Wallet Address</h4>
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm text-gray-300 break-all">{walletAddress || 'Not connected'}</p>
            <button
              onClick={handleCopy}
              className="text-xs px-3 cursor-pointer py-1 rounded-md border border-white/20 text-white hover:bg-white/10 transition"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Balance */}
        <div className="bg-[#2a2a2a] border border-white/10 rounded-xl p-5 shadow">
          <h4 className="text-white text-sm mb-2">Balance</h4>
          <p className="text-white text-xl font-semibold">
            {balanceData ? `${formatEther(balanceData.value)} ${balanceData.symbol}` : 'Loading...'}
          </p>
        </div>

        {/* Network */}
        <div className="bg-[#2a2a2a] border border-white/10 rounded-xl p-5 shadow">
          <h4 className="text-white text-sm mb-2">Network</h4>
          <p className="text-white text-xl font-semibold">{networkName}</p>
        </div>

        {/* Login Time */}

      </div>
    </div>
  );
}
