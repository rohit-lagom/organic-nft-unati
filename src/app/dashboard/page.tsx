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
}

export default function DashboardPage() {
  const { userInfo: web3User } = useWeb3AuthUser();
  const { address, connector } = useAccount();
  const { data: balanceData } = useBalance({ address });

  const [userInfo, setUserInfo] = useState<Partial<AuthUserInfo> | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [masked, setMasked] = useState(true);
  const [networkName, setNetworkName] = useState<string>('Loading...');
  const [copied, setCopied] = useState(false);

  // Load User Info
  useEffect(() => {
    if (web3User) {
      localStorage.setItem('organic-user', JSON.stringify(web3User));
      setUserInfo(web3User);
    } else {
      const cached = localStorage.getItem('organic-user');
      if (cached) {
        setUserInfo(JSON.parse(cached));
      }
    }
  }, [web3User]);

  // ✅ Load Wallet Address (wagmi + Web3Auth fallback)
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
          const web3AuthAddress = await signer.getAddress();
          setWalletAddress(web3AuthAddress);
          localStorage.setItem('organic-wallet', web3AuthAddress);
        } catch (err) {
          console.error('Failed to fetch Web3Auth wallet address', err);
        }
      } else {
        const cached = localStorage.getItem('organic-wallet');
        if (cached) setWalletAddress(cached);
      }
    };
    loadWallet();
  }, [address, connector]);

  // Fetch Network Name
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

  const maskedAddress =
    walletAddress && masked ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : walletAddress;

  const imageSrc = userInfo?.profileImage || '/Avatar.jpg';

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image src={imageSrc} alt="User Avatar" width={56} height={56} className="rounded-full border border-white/10" />
          <div>
            <h2 className="text-lg font-semibold text-white">
              Welcome, {userInfo?.name || 'Anonymous'}
            </h2>
            <p className="text-gray-400 text-sm">{userInfo?.email || 'No email'}</p>
          </div>
        </div>
        <LogoutButton />
      </div>

      {/* Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Wallet */}
        <div className="bg-[#2a2a2a] border border-white/10 rounded-xl p-5 shadow">
          <h4 className="text-white text-sm mb-2">Wallet Address</h4>
          <div className="flex flex-col gap-2">
            <p className="text-sm text-gray-300 break-all">{maskedAddress || 'Not connected'}</p>
            <div className="flex gap-2">
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
