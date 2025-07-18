'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Pin {
  name: string;
  ipfsHash: string;
  image?: string;
}

export default function ViewPinsPage() {
  const [pins, setPins] = useState<Pin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPins = async () => {
      try {
        const res = await fetch('/api/pinata/pinList');
        const data = await res.json();

        if (res.ok && Array.isArray(data.pins)) {
          setPins(data.pins);
        } else {
          console.warn('Invalid pin data format');
          setPins([]);
        }
      } catch (err) {
        console.error('Fetch pins error:', err);
        setPins([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPins();
  }, []);

  return (
    <section className="min-h-screen bg-[#242424] text-white py-20 px-6 sm:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
          🌿 Certified Products on Chain
        </h1>
        <p className="text-gray-300 text-lg sm:text-xl max-w-3xl mx-auto mb-12">
          Browse the collection of certified organic NFTs minted and pinned to IPFS for transparency and public verification.
        </p>

        {loading ? (
          <p className="text-purple-400 text-lg">⏳ Loading certificates...</p>
        ) : pins.length === 0 ? (
          <p className="text-red-400 text-lg">⚠️ No pinned files found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {pins.map((pin, index) => (
              <Link
                key={index}
                href={`/view/${pin.ipfsHash}`}
                className="block bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl hover:shadow-2xl transition-all p-4 space-y-4"
              >
                <img
                  src={pin.image || `https://gateway.pinata.cloud/ipfs/${pin.ipfsHash}`}
                  alt={pin.name}
                  className="w-full h-48 object-cover rounded-xl border border-white/10 bg-white/10"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://via.placeholder.com/300x160?text=No+Preview';
                  }}
                />
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-white truncate">{pin.name}</h3>
                  <p className="text-sm text-gray-400 break-all">
                    <strong className="text-white">Hash:</strong> {pin.ipfsHash}
                  </p>
                  <span className="inline-block text-sm text-green-400 font-medium underline hover:text-green-300 transition">
                    View Certificate ↗
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
