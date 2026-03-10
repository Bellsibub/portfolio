import { StoryBlock, StoryGroup } from '@/sandbox/StoryBlock';

export const QuestCardStory = () => {
    return (
        <div>
            <StoryGroup title="Variants">
                <StoryBlock label="default">
                    <div>
                        <p>QuestCard story goes here</p>
                    </div>
                </StoryBlock>
            </StoryGroup>
        </div>
    );
};

QuestCardStory.displayName = 'QuestCardStory';
