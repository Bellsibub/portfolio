import { Inventory, PageWrapper } from '@/components/layouts';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_public/inventory')({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <PageWrapper>
            <Inventory />
        </PageWrapper>
    );
}
