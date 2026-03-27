import { QuestDetail } from '@/components/layouts';
import { useQuest } from '@/lib/react-query/useQuest';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_public/quests_/$slug')({
    component: RouteComponent,
});

function RouteComponent() {
    const { slug } = Route.useParams();
    const { data: quest, isPending, isError } = useQuest(slug);

    if (isPending) return <p className="text-secondary p-2.5">Loading...</p>;
    if (isError || !quest)
        return <p className="text-danger p-2.5">Quest not found.</p>;

    return (
        <div className="max-w-5xl w-full lg:pt-20 pb-20 self-baseline">
            <QuestDetail quest={quest} />
        </div>
    );
}
