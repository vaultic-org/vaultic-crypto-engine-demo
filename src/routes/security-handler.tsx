import { useEffect } from 'react';
import { Outlet, useRouter, createFileRoute } from '@tanstack/react-router';
import { SENSITIVE_DOT_FILES, SECURITY_SENSITIVE_PATHS } from '@/core/constants/security';

// Explicit route for security handler
export const Route = createFileRoute('/security-handler')({
  component: SecurityLayout
});

function isSecuritySensitivePath(path: string): boolean {
  // Check for .env specifically (handle it directly)
  if (path === '/.env' || path === '/dot-env') {
    return true;
  }
  
  // Check if the path is exactly in our list
  if (SECURITY_SENSITIVE_PATHS.includes(path)) {
    return true;
  }
  
  // Check if the path starts with a dot and if it is in our list of sensitive files
  const segments = path.split('/').filter(Boolean);
  if (segments.length > 0) {
    // Instead of considering all files starting with a dot,
    // check only those that are in our list of sensitive files
    for (const sensitiveFile of SENSITIVE_DOT_FILES) {
      if (segments[0] === sensitiveFile || segments[0].startsWith(sensitiveFile + '/')) {
        return true;
      }
    }
  }
  
  return false;
}

// Component that handles security path detection
export function SecurityPathsHandler() {
  const router = useRouter();
  
  useEffect(() => {
    // Get the current path
    const currentPath = window.location.pathname;
    
    // If it's a sensitive path and not already /env, redirect
    if (isSecuritySensitivePath(currentPath) && currentPath !== '/env') {
      // Use programmatic navigation of the router
      router.navigate({ to: '/env', replace: true });
    }
    
    // Also add an event listener for when someone tries to navigate to /.env
    const handleUrlChange = () => {
      const path = window.location.pathname;
      if (path === '/.env' || path.includes('.env')) {
        router.navigate({ to: '/env', replace: true });
      }
    };
    
    // Listen for URL changes
    window.addEventListener('popstate', handleUrlChange);
    
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
    };
  }, [router]);
  
  return <Outlet />;
}

function SecurityLayout() {
  return <SecurityPathsHandler />;
}

export default SecurityLayout;