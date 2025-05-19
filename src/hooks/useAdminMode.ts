import { useState, useEffect } from 'react';
import { LOCAL_STORAGE_SECRETS } from '@/core/constants/security';

/**
 * Hook to detect if admin mode is active by checking the localStorage
 * @returns Boolean indicating if admin mode is active
 */
export function useAdminMode() {
  const [isAdminMode, setIsAdminMode] = useState(false);
  
  useEffect(() => {
    // Check if admin mode is active in localStorage
    const checkAdminMode = () => {
      const storedValue = localStorage.getItem(LOCAL_STORAGE_SECRETS.key);
      setIsAdminMode(storedValue === LOCAL_STORAGE_SECRETS.value);
    };
    
    // Check on initial load
    checkAdminMode();
    
    // Set up event listener for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === LOCAL_STORAGE_SECRETS.key) {
        checkAdminMode();
      }
    };
    
    // Recheck periodically in case of changes
    const interval = setInterval(checkAdminMode, 2000);
    
    // Add storage event listener
    window.addEventListener('storage', handleStorageChange);
    
    // Cleanup
    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  
  return isAdminMode;
} 