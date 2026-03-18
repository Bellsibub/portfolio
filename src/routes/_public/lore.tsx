import { Lore, PageWrapper } from '@/components/layouts';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_public/lore')({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <PageWrapper>
            <Lore />
        </PageWrapper>
    );
}
