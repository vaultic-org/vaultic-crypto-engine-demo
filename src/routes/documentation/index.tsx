import { useEffect } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';

export const Route = createFileRoute('/documentation/')({
  component: DocumentationIndexPage,
});

function DocumentationIndexPage() {
  const navigate = useNavigate();
  
  useEffect(() => {
    console.log('DocumentationIndexPage: Redirecting to /documentation/getting-started');
    
    setTimeout(() => {
      navigate({ to: '/documentation/getting-started' as any, replace: true });
    }, 100);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
      <p>Redirection vers la documentation...</p>
    </div>
  );
}

export default DocumentationIndexPage; 