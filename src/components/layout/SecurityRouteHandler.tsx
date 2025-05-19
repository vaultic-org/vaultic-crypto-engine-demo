import { useEffect, useState } from 'react';
import { useRouterState } from '@tanstack/react-router';
import SecurityEasterEgg from '../easter-eggs/SecurityEasterEgg';
import { SECURITY_SENSITIVE_PATHS } from '@/core/constants/security';

// Function that checks if a path is considered sensitive
function isSecuritySensitivePath(path: string): boolean {
  // Check if the path is exactly in our list
  if (SECURITY_SENSITIVE_PATHS.includes(path)) {
    return true;
  }
  
  // Check if the path starts with a dot (hidden file)
  const segments = path.split('/').filter(Boolean);
  if (segments.length > 0 && segments[0].startsWith('.')) {
    return true;
  }
  
  // Check certain specific patterns
  if (
    path.includes('/wp-') || 
    path.includes('/admin') || 
    path.includes('/.git') ||
    path.includes('/php')
  ) {
    return true;
  }
  
  return false;
}

/**
 * Component that handles security-related routes and displays Easter eggs for cybersecurity experts
 */
function SecurityRouteHandler() {
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const routerState = useRouterState();
  
  useEffect(() => {
    // Get the current path
    const currentPath = window.location.pathname;
    
    // Check if the current path is security sensitive
    setShowEasterEgg(isSecuritySensitivePath(currentPath));
    
    // Add event listener for handling direct URL navigation
    const handleNavigation = () => {
      const path = window.location.pathname;
      setShowEasterEgg(isSecuritySensitivePath(path));
    };
    
    window.addEventListener('popstate', handleNavigation);
    
    return () => {
      window.removeEventListener('popstate', handleNavigation);
    };
  }, [routerState.location.pathname]);
  
  // If we're on a security sensitive path, show the easter egg
  if (showEasterEgg) {
    return <SecurityEasterEgg />;
  }
  
  // Otherwise, return null - this component doesn't render anything
  return null;
}

export default SecurityRouteHandler; 