import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/messages')({
    component: RouteComponent,
});

function RouteComponent() {
    return <div>Hello "/admin/messages"!</div>;
}
