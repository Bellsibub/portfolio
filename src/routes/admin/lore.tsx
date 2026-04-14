import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/lore')({
    component: RouteComponent,
});

function RouteComponent() {
    return <div>Hello "/admin/lore"!</div>;
}
