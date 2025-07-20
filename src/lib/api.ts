// lib/api.ts

const BASE_URL = 'http://metro.proxy.rlwy.net:34259/api';

export const getUser = async (walletAddress: string) => {
  try {
    const res = await fetch(`${BASE_URL}/users/${walletAddress}`);
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`getUser API ${res.status}`);
    return res.json();
  } catch (err) {
    console.warn('getUser network/error:', err);
    return null;
  }
};

export const createUser = async (user: {
  walletAddress: string;
  userName: string;
  email: string;
  phoneNumber: string;
}) => {
  const res = await fetch(`${BASE_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`createUser ${res.status}: ${text}`);
  }

  return res.json();
};

export const getAllCertificates = async () => {
  const res = await fetch(`${BASE_URL}/certificates`);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`getAllCertificates ${res.status}: ${text}`);
  }
  return res.json();
};

export const getCertificatesByOwner = async (address: string) => {
  const res = await fetch(`${BASE_URL}/certificates/owner/${address}`);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`getCertificatesByOwner ${res.status}: ${text}`);
  }
  return res.json();
};

export const getCertificateByTokenId = async (tokenId: string) => {
  const res = await fetch(`${BASE_URL}/certificates/${tokenId}`);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`getCertificateByTokenId ${res.status}: ${text}`);
  }
  return res.json();
};

export const mintCertificate = async (payload: {
  recipientAddress: string;
  tokenURI: string;
}) => {
  const res = await fetch(`${BASE_URL}/certificates/mint`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`mintCertificate ${res.status}: ${text}`);
  }

  return res.json();
};
