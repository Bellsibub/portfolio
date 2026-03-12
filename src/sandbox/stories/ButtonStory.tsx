import { Button } from '@/components/ui';

import { StoryBlock, StoryGroup } from '../StoryBlock';

export function ButtonStory({ ...props }) {
    return (
        <div {...props}>
            <StoryGroup title="Variants">
                <StoryBlock label="primary">
                    <Button variant="primary">Primary</Button>
                </StoryBlock>
                <StoryBlock label="secondary">
                    <Button variant="secondary">Secondary</Button>
                </StoryBlock>
                <StoryBlock label="outline">
                    <Button variant="outline">Outline</Button>
                </StoryBlock>
                <StoryBlock label="ghost">
                    <Button variant="ghost">Ghost</Button>
                </StoryBlock>
                <StoryBlock label="link">
                    <Button variant="link">Link</Button>
                </StoryBlock>
            </StoryGroup>

            <StoryGroup title="Sizes">
                <StoryBlock label="sm / md / lg" center>
                    <Button size="sm">Small</Button>
                    <Button size="md">Medium</Button>
                    <Button size="lg">Large</Button>
                </StoryBlock>
            </StoryGroup>

            <StoryGroup title="States">
                <StoryBlock label="disabled">
                    <Button variant="primary" disabled>
                        Primary
                    </Button>
                    <Button variant="secondary" disabled>
                        Secondary
                    </Button>
                    <Button variant="outline" disabled>
                        Outline
                    </Button>
                    <Button variant="ghost" disabled>
                        Ghost
                    </Button>
                    <Button variant="link" disabled>
                        Link
                    </Button>
                </StoryBlock>
            </StoryGroup>

            <StoryGroup title="asChild">
                <StoryBlock label="renders as <a> tag">
                    <Button asChild variant="ghost">
                        <a href="#">Link styled as Button</a>
                    </Button>
                </StoryBlock>
            </StoryGroup>
        </div>
    );
}
