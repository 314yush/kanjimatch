import { ethers } from 'ethers';

// Read Alchemy API key from environment variable
const ALCHEMY_KEY = process.env.REACT_APP_ALCHEMY_KEY || 'YOUR_ALCHEMY_KEY';
const provider = new ethers.JsonRpcProvider(
  `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_KEY}`
);

export async function fetchENS(address: string): Promise<string | null> {
  const cacheKey = `ens_${address}`;
  const cached = localStorage.getItem(cacheKey);
  if (cached !== null) return cached === 'null' ? null : cached;
  try {
    const ens = await provider.lookupAddress(address);
    localStorage.setItem(cacheKey, ens ?? 'null');
    return ens;
  } catch (e) {
    localStorage.setItem(cacheKey, 'null');
    return null;
  }
}

// Helper to stagger ENS lookups for a list of addresses
export async function fetchENSStaggered(addresses: string[], delayMs = 300): Promise<{ [address: string]: string | null }> {
  const results: { [address: string]: string | null } = {};
  for (const address of addresses) {
    results[address] = await fetchENS(address);
    await new Promise(res => setTimeout(res, delayMs));
  }
  return results;
} 