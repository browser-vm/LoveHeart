/**
 * Link encryption utility to make tracking more difficult
 * Uses a simple encryption method that can be enhanced for production
 */

// A simple encryption key (in production, use a more secure approach)
const ENCRYPTION_KEY = "love-heart-secure-links";

/**
 * Encrypts a URL using a basic XOR cipher
 * @param url The URL to encrypt
 * @returns The encrypted URL as a base64 string
 */
export function encryptUrl(url: string): string {
  if (!url) return "";
  
  // Simple XOR encryption
  const encrypted = Array.from(url)
    .map((char, i) => {
      const keyChar = ENCRYPTION_KEY[i % ENCRYPTION_KEY.length];
      return String.fromCharCode(char.charCodeAt(0) ^ keyChar.charCodeAt(0));
    })
    .join("");
  
  // Convert to base64 for URL safety
  return btoa(encrypted);
}

/**
 * Decrypts an encrypted URL
 * @param encryptedUrl The encrypted URL (base64 string)
 * @returns The original URL
 */
export function decryptUrl(encryptedUrl: string): string {
  if (!encryptedUrl) return "";
  
  try {
    // Decode from base64
    const encrypted = atob(encryptedUrl);
    
    // Reverse the XOR encryption
    return Array.from(encrypted)
      .map((char, i) => {
        const keyChar = ENCRYPTION_KEY[i % ENCRYPTION_KEY.length];
        return String.fromCharCode(char.charCodeAt(0) ^ keyChar.charCodeAt(0));
      })
      .join("");
  } catch (error) {
    console.error("Failed to decrypt URL:", error);
    return "";
  }
}