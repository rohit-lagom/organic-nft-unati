'use client';

import { useWeb3AuthDisconnect } from '@web3auth/modal/react';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { useState } from 'react';

export default function LogoutButton() {
  const { disconnect, loading } = useWeb3AuthDisconnect();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogout = async () => {
    try {
      await disconnect();
      localStorage.removeItem('organic-user');
      localStorage.removeItem('organic-wallet');
      router.push('/');
    } catch (err: unknown) {
      console.error(err);
      setError('Logout failed');
    }
  };

  return (
    <div className="relative z-50">
      {/* Logout Button */}
      <button
        onClick={() => setShowConfirm(true)}
        disabled={loading}
        className="flex items-center cursor-pointer gap-2 px-4 py-2 rounded-md border border-white/20 text-sm text-white hover:bg-white/10 transition disabled:opacity-50"
      >
        <LogOut className="w-4 h-4" />
        {loading ? 'Logging out...' : 'Logout'}
      </button>

      {/* Error Display */}
      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-[#1e1e1e] border border-white/10 rounded-xl shadow-lg w-full max-w-sm p-6 text-white">
            <h3 className="text-lg font-semibold mb-2">Confirm Logout</h3>
            <p className="text-sm text-gray-400 mb-4">Are you sure you want to log out?</p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 text-sm rounded-md border border-white/20 hover:bg-white/10 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded-md transition"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
