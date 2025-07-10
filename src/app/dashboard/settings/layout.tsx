'use client';

import { ReactNode, useEffect } from 'react';
import { useWeb3AuthUser } from '@web3auth/modal/react';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { userInfo } = useWeb3AuthUser();
  const { address } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (!userInfo?.email && !address) {
      router.replace('/'); 
    }
  }, [userInfo, address, router]);

  return (
    <div className="flex min-h-screen bg-[#242424] text-white">

      <div className="flex-1 flex flex-col">

        <main className="flex-1 p-6 md:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
