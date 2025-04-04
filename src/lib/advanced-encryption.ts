/**
 * Advanced encryption utilities for more secure link protection
 * This uses a combination of techniques to make tracking more difficult
 */

// A more complex key (in production, use environment variables)
const COMPLEX_KEY = "LoveHeart-Secure-Link-Protection-2023";

/**
 * Generates a random string of specified length
 */
function generateRandomString(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

/**
 * Advanced URL encryption with added noise and timestamp
 * @param url The URL to encrypt
 * @returns The encrypted URL as a base64 string
 */
export function advancedEncryptUrl(url: string): string {
  if (!url) return "";
  
  // Add timestamp and random noise to make each encryption unique
  const timestamp = Date.now().toString();
  const noise = generateRandomString(8);
  const dataToEncrypt = JSON.stringify({
    url,
    timestamp,
    noise
  });
  
  // More complex encryption using XOR with varying offsets
  const encrypted = Array.from(dataToEncrypt)
    .map((char, i) => {
      const keyChar = COMPLEX_KEY[(i + timestamp.length) % COMPLEX_KEY.length];
      const offset = (i % 7) + 1; // Varying offset
      return String.fromCharCode((char.charCodeAt(0) ^ keyChar.charCodeAt(0)) + offset);
    })
    .join("");
  
  // Convert to base64 and replace characters that might cause URL issues
  return btoa(encrypted)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

/**
 * Decrypts an advanced encrypted URL
 * @param encryptedUrl The encrypted URL (modified base64 string)
 * @returns The original URL or empty string if invalid
 */
export function advancedDecryptUrl(encryptedUrl: string): string {
  if (!encryptedUrl) return "";
  
  try {
    // Restore base64 standard characters
    const base64 = encryptedUrl
      .replace(/-/g, '+')
      .replace(/_/g, '/');
    
    // Add padding if needed
    const padding = base64.length % 4;
    const paddedBase64 = padding ? 
      base64 + '='.repeat(4 - padding) : 
      base64;
    
    // Decode from base64
    const encrypted = atob(paddedBase64);
    
    // Reverse the complex encryption
    const decrypted = Array.from(encrypted)
      .map((char, i) => {
        const keyChar = COMPLEX_KEY[i % COMPLEX_KEY.length];
        const offset = (i % 7) + 1;
        return String.fromCharCode((char.charCodeAt(0) - offset) ^ keyChar.charCodeAt(0));
      })
      .join("");
    
    // Parse the JSON data
    const data = JSON.parse(decrypted);
    
    // Validate timestamp (optional: could check if timestamp is within acceptable range)
    return data.url;
  } catch (error) {
    console.error("Failed to decrypt URL:", error);
    return "";
  }
}

/**
 * Checks if a URL should be encrypted
 * @param url The URL to check
 * @returns Boolean indicating if URL should be encrypted
 */
export function shouldEncryptUrl(url: string): boolean {
  if (!url) return false;
  
  try {
    // Parse the URL
    const urlObj = new URL(url);
    
    // Don't encrypt relative URLs or same-origin URLs
    if (urlObj.origin === window.location.origin) {
      return false;
    }
    
    return true;
  } catch (e) {
    // If URL parsing fails, assume it's a relative path
    return false;
  }
}