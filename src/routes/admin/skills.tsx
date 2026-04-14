import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/skills')({
    component: RouteComponent,
});

function RouteComponent() {
    return <div>Hello "/admin/skills"!</div>;
}
