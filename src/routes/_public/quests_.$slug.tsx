import { TEMP_QUESTS } from '@/lib/dev/quests';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_public/quests_/$slug')({
    component: RouteComponent,
});

function RouteComponent() {
    const { slug } = Route.useParams();
    const quest = TEMP_QUESTS.find((q) => q.slug === slug);

    if (!quest) return <div>Quest not found.</div>;

    return (
        <div>
            <h1>{quest.title}</h1>
            <p>{quest.description}</p>
        </div>
    );
}
