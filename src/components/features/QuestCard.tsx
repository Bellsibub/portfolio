import {
    Badge,
    Button,
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    type CardProps,
    CardTitle,
} from '@/components/ui';
import type { Quests } from '@/lib/dev/quests';
import { Link } from '@tanstack/react-router';

export interface QuestCardProps extends CardProps {
    quest: Quests;
}

export const QuestCard = ({ quest, ...props }: QuestCardProps) => {
    return (
        <Card variant={quest.isFeatured ? 'featured' : 'default'} {...props}>
            <CardTitle>{quest.title}</CardTitle>
            <CardDescription>{quest.description}</CardDescription>
            <CardContent className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <div className="inline-flex items-center gap-2">
                        <p className="text-accent">Level:</p>
                        <p>{quest.level}</p>
                    </div>
                    <div className="inline-flex items-center gap-2">
                        <p className="text-accent">Difficulty:</p>
                        <p>{quest.difficulty}</p>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <p className="caption tracking-widest">Rewards:</p>
                    <div className="inline-flex items-center gap-2 flex-wrap">
                        {quest.rewards.map((reward, index) => (
                            <Badge key={index} variant="outline">
                                {reward}
                            </Badge>
                        ))}
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button
                    disabled={!quest.isCompleted}
                    variant={quest.isCompleted ? 'primary' : 'outline'}
                    asChild
                >
                    <Link to="/quests/$slug" params={{ slug: quest.slug }}>
                        {quest.isCompleted ? 'View Quest' : 'In progress'}
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
};

QuestCard.displayName = 'QuestCard';
