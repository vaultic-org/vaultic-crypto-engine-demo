import { createFileRoute, redirect } from '@tanstack/react-router';

// This route is only used to redirect /.env to /env
export const Route = createFileRoute('/direct-dot-env')({
  component: () => null,
  beforeLoad: () => {
    throw redirect({ to: '/env' });
  },
}); 