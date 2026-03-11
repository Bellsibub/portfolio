import { InventoryItem } from '@/components/features';
import { StoryBlock, StoryGroup } from '@/sandbox/StoryBlock';

export const InventoryItemStory = () => {
    return (
        <div>
            <StoryGroup title="Variants">
                <StoryBlock label="Default">
                    <InventoryItem>Default</InventoryItem>
                </StoryBlock>
                <StoryBlock label="Outline">
                    <InventoryItem variant="outline">Outline</InventoryItem>
                </StoryBlock>
            </StoryGroup>
        </div>
    );
};
