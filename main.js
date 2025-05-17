import {
  generate_rsa_keypair_pem,
  rsa_encrypt_base64,
  rsa_decrypt_base64,
} from "vaultic-crypto-engine";

/**
 * Vaultic RSA Encryption/Decryption Demo
 *
 * This application demonstrates the capabilities of Vaultic's crypto engine:
 * - Secure generation of RSA 2048-bit key pairs
 * - Message encryption using public key cryptography
 * - Message decryption with protected private key operations
 * - Validation of the encryption/decryption workflow
 *
 * Built with vaultic-crypto-engine, a high-performance WebAssembly-powered
 * cryptographic library with robust security protections.
 *
 * @see https://github.com/vaultic-org/vaultic-crypto-engine
 * @license MIT © Vaultic Organization
 */

// Global variables
let currentKeyPair = null;

// DOM Elements
const messageInput = document.getElementById("message");
const generateKeysBtn = document.getElementById("generate-keys");
const encryptBtn = document.getElementById("encrypt");
const decryptBtn = document.getElementById("decrypt");
const publicKeyTextarea = document.getElementById("public-key");
const privateKeyTextarea = document.getElementById("private-key");
const encryptedTextarea = document.getElementById("encrypted");
const decryptedTextarea = document.getElementById("decrypted");
const logOutput = document.getElementById("log");
const keyOutput = document.getElementById("key-output");
const resultOutput = document.getElementById("result-output");
const loadingSpinner = document.getElementById("loading");
const copyPublicKeyBtn = document.getElementById("copy-public-key");
const copyPrivateKeyBtn = document.getElementById("copy-private-key");
const copyEncryptedBtn = document.getElementById("copy-encrypted");
const resetBtn = document.getElementById("reset");

/**
 * Adds a timestamped entry to the application log
 * @param {string} message - The message to be logged
 * @param {string} type - Log entry type: "info", "success", or "error"
 */
function log(message, type = "info") {
  const timestamp = new Date().toLocaleTimeString();
  const logEntry = document.createElement("div");
  logEntry.textContent = `[${timestamp}] ${message}`;

  if (type === "success") {
    logEntry.className = "log-entry success";
  } else if (type === "error") {
    logEntry.className = "log-entry error";
  } else {
    logEntry.className = "log-entry info";
  }

  logOutput.appendChild(logEntry);
  logOutput.scrollTop = logOutput.scrollHeight;
}

/**
 * Copy text from an element to clipboard
 * @param {HTMLElement} element - The element containing text to copy
 * @param {string} successMessage - Message to display on successful copy
 */
async function copyToClipboard(element, successMessage) {
  try {
    await navigator.clipboard.writeText(element.value);
    log(successMessage, "success");
  } catch (err) {
    log(`Failed to copy: ${err}`, "error");
  }
}

/**
 * Generates a new RSA key pair using Vaultic's crypto engine
 * and displays it in the UI
 */
async function generateKeys() {
  try {
    loadingSpinner.classList.add("active");
    log("Initializing Vaultic crypto engine...");
    log("Generating RSA 2048-bit key pair with secure entropy...");

    // Generate the key pair using vaultic-crypto-engine
    currentKeyPair = await generate_rsa_keypair_pem();

    // Display keys in the interface
    publicKeyTextarea.value = currentKeyPair.public_pem;
    privateKeyTextarea.value = currentKeyPair.private_pem;

    // Show the keys section
    keyOutput.classList.add("visible");
    encryptBtn.disabled = false;
    resetBtn.disabled = false;

    // Detailed logging
    log(
      `Vaultic RSA public key generated (${currentKeyPair.public_pem.length} chars)`
    );
    log(
      `Vaultic RSA private key generated (${currentKeyPair.private_pem.length} chars)`
    );
    log("Key pairs include Vaultic's additional Marvin attack protections");

    log("✅ Vaultic RSA key pair successfully generated!", "success");
  } catch (error) {
    log(`❌ Error in Vaultic key generation: ${error.message}`, "error");
    console.error("Complete error:", error);
  } finally {
    loadingSpinner.classList.remove("active");
  }
}

/**
 * Unified Vaultic encryption function - automatically handles data of any size
 * @param {string} publicKeyPem - RSA public key in PEM format
 * @param {string|Uint8Array} data - Data to encrypt (string or binary)
 * @returns {Promise<string>} - Encrypted data as an encoded string
 */
async function vaultic_encrypt(publicKeyPem, data) {
  // Convert to Uint8Array if it's a string
  const dataArray =
    typeof data === "string" ? new TextEncoder().encode(data) : data;

  // Determine max size for direct RSA (2048 bits = 256 bytes minus padding)
  const MAX_RSA_SIZE = 245; // For RSA-2048 with PKCS#1 v1.5 padding

  // Automatically choose the method based on data size
  if (dataArray.length <= MAX_RSA_SIZE) {
    // Simple case: use RSA directly
    if (typeof data === "string") {
      return rsa_encrypt_base64(publicKeyPem, data);
    } else {
      // Convert binary to string for RSA
      const dataString = new TextDecoder().decode(data);
      return rsa_encrypt_base64(publicKeyPem, dataString);
    }
  } else {
    // Complex case: use the hybrid approach
    const result = await hybrid_encrypt_internal(publicKeyPem, dataArray);

    // Format the result to be compatible with the existing API
    // Encode everything as JSON+Base64 for consistent handling
    return btoa(
      JSON.stringify({
        mode: "hybrid",
        iv: Array.from(result.iv),
        encryptedKey: result.encryptedAesKey,
        encryptedData: Array.from(new Uint8Array(result.encryptedData)),
      })
    );
  }
}

/**
 * Unified Vaultic decryption function - automatically handles data of any size
 * @param {string} privateKeyPem - RSA private key in PEM format
 * @param {string} encryptedData - Encrypted data as an encoded string
 * @returns {Promise<string>} - Decrypted data as a string
 */
async function vaultic_decrypt(privateKeyPem, encryptedData) {
  try {
    // First try to detect if it's a hybrid format
    const potentialJson = atob(encryptedData);
    const parsed = JSON.parse(potentialJson);

    if (parsed.mode === "hybrid") {
      // It's hybrid encryption
      const result = await hybrid_decrypt_internal(privateKeyPem, {
        iv: new Uint8Array(parsed.iv),
        encryptedAesKey: parsed.encryptedKey,
        encryptedData: new Uint8Array(parsed.encryptedData),
      });

      // Convert the result to a string
      return new TextDecoder().decode(result);
    }
  } catch (e) {
    // If we can't parse as JSON or if it's not hybrid,
    // it's probably direct RSA encryption
  }

  // Default case: direct RSA
  return rsa_decrypt_base64(privateKeyPem, encryptedData);
}

/**
 * Internal function for hybrid encryption (RSA + AES)
 * @param {string} publicKeyPem - RSA public key in PEM format
 * @param {Uint8Array} data - Data to encrypt
 * @returns {Promise<Object>} - Object containing encrypted data and key
 * @private
 */
async function hybrid_encrypt_internal(publicKeyPem, data) {
  // 1. Generate a random AES key (256 bits)
  const aesKey = crypto.getRandomValues(new Uint8Array(32));

  // 2. Generate a random IV for AES-GCM
  const iv = crypto.getRandomValues(new Uint8Array(12));

  // 3. Import the AES key into the Web Crypto API
  const cryptoKey = await window.crypto.subtle.importKey(
    "raw",
    aesKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt"]
  );

  // 4. Encrypt the data with AES-GCM
  const encryptedData = await window.crypto.subtle.encrypt(
    { name: "AES-GCM", iv: iv },
    cryptoKey,
    data
  );

  // 5. Encrypt the AES key with RSA (using the existing function)
  // Convert the AES key to Base64 to pass it to rsa_encrypt_base64
  const aesKeyBase64 = btoa(String.fromCharCode.apply(null, aesKey));
  const encryptedAesKey = rsa_encrypt_base64(publicKeyPem, aesKeyBase64);

  // 6. Return everything
  return {
    encryptedData: encryptedData,
    iv: iv,
    encryptedAesKey: encryptedAesKey,
  };
}

/**
 * Internal function for hybrid decryption (RSA + AES)
 * @param {string} privateKeyPem - RSA private key in PEM format
 * @param {Object} encryptedPackage - Package containing the encrypted data and key
 * @returns {Promise<Uint8Array>} - Decrypted data
 * @private
 */
async function hybrid_decrypt_internal(privateKeyPem, encryptedPackage) {
  // 1. Decrypt the AES key with RSA
  const aesKeyBase64 = rsa_decrypt_base64(
    privateKeyPem,
    encryptedPackage.encryptedAesKey
  );
  const aesKeyStr = atob(aesKeyBase64);
  const aesKey = new Uint8Array(aesKeyStr.length);
  for (let i = 0; i < aesKeyStr.length; i++) {
    aesKey[i] = aesKeyStr.charCodeAt(i);
  }

  // 2. Import the AES key into the Web Crypto API
  const cryptoKey = await window.crypto.subtle.importKey(
    "raw",
    aesKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["decrypt"]
  );

  // 3. Decrypt the data with AES-GCM
  const decryptedData = await window.crypto.subtle.decrypt(
    { name: "AES-GCM", iv: encryptedPackage.iv },
    cryptoKey,
    encryptedPackage.encryptedData
  );

  // 4. Return the decrypted data
  return new Uint8Array(decryptedData);
}

/**
 * Encrypts the input message using Vaultic's encryption
 * Automatically handles messages of any size
 */
async function encryptMessage() {
  try {
    if (!currentKeyPair) {
      log("⚠️ Please generate a Vaultic RSA key pair first", "error");
      return;
    }

    const message = messageInput.value.trim();
    if (!message) {
      log("⚠️ Please enter a message to encrypt", "error");
      messageInput.focus();
      return;
    }

    loadingSpinner.classList.add("active");

    // Log the message size
    log(`Vaultic engine encrypting message (${message.length} bytes)...`);

    // Use the unified encryption function that handles any data size
    const encrypted = await vaultic_encrypt(currentKeyPair.public_pem, message);
    encryptedTextarea.value = encrypted;

    // Show the results section
    resultOutput.classList.add("visible");
    decryptBtn.disabled = false;

    // Detect which method was used (simple heuristic based on result length)
    const isHybrid = encrypted.length > 500; // Simple estimation

    if (isHybrid) {
      log(
        "✅ Message encrypted using Vaultic's hybrid RSA+AES encryption",
        "success"
      );
      log("Large data automatically handled with enterprise-grade security");
    } else {
      log(
        "✅ Message encrypted using Vaultic's direct RSA encryption",
        "success"
      );
    }

    log("The message can now only be decrypted with the matching private key");
  } catch (error) {
    log(`❌ Vaultic encryption error: ${error.message}`, "error");
    console.error("Complete error:", error);
  } finally {
    loadingSpinner.classList.remove("active");
  }
}

/**
 * Decrypts the encrypted message using Vaultic's decryption
 * Automatically handles messages of any size
 */
async function decryptMessage() {
  try {
    if (!currentKeyPair) {
      log("⚠️ Please generate a Vaultic RSA key pair first", "error");
      return;
    }

    const encrypted = encryptedTextarea.value.trim();
    if (!encrypted) {
      log("⚠️ No encrypted message to decrypt", "error");
      return;
    }

    loadingSpinner.classList.add("active");

    // Decryption with automatic method detection
    log("Vaultic engine decrypting message...");

    try {
      // Use the unified decryption function
      const decrypted = await vaultic_decrypt(
        currentKeyPair.private_pem,
        encrypted
      );

      decryptedTextarea.value = decrypted;
      log("✅ Vaultic decryption successful", "success");

      // Verify if decrypted message matches original
      const originalMessage = messageInput.value.trim();
      if (originalMessage === decrypted) {
        log(
          "✓ Cryptographic verification: Decrypted message matches the original",
          "success"
        );
        log("The encryption/decryption cycle is complete and verified");
      } else {
        log(
          "⚠️ Verification failed: Decrypted message differs from original",
          "error"
        );
      }
    } catch (decryptError) {
      log(`❌ Vaultic decryption failed: ${decryptError.message}`, "error");
      log(
        "This could be due to data corruption or using the wrong private key",
        "error"
      );
      console.error("Decryption error details:", decryptError);
    }
  } catch (error) {
    log(`❌ Vaultic engine error: ${error.message}`, "error");
    console.error("Complete error:", error);
  } finally {
    loadingSpinner.classList.remove("active");
  }
}

/**
 * Resets the application state for a new encryption session
 */
function resetApplication() {
  // Clear all input fields
  messageInput.value = "";
  publicKeyTextarea.value = "";
  privateKeyTextarea.value = "";
  encryptedTextarea.value = "";
  decryptedTextarea.value = "";

  // Hide results sections
  keyOutput.classList.remove("visible");
  resultOutput.classList.remove("visible");

  // Disable buttons
  encryptBtn.disabled = true;
  decryptBtn.disabled = true;
  resetBtn.disabled = true;

  // Clear current key pair
  currentKeyPair = null;

  // Add log entry
  log("Vaultic demo reset. Ready for new encryption session.");
}

/**
 * Adds analytics tracking for demonstration purposes
 * (In a real application, this would connect to actual analytics)
 * @param {string} action - The action being tracked
 */
function trackVaulticAction(action) {
  console.log(`[Vaultic Analytics] User performed: ${action}`);
  // In a real application, this would send data to an analytics service
}

// Event Listeners
generateKeysBtn.addEventListener("click", () => {
  generateKeys();
  trackVaulticAction("generate_keys");
});

encryptBtn.addEventListener("click", () => {
  encryptMessage();
  trackVaulticAction("encrypt_message");
});

decryptBtn.addEventListener("click", () => {
  decryptMessage();
  trackVaulticAction("decrypt_message");
});

resetBtn.addEventListener("click", () => {
  resetApplication();
  trackVaulticAction("reset_application");
});

// Copy button handlers
copyPublicKeyBtn.addEventListener("click", () => {
  copyToClipboard(publicKeyTextarea, "Vaultic public key copied to clipboard");
  trackVaulticAction("copy_public_key");
});

copyPrivateKeyBtn.addEventListener("click", () => {
  copyToClipboard(
    privateKeyTextarea,
    "Vaultic private key copied to clipboard"
  );
  trackVaulticAction("copy_private_key");
});

copyEncryptedBtn.addEventListener("click", () => {
  copyToClipboard(encryptedTextarea, "Encrypted message copied to clipboard");
  trackVaulticAction("copy_encrypted_message");
});

// Initialize
log("Vaultic RSA Encryption Demo initialized.");
log("Ready to demonstrate secure cryptography with vaultic-crypto-engine.");
log("👉 Start by generating a new RSA key pair");

// Initial button state
encryptBtn.disabled = true;
decryptBtn.disabled = true;
resetBtn.disabled = true;

// Display version info
const vaulticVersion = "0.1.3";
log(`Running vaultic-crypto-engine-demo v${vaulticVersion}`);
