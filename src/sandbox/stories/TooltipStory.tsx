import {
    Button,
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui';

import { StoryBlock, StoryGroup } from '../StoryBlock';

export function TooltipStory() {
    return (
        <TooltipProvider>
            <div className="space-y-10">
                <StoryGroup title="Sides">
                    <StoryBlock label="top / right / bottom / left" center>
                        {(['top', 'right', 'bottom', 'left'] as const).map(
                            (side) => (
                                <Tooltip key={side}>
                                    <TooltipTrigger asChild>
                                        <Button variant="ghost" size="sm">
                                            {side}
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent side={side}>
                                        Tooltip on {side}
                                    </TooltipContent>
                                </Tooltip>
                            ),
                        )}
                    </StoryBlock>
                </StoryGroup>

                <StoryGroup title="Content">
                    <StoryBlock label="short text" center>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost">Hover me</Button>
                            </TooltipTrigger>
                            <TooltipContent>Quick tip</TooltipContent>
                        </Tooltip>
                    </StoryBlock>
                    <StoryBlock label="longer text" center>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="primary">
                                    Hover for info
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                This is a longer tooltip with more descriptive
                                content
                            </TooltipContent>
                        </Tooltip>
                    </StoryBlock>
                </StoryGroup>
            </div>
        </TooltipProvider>
    );
}
