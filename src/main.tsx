import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router';
import { router } from './core/router';
import { Loading } from './components/common/Loading';

import './core/i18n';
import './index.css';

// Loading component during i18n initialization

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router} />
    </Suspense>
  </StrictMode>,
)