import { SectionHeader } from '@/components/ui';
import { StoryBlock, StoryGroup } from '@/sandbox/StoryBlock';

export const SectionHeaderStory = () => {
    return (
        <div>
            <StoryGroup title="Default">
                <StoryBlock label="Default">
                    <SectionHeader title="Section Header" />
                </StoryBlock>
            </StoryGroup>
        </div>
    );
};

SectionHeaderStory.displayName = 'SectionHeaderStory';
