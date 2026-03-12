import { PageWrapper } from '@/components/layouts';
import { ButtonStory } from '@/sandbox/stories/ButtonStory';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_public/quests')({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <PageWrapper>
            <ButtonStory />
            <ButtonStory />
            <ButtonStory />
        </PageWrapper>
    );
}
