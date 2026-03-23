import { QuestCard, type QuestItem } from '@/components/features';
import { SectionHeader } from '@/components/ui';

type QuestsProps = {} & React.HTMLAttributes<HTMLDivElement>;

const TEMP_QUEST: QuestItem = {
    id: '1',
    title: 'Defeat the Dragon',
    description: 'Slay the dragon terrorizing the village.',
    level: 'adept',
    difficulty: 'hard',
    rewards: ['React', 'TypeScript', 'Gold'],
    isCompleted: false,
    isFeatured: false,
};

const TEMP_QUESTS: QuestItem[] = [
    { ...TEMP_QUEST, isFeatured: true },
    { ...TEMP_QUEST, id: '2', title: 'Rescue the Princess', isFeatured: true },
    { ...TEMP_QUEST, id: '3', title: 'Find the Lost Sword' },
    { ...TEMP_QUEST, id: '4', title: 'Defeat the Dragon', isCompleted: true },
    { ...TEMP_QUEST, id: '5', title: 'Rescue the Princess', isCompleted: true },
    { ...TEMP_QUEST, id: '6', title: 'Find the Lost Sword', isCompleted: true },
    { ...TEMP_QUEST, id: '7', title: 'Defeat the Dragon', isCompleted: true },
    { ...TEMP_QUEST, id: '8', title: 'Rescue the Princess', isCompleted: true },
    { ...TEMP_QUEST, id: '9', title: 'Find the Lost Sword', isCompleted: true },
    { ...TEMP_QUEST, id: '10', title: 'Defeat the Dragon', isCompleted: true },
];

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
