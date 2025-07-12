'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAccount } from 'wagmi';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isConnected, address } = useAccount();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const logoutIntent = localStorage.getItem('logout_intent');

      if (!isConnected || !address) {
        if (!logoutIntent) {
          router.replace('/?wallet=false');
        } else {
          localStorage.removeItem('logout_intent');
          router.replace('/');
        }
      } else {
        setChecked(true);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [isConnected, address, router]);

  if (!checked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#161616] to-[#1e1e1e] text-white px-6">
        <div className="text-center space-y-5">
          <div className="w-14 h-14 mx-auto animate-spin rounded-full border-4 border-purple-500 border-t-transparent" />
          <h2 className="text-xl font-semibold text-white/90">Verifying Wallet Connection</h2>
          <p className="text-white/60 text-sm">
            Please wait while we securely verify your wallet address…
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
