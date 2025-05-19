import { useState, useEffect } from 'react';
import { LOCAL_STORAGE_SECRETS } from '@/core/constants/security';
import { isAdminPassword } from '@/utils/crypto-helpers';

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
      
      if (storedValue) {
        try {
          // Check if the stored value is a valid admin password
          if (isAdminPassword(storedValue)) {
            setIsAdminMode(true);
            
            // Show congratulation message (only the first time)
            if (!localStorage.getItem('admin_mode_activated')) {
              console.log("%c🎉 CONGRATULATIONS! 🎉", "font-size: 20px; color: green; font-weight: bold");
              console.log("%cYou have solved the crypto challenge and activated ADMIN MODE!", "font-size: 16px; color: green;");
              localStorage.setItem('admin_mode_activated', 'true');
            }
            return;
          }
        } catch (error) {
          console.error("Error checking admin password:", error);
        }
      }
      
      setIsAdminMode(false);
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