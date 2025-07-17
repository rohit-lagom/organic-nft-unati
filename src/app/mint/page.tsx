'use client';

import { Navbar } from '@/components/home/navbar/navbar';
import UploadFileToPinata from '@/components/mint/UploadFileToPinata';

export default function MintPage() {
  return (
    <main className="min-h-screen bg-[#242424]">
      <Navbar />
      <UploadFileToPinata />
    </main>
  );
}
