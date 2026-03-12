import { InventoryItem } from '@/components/features';
import { StoryBlock, StoryGroup } from '@/sandbox/StoryBlock';
import { React } from 'developer-icons';

export const InventoryItemStory = () => {
    return (
        <div>
            <StoryGroup title="Variants">
                <StoryBlock label="Default">
                    <InventoryItem label="React" Icon={React} />
                </StoryBlock>
                <StoryBlock label="Equipped">
                    <InventoryItem
                        label="React"
                        Icon={React}
                        variant="equipped"
                    />
                </StoryBlock>
                <StoryBlock label="Empty">
                    <InventoryItem label={null} Icon={undefined} />
                </StoryBlock>
            </StoryGroup>
        </div>
    );
};
