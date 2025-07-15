'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

export default function VerifyCertificateModal({ isOpen, onClose }: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);

  const certificates = [
    {
      title: 'Unati Apple Cider Vinegar',
      issuer: 'UAMMCL Organization',
      issuedBy: 'Government Authority',
    },
    {
      title: 'Unati Apple Cider Vinegar',
      issuer: 'Organics India LTD',
      issuedBy: 'Government Authority',
    },
    {
      title: 'Unati Apple Cider Vinegar',
      issuer: 'UTHAAN',
      issuedBy: 'Government of India',
    },
  ];

  const handleSearch = () => {
    if (query.toLowerCase().includes('unati apple cider vinegar')) {
      setResults(certificates);
    } else {
      setResults([]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black bg-opacity-70 flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-lg overflow-hidden relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-700 hover:text-black"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-6 sm:p-8">
          <h2 className="text-2xl font-bold mb-4 text-center text-black">
            Verify Certificate
          </h2>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <input
              type="text"
              placeholder="Search for a certificate..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              onClick={handleSearch}
              className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition"
            >
              Search
            </button>
          </div>

          {results.length > 0 && (
            <div className="mt-6 space-y-4">
              {results.map((result, idx) => (
                <div
                  key={idx}
                  className="p-4 border border-gray-200 rounded-md shadow-sm bg-gray-50"
                >
                  <p className="text-lg font-semibold text-gray-900">{result.title}</p>
                  <p className="text-sm text-gray-700">
                    Issuer: {result.issuer}
                  </p>
                  <p className="text-sm text-gray-600">
                    Issued By: {result.issuedBy}
                  </p>
                </div>
              ))}
            </div>
          )}

          {results.length === 0 && query && (
            <p className="mt-6 text-center text-sm text-gray-500">No certificates found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
