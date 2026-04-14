import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/character')({
    component: RouteComponent,
});

function RouteComponent() {
    return <div>Hello "/admin/character"!</div>;
}
