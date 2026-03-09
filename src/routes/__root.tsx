import { TanStackDevtools } from '@tanstack/react-devtools';
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import * as React from 'react';

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
