import { Separator } from '@/components/ui';
import { StoryBlock, StoryGroup } from '@/sandbox/StoryBlock';

export const SeparatorStory = () => {
    return (
        <div className="space-y-10">
            <StoryGroup title="Variants (Horizontal)">
                <StoryBlock label="default">
                    <Separator />
                </StoryBlock>
                <StoryBlock label="subtle">
                    <Separator variant="subtle" />
                </StoryBlock>
                <StoryBlock label="accent">
                    <Separator variant="accent" />
                </StoryBlock>
            </StoryGroup>
            <StoryGroup title="Orientation">
                <StoryBlock label="vertical">
                    <div className="flex h-10 items-center gap-4">
                        <span className="text-sm text-text-secondary">
                            Left
                        </span>
                        <Separator orientation="vertical" />
                        <span className="text-sm text-text-secondary">
                            Right
                        </span>
                    </div>
                </StoryBlock>
            </StoryGroup>
        </div>
    );
};

SeparatorStory.displayName = 'SeparatorStory';
