import { type StatItem, Stats } from '@/components/features';
import { StoryBlock, StoryGroup } from '@/sandbox/StoryBlock';

const statsData: StatItem[] = [
    { label: 'str', value: 'Debugging' },
    { label: 'dex', value: 'Debugging' },
    { label: 'INT', value: 20 },
    { label: 'cha', value: 'Debugging' },
    { label: 'wis', value: 15 },
];

export const StatsStory = () => {
    return (
        <div>
            <StoryGroup title="Variants">
                <StoryBlock label="Default">
                    <Stats stats={statsData} />
                </StoryBlock>
            </StoryGroup>
        </div>
    );
};
