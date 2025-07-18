'use client';

import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1a1a] text-white text-center p-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">🛑 Certificate Not Found</h1>
        <p className="text-gray-400 mb-6">
          The requested IPFS hash does not exist or is invalid.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => router.back()}
            className="bg-white/10 cursor-pointer hover:bg-white/20 text-white py-2 px-4 rounded-lg transition"
          >
            ← Go Back
          </button>

          <button
            onClick={() => router.push('/')}
            className="bg-purple-600 cursor-pointer hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition"
          >
            🏠 Go Home
          </button>
        </div>
      </div>
    </div>
  );
}
