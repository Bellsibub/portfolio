import { QuestCard } from '@/components/features';
import { SectionHeader } from '@/components/ui';
import { TEMP_QUESTS } from '@/lib/dev/quests';

type QuestsProps = {} & React.HTMLAttributes<HTMLDivElement>;

export const Quests = ({ ...props }: QuestsProps) => {
    return (
        <div className="flex flex-col gap-12 p-2.5" {...props}>
            <SectionHeader title="Quest log" className="uppercase" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {TEMP_QUESTS.map((quest) => (
                    <QuestCard key={quest.id} quest={quest} />
                ))}
            </div>
        </div>
    );
};

Quests.displayName = 'Quests';
