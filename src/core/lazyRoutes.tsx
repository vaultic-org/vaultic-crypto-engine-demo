import { lazy } from 'react';

// Lazy load des pages principales
export const HomePage = lazy(() => import('@/pages/HomePage'));
export const DocumentationPage = lazy(() => import('../routes/documentation'));
export const DemoPage = lazy(() => import('../routes/demo'));
export const NotFoundPage = lazy(() => import('../routes/_404')); 