import { QuestDetail } from '@/components/layouts';
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
        <div className="max-w-5xl w-full lg:pt-20 pb-20 self-baseline">
            <QuestDetail quest={quest} />
        </div>
    );
}
