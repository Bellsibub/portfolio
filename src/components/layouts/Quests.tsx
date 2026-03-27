import { QuestCard } from '@/components/features';
import { SectionHeader } from '@/components/ui';
import { useQuests } from '@/lib/react-query/useQuests';

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
                    {quests.map((quest) => (
                        <QuestCard key={quest.id} quest={quest} />
                    ))}
                </div>
            )}
        </div>
    );
};

Quests.displayName = 'Quests';
