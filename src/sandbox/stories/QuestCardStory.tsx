import { QuestCard, type QuestItem } from '@/components/features';
import { StoryBlock, StoryGroup } from '@/sandbox/StoryBlock';

const Quest: QuestItem = {
    id: '1',
    title: 'Defeat the Dragon',
    description: 'Slay the dragon terrorizing the village.',
    level: 'adept',
    difficulty: 'hard',
    rewards: ['React', 'TypeScript', 'Gold'],
    isCompleted: false,
};

export const QuestCardStory = () => {
    return (
        <div>
            <StoryGroup title="Variants">
                <StoryBlock label="Default">
                    <QuestCard quest={Quest} />
                    <QuestCard quest={{ ...Quest, isCompleted: true }} />
                </StoryBlock>
                <StoryBlock label="Featured">
                    <QuestCard variant="featured" quest={Quest} />
                    <QuestCard
                        variant="featured"
                        quest={{ ...Quest, isCompleted: true }}
                    />
                </StoryBlock>
            </StoryGroup>
        </div>
    );
};
