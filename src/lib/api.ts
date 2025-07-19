// lib/api.ts

const API_BASE_URL = 'http://metro.proxy.rlwy.net:34259';

// ---------------------- USERS ----------------------

// Create new user
export const createUser = async ({
  walletAddress,
  userName,
  email,
  phoneNumber,
}: {
  walletAddress: string;
  userName?: string;
  email?: string;
  phoneNumber?: string;
}) => {
  const res = await fetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: '*/*',
    },
    body: JSON.stringify({
      walletAddress,
      userName: userName || '',
      email: email || '',
      phoneNumber: phoneNumber || '',
    }),
  });

  if (!res.ok) throw new Error('User creation failed');
  return res.json();
};

// Get user by wallet address
export const getUserByWallet = async (walletAddress: string) => {
  const res = await fetch(`${API_BASE_URL}/users/${walletAddress}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });

  if (res.status === 404) return null;
  if (!res.ok) throw new Error('Failed to fetch user');
  return res.json();
};

// Update user
export const updateUser = async ({
  walletAddress,
  userName,
  email,
  phoneNumber,
}: {
  walletAddress: string;
  userName?: string;
  email?: string;
  phoneNumber?: string;
}) => {
  const res = await fetch(`${API_BASE_URL}/users`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userName, email, phoneNumber }),
  });

  if (res.status === 404) throw new Error('User not found');
  if (!res.ok) throw new Error('User update failed');
  return res.json();
};

// ---------------------- CERTIFICATES ----------------------

// Mint certificate NFT
export const mintCertificate = async ({
  recipientAddress,
  tokenURI,
}: {
  recipientAddress: string;
  tokenURI: string;
}) => {
  const res = await fetch(`${API_BASE_URL}/certificates/mint`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: '*/*',
    },
    body: JSON.stringify({ recipientAddress, tokenURI }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Minting failed: ${errorText}`);
  }

  return res.json();
};

// Get all certificates
export const getAllCertificates = async () => {
  const res = await fetch(`${API_BASE_URL}/certificates`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });

  if (!res.ok) throw new Error('Failed to fetch certificates');
  return res.json();
};

// Get certificates for a specific owner (wallet address)
export const getCertificatesByOwner = async (walletAddress: string) => {
  const res = await fetch(`${API_BASE_URL}/certificates/owner/${walletAddress}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });

  if (!res.ok) throw new Error('Failed to fetch owner certificates');
  return res.json();
};

// Get certificate by Token ID
export const getCertificateByTokenId = async (tokenId: string) => {
  const res = await fetch(`${API_BASE_URL}/certificates/${tokenId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });

  if (res.status === 404) return null;
  if (!res.ok) throw new Error('Failed to fetch certificate by tokenId');
  return res.json();
};
