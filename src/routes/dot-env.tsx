import { createFileRoute, redirect } from '@tanstack/react-router';

/**
 * Route to intercept attempts to access .env files and similar
 * 
 * Since TanStack Router does not handle paths starting with a dot (like "/.env") correctly,
 * this route and the SecurityPathsHandler work together to handle this:
 * 
 * 1. This route creates an entry point `/dot-env` that redirects to `/env`
 * 2. SecurityPathsHandler intercepts attempts to access "/.env" via browser navigation
 * 3. The SECURITY_SENSITIVE_PATHS constants in security.ts include these paths
 */
export const Route = createFileRoute('/dot-env')({
  component: () => null,
  beforeLoad: () => {
    // Redirect to the security page
    throw redirect({ to: '/env' });
  },
}); 