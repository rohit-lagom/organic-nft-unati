'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isLoggedIn, hydrated } = useAuth();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!hydrated) return; // Wait for hydration
    if (!isLoggedIn) {
      router.replace('/'); // Or your login page
      return;
    }
    setChecked(true);
  }, [hydrated, isLoggedIn, router]);

  if (!hydrated || !checked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#161616] to-[#1e1e1e] text-white px-6">
        <div className="text-center space-y-5">
          <div className="w-14 h-14 mx-auto animate-spin rounded-full border-4 border-purple-500 border-t-transparent" />
          <h2 className="text-xl font-semibold text-white/90">Verifying session...</h2>
          <p className="text-white/60 text-sm">
            Please wait while we securely verify your session…
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
