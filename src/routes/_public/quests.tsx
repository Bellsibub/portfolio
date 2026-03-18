import { PageWrapper, Quests } from '@/components/layouts';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_public/quests')({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <PageWrapper>
            <Quests />
        </PageWrapper>
    );
}
