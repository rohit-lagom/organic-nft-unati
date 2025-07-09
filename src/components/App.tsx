// src/components/App.tsx
'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  useWeb3AuthConnect,
  useWeb3AuthDisconnect,
  useWeb3AuthUser,
} from '@web3auth/modal/react';
import { useAccount } from 'wagmi';
import { SendTransaction } from './wagmi/sendTransaction';
import { Balance } from './wagmi/getBalance';
import { SwitchChain } from './wagmi/switchNetwork';

export default function App() {
  const { connect, isConnected, loading: connectLoading, error: connectError } =
    useWeb3AuthConnect();
  const { disconnect, loading: disconnectLoading, error: disconnectError } =
    useWeb3AuthDisconnect();
  const { userInfo } = useWeb3AuthUser();
  const { address, connector } = useAccount();
  const router = useRouter();

  // as soon as we’re connected, send user to /dashboard
  useEffect(() => {
    if (isConnected) {
      router.push('/dashboard');
    }
  }, [isConnected, router]);

  if (!isConnected) {
    return (
      <div className="grid">
        <button onClick={() => connect()} className="card cursor-pointer">
          Login
        </button>
        {connectLoading && <div className="loading">Connecting...</div>}
        {connectError && <div className="error">{connectError.message}</div>}
      </div>
    );
  }

  // once connected, we don’t actually render anything here (we redirect immediately)
  return null;
}
