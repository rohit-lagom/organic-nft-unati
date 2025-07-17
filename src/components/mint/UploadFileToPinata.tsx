'use client';

import { useState } from 'react';

export default function UploadFileToPinata() {
  const [certName, setCertName] = useState('');
  const [message, setMessage] = useState('');
  const [ipfsHash, setIpfsHash] = useState('');
  const [metadataHash, setMetadataHash] = useState('');
  const [minting, setMinting] = useState(false);
  const [minted, setMinted] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !certName.trim()) {
      setMessage('❌ Please enter certificate name and select a file');
      return;
    }

    setPreviewUrl(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', certName);

    try {
      setMessage('⏳ Uploading file...');
      const res = await fetch('/api/pinata/upload-file', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data.IpfsHash) {
        setIpfsHash(data.IpfsHash);
        setMessage('✅ Image uploaded! Pinning metadata...');
        await pinMetadata(data.IpfsHash);
      } else {
        handleApiError('Upload failed', data);
      }
    } catch (err) {
      console.error(err);
      setMessage('❌ Upload error');
    }
  };

  const pinMetadata = async (imageHash: string) => {
    const metadata = {
      name: certName,
      image: `ipfs://${imageHash}`,
      description: `Certificate for ${certName}`,
    };

    try {
      const res = await fetch('/api/pinata/pin-json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(metadata),
      });

      const data = await res.json();
      if (res.ok && data.IpfsHash) {
        setMetadataHash(data.IpfsHash);
        setMessage('✅ Metadata pinned to IPFS');
      } else {
        handleApiError('Metadata pin failed', data);
      }
    } catch (err) {
      console.error(err);
      setMessage('❌ Metadata pin error');
    }
  };

  const handleMint = async () => {
    if (!metadataHash) return;

    try {
      setMinting(true);
      setMessage('⛏️ Minting NFT...');

      const res = await fetch('/api/pinata/mint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ metadataHash }),
      });

      const data = await res.json();

      if (res.ok) {
        setMinted(true);
        setMessage('🎉 NFT Minted Successfully!');
      } else {
        handleApiError('Mint failed', data);
      }
    } catch (err) {
      console.error(err);
      setMessage('❌ Mint error');
    } finally {
      setMinting(false);
    }
  };

  const handleApiError = (prefix: string, data: any) => {
    const errorText =
      typeof data?.error === 'string'
        ? data.error
        : JSON.stringify(data?.error || data);
    setMessage(`❌ ${prefix}: ${errorText}`);
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-16 bg-[#242424]">
      <div className="w-full max-w-2xl bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-10 space-y-6 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold">
          Mint <span className="text-purple-500">Organic Certificate</span>
        </h2>

        <input
          type="text"
          placeholder="Certificate Name"
          value={certName}
          onChange={(e) => setCertName(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700"
        />

        {previewUrl && (
          <div>
            <p className="text-sm text-gray-300 mb-2">🖼 Image Preview:</p>
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full max-h-64 object-contain border border-white/20 rounded-xl"
            />
          </div>
        )}

        {message && <p className="text-sm text-purple-300">{message}</p>}

        {ipfsHash && (
          <p className="text-sm text-green-400 break-words">
            🖼 Image IPFS:{' '}
            <a
              href={`https://gateway.pinata.cloud/ipfs/${ipfsHash}`}
              target="_blank"
              rel="noreferrer"
              className="underline break-all"
            >
              {ipfsHash}
            </a>
          </p>
        )}

        {metadataHash && (
          <>
            <p className="text-sm text-blue-400 break-words">
              📄 Metadata IPFS:{' '}
              <a
                href={`https://gateway.pinata.cloud/ipfs/${metadataHash}`}
                target="_blank"
                rel="noreferrer"
                className="underline break-all"
              >
                {metadataHash}
              </a>
            </p>

            <button
              onClick={handleMint}
              disabled={minting || minted}
              className={`mt-4 w-full py-3 rounded-xl font-semibold transition-all ${
                minting || minted
                  ? 'bg-gray-500 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {minting ? '⛏️ Minting...' : minted ? '✅ Minted' : 'Mint NFT'}
            </button>
          </>
        )}
      </div>
    </section>
  );
}
