import {
    Button,
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardTitle,
} from '@/components/ui';
import { StoryBlock, StoryGroup } from '@/sandbox/StoryBlock';

export const CardStory = () => {
    return (
        <div>
            <StoryGroup title="Variants">
                <StoryBlock label="default">
                    <div>
                        <Card>
                            <CardTitle>Defeat the Dragon</CardTitle>
                            <CardDescription>
                                Slay the dragon terrorizing the village and
                                claim your reward.
                            </CardDescription>
                            <CardContent>
                                <p>Complete the quest to earn your reward.</p>
                            </CardContent>
                            <CardFooter>
                                <Button>Accept Quest</Button>
                            </CardFooter>
                        </Card>
                    </div>
                </StoryBlock>
                <StoryBlock label="featured">
                    <div>
                        <Card variant="featured">
                            <CardTitle>Defeat the Dragon</CardTitle>
                            <CardDescription>
                                Slay the dragon terrorizing the village and
                                claim your reward.
                            </CardDescription>
                            <CardContent>
                                <p>Complete the quest to earn your reward.</p>
                            </CardContent>
                            <CardFooter>
                                <Button>Accept Quest</Button>
                            </CardFooter>
                        </Card>
                    </div>
                </StoryBlock>
            </StoryGroup>
        </div>
    );
};

CardStory.displayName = 'CardStory';
