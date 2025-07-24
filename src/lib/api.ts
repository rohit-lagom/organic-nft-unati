const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ;

function authHeaders(): Record<string, string> {
  const token = sessionStorage.getItem('auth_token');
  console.log('JWT token used for Authorization:', token); // Debug log
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function mintCertificate(recipientAddress: string, tokenURI: string) {
  const res = await fetch(`${BASE_URL}/certificates/mint`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify({ recipientAddress, tokenURI }),
  });
  if (!res.ok) throw new Error('Failed to mint certificate');
  return res.json();
}

export async function getAllCertificates() {
  const res = await fetch(`${BASE_URL}/certificates`, { headers: authHeaders() });
  if (!res.ok) throw new Error('Failed to fetch certificates');
  return res.json();
}

export async function getCertificatesByOwner(address: string) {
  const res = await fetch(`${BASE_URL}/certificates/owner/${address}`, { headers: authHeaders() });
  if (!res.ok) throw new Error('Failed to fetch owner certificates');
  return res.json();
}

export async function getCertificateByTokenId(tokenId: string) {
  const res = await fetch(`${BASE_URL}/certificates/${tokenId}`, { headers: authHeaders() });
  if (!res.ok) throw new Error('Certificate not found');
  return res.json();
}

export async function createUser(user: { walletAddress: string, userName: string, email: string, phoneNumber: string }) {
  const res = await fetch(`${BASE_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error('Failed to create user');
  return res.json();
}

export async function updateUser(walletAddress: string, updates: { userName?: string, email?: string, phoneNumber?: string }) {
  const res = await fetch(`${BASE_URL}/users`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify({ walletAddress, ...updates }),
  });
  if (!res.ok) throw new Error('Failed to update user');
  return res.json();
}

export async function getUser(walletAddress: string) {
  const res = await fetch(`${BASE_URL}/users/${walletAddress}`, { headers: authHeaders() });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error('Failed to fetch user');
  return res.json();
} 