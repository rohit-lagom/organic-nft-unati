// mobile-nav.tsx
'use client';

import Button from '@/components/common/button/button';
import LogoutButton from '@/components/common/button/logout-button';

export default function MobileNav({
  menuOpen,
  navLinks,
  isConnected,
  walletAddress,
  connect,
  loading,
  setMenuOpen,
  router,
}: any) {
  const maskedAddress = walletAddress
    ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
    : '';

  if (!menuOpen) return null;

  return (
    <div className="md:hidden bg-[#242424] border-t border-white/10 p-6 space-y-4 text-white text-base">
      {navLinks.map(({ label, href }: any) => (
        <button
          key={label}
          onClick={async () => {
            if (label === 'Dashboard') {
              if (isConnected && walletAddress) {
                router.push('/dashboard');
              } else {
                await connect();
              }
            } else {
              router.push(href);
            }
            setMenuOpen(false);
          }}
          className="block w-full text-left hover:text-purple-400 transition"
        >
          {label}
        </button>
      ))}

      {isConnected && walletAddress ? (
        <div className="space-y-2">
          <Button fullWidth>{maskedAddress}</Button>
          <LogoutButton />
        </div>
      ) : (
        <Button
          fullWidth
          onClick={async () => {
            await connect();
            setMenuOpen(false);
          }}
          disabled={loading}
        >
          {loading ? 'Connecting...' : 'Connect Wallet'}
        </Button>
      )}
    </div>
  );
}
