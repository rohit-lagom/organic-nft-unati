'use client';

import { useState, useMemo } from 'react';
import { X } from 'lucide-react';
import Image from 'next/image';

import left1 from '@/assets/images/hero/left1.svg';
import left3 from '@/assets/images/hero/left3.svg';
import right2 from '@/assets/images/hero/right2.svg';

export default function VerifyCertificateModal({
  isOpen,
  onClose,
}: {
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
      image: left1,
    },
    {
      title: 'Unati Apple Cider Vinegar',
      issuer: 'Organics India LTD',
      issuedBy: 'Government Authority',
      image: left3,
    },
    {
      title: 'Unati Apple Cider Vinegar',
      issuer: 'UTHAAN',
      issuedBy: 'Government of India',
      image: right2,
    },
  ];

  const filteredSuggestions = useMemo(() => {
    const q = query.toLowerCase();
    return certificates.filter(cert =>
      `${cert.title} ${cert.issuer}`.toLowerCase().includes(q)
    );
  }, [query]);

  const handleSearch = (text?: string) => {
    const q = (text || query).toLowerCase();
    const found = certificates.filter(cert =>
      `${cert.title} ${cert.issuer}`.toLowerCase().includes(q)
    );
    setResults(found);
    if (text) setQuery(text);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/70 flex items-center justify-center px-4 sm:px-6 py-6 overflow-y-auto">
      <div className="bg-[#1e1e1e] text-white w-full max-w-2xl rounded-2xl shadow-xl relative">
        {/* Close button */}
        <button
          onClick={() => {
            setQuery('');
            setResults([]);
            onClose();
          }}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal content */}
        <div className="p-5 sm:p-8">
          <h2 className="text-2xl font-bold mb-4 text-center">Verify Certificate</h2>

          {/* Input field + Suggestions */}
          <div className="flex flex-col gap-2 relative">
            <input
              type="text"
              placeholder="Search for a certificate..."
              className="px-4 py-2 bg-[#2c2c2c] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-gray-400 w-full"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSearch();
              }}
            />

            {/* Suggestions */}
            {query && filteredSuggestions.length > 0 && results.length === 0 && (
              <div className="absolute top-full mt-2 w-full bg-[#2c2c2c] border border-gray-700 rounded-md divide-y divide-gray-700 z-50 max-h-60 overflow-y-auto shadow-lg">
                {filteredSuggestions.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSearch(`${item.title} ${item.issuer}`)}
                    className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-purple-800 cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-md overflow-hidden shrink-0">
                      <Image
                        src={item.image}
                        alt={item.issuer}
                        width={40}
                        height={40}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium truncate">{item.title}</p>
                      <p className="text-xs text-gray-400 truncate">{item.issuer}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Results */}
          {results.length > 0 && (
            <div className="mt-6 space-y-4">
              {results.map((result, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 p-4 border border-white/10 rounded-md shadow-sm bg-[#2c2c2c] cursor-pointer"
                >
                  <div className="w-16 h-16 rounded-md overflow-hidden shrink-0">
                    <Image
                      src={result.image}
                      alt={result.issuer}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-base font-semibold leading-tight">{result.title}</p>
                    <p className="text-sm text-gray-400">Issuer: {result.issuer}</p>
                    <p className="text-sm text-gray-500">Issued By: {result.issuedBy}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* No result */}
          {results.length === 0 && query && (
            <p className="mt-6 text-center text-sm text-gray-400">
              No certificates found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
