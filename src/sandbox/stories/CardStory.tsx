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
        <div className="space-y-8">
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
            <StoryGroup title="Custom design">
                <StoryBlock label="Custom colors">
                    <div></div>
                    <Card>
                        <CardTitle className="text-accent-lighter">
                            Defeat the Dragon
                        </CardTitle>
                        <CardDescription className="text-text-tertiary">
                            Slay the dragon terrorizing the village and claim
                            your reward.
                        </CardDescription>
                        <CardContent>
                            <p>Complete the quest to earn your reward.</p>
                        </CardContent>
                        <CardFooter>
                            <Button
                                variant="outline"
                                className="border-green-800 text-green-500 hover:bg-green-800/40"
                            >
                                Accept Quest
                            </Button>
                        </CardFooter>
                    </Card>
                </StoryBlock>
            </StoryGroup>
        </div>
    );
};

CardStory.displayName = 'CardStory';
