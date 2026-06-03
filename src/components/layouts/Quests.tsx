import { QuestCard } from '@/components/features';
import { SectionHeader } from '@/components/ui';
import type { Quest } from '@/lib/react-query/useQuests';
import { useQuests } from '@/lib/react-query/useQuests';

const STATUS_ORDER: Record<NonNullable<Quest['status']>, number> = {
    active: 1,
    maintenance: 2,
    enhancement: 3,
    archived: 4,
};

function sortQuests(quests: Quest[]): Quest[] {
    return [...quests].sort((a, b) => {
        const aFeatured = a.is_featured ? 0 : 1;
        const bFeatured = b.is_featured ? 0 : 1;
        if (aFeatured !== bFeatured) return aFeatured - bFeatured;
        const aOrder =
            STATUS_ORDER[a.status as keyof typeof STATUS_ORDER] ?? 99;
        const bOrder =
            STATUS_ORDER[b.status as keyof typeof STATUS_ORDER] ?? 99;
        return aOrder - bOrder;
    });
}

type QuestsProps = {} & React.HTMLAttributes<HTMLDivElement>;

export const Quests = ({ ...props }: QuestsProps) => {
    const { data: quests, isPending, isError } = useQuests();

    return (
        <div className="flex flex-col gap-12 p-2.5" {...props}>
            <SectionHeader title="Quest log" className="uppercase" />
            {isPending && <p className="text-secondary">Loading quests...</p>}
            {isError && <p className="text-danger">Failed to load quests.</p>}
            {quests && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {sortQuests(quests).map((quest) => (
                        <QuestCard key={quest.id} quest={quest} />
                    ))}
                </div>
            )}
        </div>
    );
};

Quests.displayName = 'Quests';
