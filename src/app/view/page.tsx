'use client';

import { useEffect, useState } from 'react';

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
    <div className="p-6 max-w-6xl mx-auto min-h-screen bg-[#242424] text-white">
      <h1 className="text-3xl font-bold mb-8 text-white">
        🌿 All Organic Certificates
      </h1>

      {loading ? (
        <p className="text-gray-300">⏳ Loading pins...</p>
      ) : pins.length === 0 ? (
        <p className="text-red-400">⚠️ No pinned files found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {pins.map((pin, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl hover:shadow-2xl transition-all p-4 space-y-3"
            >
              <img
                src={pin.image || `https://gateway.pinata.cloud/ipfs/${pin.ipfsHash}`}
                alt={pin.name || 'Organic Certificate'}
                className="w-full h-40 object-cover rounded-lg border border-white/10 bg-white/10"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://via.placeholder.com/300x160?text=No+Preview';
                }}
              />
              <h3 className="text-lg font-semibold text-white truncate">
                {pin.name || 'Untitled'}
              </h3>
              <p className="text-xs text-gray-300 break-all">
                <strong>Hash:</strong> {pin.ipfsHash}
              </p>
              <a
                href={`https://gateway.pinata.cloud/ipfs/${pin.ipfsHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-sm text-green-400 font-medium underline"
              >
                View on IPFS ↗
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
