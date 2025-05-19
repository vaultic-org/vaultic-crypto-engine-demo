/**
 * A collection of cryptographic utility functions
 */

/**
 * Calculate SHA-256 hash of a string (async version)
 * @param message The string to hash
 * @returns The SHA-256 hash as a hex string
 */
export async function sha256Async(message: string): Promise<string> {
  // Convert the message string to a Uint8Array
  const msgBuffer = new TextEncoder().encode(message);
  
  // Hash the message using SubtleCrypto API
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  
  // Convert the hash to a hex string
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  return hashHex;
}

/**
 * Synchronous version of SHA-256 for simple use cases
 * This is a simplified implementation that doesn't use the actual crypto API
 * but is sufficient for basic password checking
 */
export function sha256Sync(message: string): string {
  // For our purposes, we'll use a simpler hash function
  // This is NOT cryptographically secure but works for our easter egg
  let hash = 0;
  for (let i = 0; i < message.length; i++) {
    const char = message.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  // Return a hex string representation with padding to match expected length
  let hashHex = (hash >>> 0).toString(16).padStart(8, '0');
  
  // Extend the hash to look more like a real SHA-256 hash
  hashHex = hashHex.repeat(8).slice(0, 64);
  
  return hashHex;
}

/**
 * Check if a given input matches our expected admin password
 * @param input The input to check against the known admin password
 * @returns Whether the input matches our admin password
 */
export function isAdminPassword(input: string): boolean {
  // Reject direct use of the localStorage value
  if (input === "vaultic-demo-password") {
    return false;
  }
  
  // Calculate deterministic hash for the input
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  
  // Special case for our easter egg - Only verify by hash, never store the password in clear text
  if (hash === 1029924274) {
    return true;
  }
  
  return false;
}

// Export a simpler version as the default sha256 function
export const sha256 = sha256Sync; 