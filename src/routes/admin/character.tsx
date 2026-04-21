import { CharacterForm } from '@/components/features';
import { PageWrapper } from '@/components/layouts';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/character')({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <PageWrapper>
            <div className="max-w-2xl mx-auto">
                <CharacterForm />
            </div>
        </PageWrapper>
    );
}
