import { useState, useEffect } from 'react';
import { LOCAL_STORAGE_SECRETS } from '@/core/constants/security';

/**
 * Hook that monitors localStorage to detect if the user has added
 * a secret value that triggers an easter egg
 */
export function useLocalStorageEasterEgg() {
  const [easterEggActivated, setEasterEggActivated] = useState(false);

  useEffect(() => {
    // Function to check localStorage
    const checkLocalStorage = () => {
      const storedValue = localStorage.getItem(LOCAL_STORAGE_SECRETS.key);
      if (storedValue === LOCAL_STORAGE_SECRETS.value) {
        setEasterEggActivated(true);
      } else {
        setEasterEggActivated(false);
      }
    };

    // Check immediately on load
    checkLocalStorage();

    // Set up an event listener for changes in localStorage
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === LOCAL_STORAGE_SECRETS.key) {
        checkLocalStorage();
      }
    };

    // Check periodically (just in case)
    const interval = setInterval(checkLocalStorage, 2000);

    // Add the event listener
    window.addEventListener('storage', handleStorageChange);

    // Clean up
    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return easterEggActivated;
} 