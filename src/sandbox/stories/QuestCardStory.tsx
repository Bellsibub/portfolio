import { QuestCard } from '@/components/features';
import { StoryBlock, StoryGroup } from '@/sandbox/StoryBlock';

export const QuestCardStory = () => {
    return (
        <div>
            <StoryGroup title="Variants">
                <StoryBlock label="Default">
                    <QuestCard>Default</QuestCard>
                </StoryBlock>
                <StoryBlock label="Outline">
                    <QuestCard variant="outline">Outline</QuestCard>
                </StoryBlock>
            </StoryGroup>
        </div>
    );
};
