import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";
import { LOCAL_STORAGE_SECRETS } from '@/core/constants/security';
import { Outlet } from '@tanstack/react-router';
import NotFoundPage from "@/routes/_404";

// Layout route for secret game pages
export const Route = createFileRoute('/secret-game')({
  component: SecretGameLayout,
});

function SecretGameLayout() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Authentication check when the component mounts (client-side only)
  useEffect(() => {
    const checkAuthorization = () => {
      try {
        const hasSecretAccess = localStorage.getItem(LOCAL_STORAGE_SECRETS.key) === LOCAL_STORAGE_SECRETS.value;
        setIsAuthorized(hasSecretAccess);
      } catch (error) {
        console.error("Auth check error:", error);
        setIsAuthorized(false);
      } finally {
        setIsLoading(false);
      }
    };
    
    // Immediate check
    checkAuthorization();
    
    // Configure an interval to check periodically
    const interval = setInterval(checkAuthorization, 5000);
    
    return () => {
      clearInterval(interval);
    };
  }, []);
  
  // Show loading while checking
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  // If not authorized, render the 404 page directly
  if (!isAuthorized) {
    return <NotFoundPage />;
  }
  
  // Otherwise render the game layout
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-screen-xl mx-auto">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
} 