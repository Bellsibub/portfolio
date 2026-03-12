import { PageWrapper } from '@/components/layouts';
import { DialogStory } from '@/sandbox/stories/DialogStory';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_public/skills')({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <PageWrapper>
            <DialogStory />
        </PageWrapper>
    );
}
