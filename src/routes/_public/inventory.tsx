import { PageWrapper } from '@/components/layouts';
import { InventoryItemStory } from '@/sandbox/stories/InventoryItemStory';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_public/inventory')({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <PageWrapper>
            <InventoryItemStory />
        </PageWrapper>
    );
}
