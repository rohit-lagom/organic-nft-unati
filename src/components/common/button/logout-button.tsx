'use client';

import { useWeb3AuthDisconnect } from '@web3auth/modal/react';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function LogoutButton() {
  const { disconnect, loading } = useWeb3AuthDisconnect();
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    setShowConfirm(false);
    try {
      localStorage.setItem('logout_intent', 'true');
      await disconnect();
      localStorage.removeItem('organic-user');
      localStorage.removeItem('organic-wallet');
      router.push('/');
    } catch (err) {
      console.error(err);
      setError('Logout failed');
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (showConfirm) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showConfirm]);

  return (
    <div className="relative z-50">
      <button
        onClick={() => setShowConfirm(true)}
        disabled={loading}
        className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-md border border-white/20 text-sm text-white hover:bg-white/10 transition disabled:opacity-50"
      >
        <LogOut className="w-4 h-4" />
        {loading ? 'Logging out...' : 'Logout'}
      </button>

      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}

      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-sm bg-[#1e1e1e] border border-white/10 rounded-xl shadow-lg p-6 text-white">
            <h3 className="text-lg font-semibold mb-3">
              {isLoggingOut ? 'Logging out...' : 'Confirm Logout'}
            </h3>

            {!isLoggingOut && (
              <>
                <p className="text-sm text-gray-400 mb-4">
                  Are you sure you want to log out?
                </p>
                <div className="flex flex-col sm:flex-row justify-end gap-3">
                  <button
                    onClick={() => setShowConfirm(false)}
                    disabled={isLoggingOut}
                    className="w-full cursor-pointer sm:w-auto px-4 py-2 text-sm rounded-md border border-white/20 hover:bg-white/10 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="w-full cursor-pointer sm:w-auto px-4 py-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded-md transition"
                  >
                    Yes, Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
