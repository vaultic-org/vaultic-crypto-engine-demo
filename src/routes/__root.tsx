import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import ConsoleLog from '@/components/layout/ConsoleLog/ConsoleLog';
import NotFoundPage from '@/routes/_404';
import { Suspense } from 'react';
import LoadingSpinner from '@/components/common/LoadingSpinner';

export const Route = createRootRoute({
  component: () => {
    return (
      <React.Fragment>
        <Suspense fallback={<LoadingSpinner fullScreen size="lg" />}>
          <div className="flex flex-col min-h-screen">
            <main className="flex-grow">
              <Outlet />
            </main>
          </div>
        </Suspense>
        <ConsoleLog />
      </React.Fragment>
    );
  },
  notFoundComponent: NotFoundPage
});
