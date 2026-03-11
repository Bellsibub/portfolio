import { Badge } from '@/components/ui';
import { StoryBlock, StoryGroup } from '@/sandbox/StoryBlock';

export const BadgeStory = () => {
    return (
        <div>
            <StoryGroup title="Variants">
                <StoryBlock label="Default">
                    <Badge>Default</Badge>
                </StoryBlock>
                <StoryBlock label="Outline">
                    <Badge variant="outline">Outline</Badge>
                </StoryBlock>
            </StoryGroup>
        </div>
    );
};
