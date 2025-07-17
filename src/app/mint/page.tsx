'use client';

import { Navbar } from '@/components/home/navbar/navbar';
import MintCertificate from '@/components/mint/MintCertificate';

export default function MintPage() {
  return (
    <main className="min-h-screen bg-[#242424]">
      <Navbar />
      <MintCertificate />
    </main>
  );
}
