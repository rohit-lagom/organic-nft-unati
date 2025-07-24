'use client';

import { useState } from 'react';
import { mintCertificate, getCertificatesByOwner } from '@/lib/api';
import { useAuth } from '@/context/auth-context';
import { toast } from 'sonner';

export default function UploadFileToPinata() {
  const [certName, setCertName] = useState('');
  const [message, setMessage] = useState('');
  const [ipfsHash, setIpfsHash] = useState('');
  const [metadataHash, setMetadataHash] = useState('');
  const [minting, setMinting] = useState(false);
  const [minted, setMinted] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [mintResult, setMintResult] = useState<any>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [transactionHash, setTransactionHash] = useState<string | null>(null);
 type APIErrorResponse = {
  error?: string | object;
};
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
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
        setMessage('✅ Metadata pinned to IPFS.');
      } else {
        handleApiError('Metadata pin failed', data);
      }
    } catch (err) {
      console.error(err);
      setMessage('❌ Metadata pin error.');
    }
  };

  const { walletAddress } = useAuth();

  const handleMint = async () => {
    if (!certName.trim() || !selectedFile) {
      toast.error('Please enter a certificate name and select an image file.');
      return;
    }
    if (!selectedFile.type.startsWith('image/')) {
      toast.error('Only image files are allowed.');
      return;
    }
    if (!walletAddress) {
      toast.error('Wallet address is required to mint.');
      return;
    }
    setMinting(true);
    setMessage('⏳ Uploading file...');
    try {
      // 1. Upload image to IPFS
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('name', certName);
      const uploadRes = await fetch('/api/pinata/upload-file', {
        method: 'POST',
        body: formData,
      });
      const uploadData = await uploadRes.json();
      if (!uploadRes.ok || !uploadData.IpfsHash) {
        handleApiError('Upload failed', uploadData);
        setMinting(false);
        return;
      }
      setIpfsHash(uploadData.IpfsHash);
      setMessage('✅ Image uploaded! Pinning metadata...');
      // 2. Pin metadata
      const metadata = {
        name: certName,
        image: `ipfs://${uploadData.IpfsHash}`,
        description: `Certificate for ${certName}`,
      };
      const metaRes = await fetch('/api/pinata/pin-json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(metadata),
      });
      const metaData = await metaRes.json();
      if (!metaRes.ok || !metaData.IpfsHash) {
        handleApiError('Metadata pin failed', metaData);
        setMinting(false);
        return;
      }
      setMetadataHash(metaData.IpfsHash);
      setMessage('✅ Metadata pinned to IPFS. Minting NFT...');
      // 3. Mint NFT
      const tokenURI = `https://gateway.pinata.cloud/ipfs/${metaData.IpfsHash}`;
      const result = await mintCertificate(walletAddress, tokenURI);
      setMinted(true);
      setMintResult(result);
      setMessage('🎉 NFT Minted Successfully!');
      toast.success('NFT Minted Successfully!');
      // Fetch transaction hash from certificates
      try {
        const certs = await getCertificatesByOwner(walletAddress);
        const cert = certs.find((c: { tokenId: number }) => c.tokenId === result.tokenId);
        if (cert && cert.transactionHash) {
          setTransactionHash(cert.transactionHash);
        }
      } catch {
        setTransactionHash(null);
      }
    } catch (err: unknown) {
      setMessage('❌ Mint error.');
      toast.error('Mint error.');
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error(err);
      }
    } finally {
      setMinting(false);
    }
  };

 

const handleApiError = (prefix: string, data: unknown) => {
  let errorText = '';
  if (typeof data === 'object' && data !== null && 'error' in data) {
    const errVal = (data as { error?: unknown }).error;
    errorText = typeof errVal === 'string' ? errVal : JSON.stringify(errVal);
  } else {
    errorText = JSON.stringify(data);
  }
  setMessage(`❌ ${prefix}: ${errorText}`);
};


  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-16 bg-[#242424]">
      <div className="w-full max-w-2xl bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-10 space-y-6 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold">
          Mint <span className="text-purple-500">Organic Certificate</span>
        </h2>

        {!minted && (
          <>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Certificate Name"
                value={certName}
                onChange={(e) => setCertName(e.target.value)}
                disabled={uploading || minting}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
              />

              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={uploading || minting}
                className="w-full text-sm cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700 disabled:opacity-50"
              />
            </div>
            {message && <p className="text-sm text-purple-300">{message}</p>}
            {previewUrl && (
              <div className="transition-opacity duration-300">
                <p className="text-sm text-gray-300 mb-2">🖼 Image Preview:</p>
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full max-h-64 object-contain border border-white/20 rounded-xl"
                />
              </div>
            )}
            <button
              onClick={handleMint}
              disabled={minting || minted}
              className={`mt-4 w-full py-3 cursor-pointer rounded-xl font-semibold transition-all ${minting || minted
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {minting ? '⛏️ Minting...' : minted ? '✅ Minted' : 'Mint NFT'}
            </button>
          </>
        )}

        {minted && mintResult && (
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-green-400">NFT Minted!</h3>
            <p className="text-sm text-purple-300">Your certificate NFT has been minted successfully.</p>
            <img
              src={`https://gateway.pinata.cloud/ipfs/${ipfsHash}`}
              alt="Minted Certificate"
              className="w-full max-h-64 object-contain border border-white/20 rounded-xl mx-auto"
            />
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
            <p className="text-sm text-yellow-400 break-words">
              🏷 Token ID: {mintResult.tokenId}
            </p>
            {transactionHash && (
              <p className="text-sm text-yellow-400 break-words">
                🔗 Transaction Hash:{' '}
                <a
                  href={`https://mumbai.polygonscan.com/tx/${transactionHash}`}
                  target="_blank"
                  rel="noreferrer"
                  className="underline break-all"
                >
                  {transactionHash}
                </a>
              </p>
            )}
            <button
              className="mt-4 w-full py-3 cursor-pointer rounded-xl font-semibold bg-purple-600 hover:bg-purple-700"
              onClick={() => {
                setCertName('');
                setMessage('');
                setIpfsHash('');
                setMetadataHash('');
                setMinted(false);
                setPreviewUrl(null);
                setMintResult(null);
                setSelectedFile(null);
                setTransactionHash(null);
              }}
            >
              Mint Another NFT
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
