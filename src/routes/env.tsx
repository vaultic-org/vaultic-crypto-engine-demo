import { createFileRoute } from '@tanstack/react-router';
import SecurityEasterEgg from '../components/easter-eggs/SecurityEasterEgg';

// Route for the env easter egg without the dot
export const Route = createFileRoute('/env')({
  component: SecurityEasterEgg,
}); 