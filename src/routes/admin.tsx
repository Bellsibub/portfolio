import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin')({
    component: AdminLayout,
});

function AdminLayout() {
    return (
        <div>
            {/* shared admin UI: sidebar, topbar, etc. */}
            <Outlet />
        </div>
    );
}
