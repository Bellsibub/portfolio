import { CharacterForm } from '@/components/features/CharacterForm';
import { PageWrapper } from '@/components/layouts/PageWrapper';
import { useCharacter } from '@/lib/react-query/useCharacter';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/character')({
    component: RouteComponent,
});

function RouteComponent() {
    const { data: character } = useCharacter();

    return (
        <PageWrapper>
            <div className="max-w-2xl mx-auto">
                <CharacterForm key={character?.id ?? 'loading'} />
            </div>
        </PageWrapper>
    );
}
