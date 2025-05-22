import { lazy } from 'react';

// Lazy load of the pages
export const HomePage = lazy(() => import('../routes/index'));
export const DocumentationPage = lazy(() => import('../routes/documentation/$section'));
export const DemoPage = lazy(() => import('../routes/demo'));
export const NotFoundPage = lazy(() => import('../routes/_404')); 