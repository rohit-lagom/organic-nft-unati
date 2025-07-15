'use client';

import { useState, useMemo } from 'react';
import { X } from 'lucide-react';

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
    if (text) setQuery(text); // update input if clicked suggestion
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/70 flex items-center justify-center p-4 sm:p-6">
      <div className="bg-[#1e1e1e] text-white w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-6 sm:p-8">
          <h2 className="text-2xl font-bold mb-4 text-center">Verify Certificate</h2>

          <div className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="Search for a certificate..."
              className="px-4 py-2 bg-[#2c2c2c] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-gray-400"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSearch();
              }}
            />

            {/* Suggestions */}
            {query && filteredSuggestions.length > 0 && (
              <div className="bg-[#2c2c2c] border border-gray-700 rounded-md divide-y divide-gray-700">
                {filteredSuggestions.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSearch(`${item.title} ${item.issuer}`)}
                    className="w-full text-left px-4 py-2 hover:bg-purple-800 text-sm"
                  >
                    {item.title} – <span className="text-gray-400">{item.issuer}</span>
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
                  className="p-4 border border-white/10 rounded-md shadow-sm bg-[#2c2c2c]"
                >
                  <p className="text-lg font-semibold">{result.title}</p>
                  <p className="text-sm text-gray-400">Issuer: {result.issuer}</p>
                  <p className="text-sm text-gray-500">Issued By: {result.issuedBy}</p>
                </div>
              ))}
            </div>
          )}

          {results.length === 0 && query && (
            <p className="mt-6 text-center text-sm text-gray-400">No certificates found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
