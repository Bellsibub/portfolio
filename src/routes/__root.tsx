import * as React from 'react';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackDevtools } from '@tanstack/react-devtools';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools'

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <Outlet />
      <TanStackDevtools
        plugins={[
          {
            name: 'Tanstack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
          {
            name: 'Tanstack React Query',
            render: <ReactQueryDevtoolsPanel />,
          },
        ]}
      />
    </React.Fragment>
  );
}
