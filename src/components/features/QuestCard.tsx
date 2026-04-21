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
import type { Quest } from '@/lib/react-query/useQuests';
import { Link } from '@tanstack/react-router';

export interface QuestCardProps extends CardProps {
    quest: Quest;
}

export const QuestCard = ({ quest, ...props }: QuestCardProps) => {
    return (
        <Card variant={quest.is_featured ? 'featured' : 'default'} {...props}>
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
                    <p className="caption tracking-widest">
                        {quest.is_completed ? 'Exp gained in:' : 'Level up in:'}
                    </p>
                    <div className="inline-flex items-center gap-2 flex-wrap">
                        {quest.quest_skills.map(({ skill }) => (
                            <Badge key={skill.id} variant="outline">
                                {skill.name}
                            </Badge>
                        ))}
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button
                    variant={quest.is_completed ? 'primary' : 'outline'}
                    asChild
                >
                    <Link to="/quests/$slug" params={{ slug: quest.slug }}>
                        {quest.is_completed ? 'View Quest' : 'View progress'}
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
};

QuestCard.displayName = 'QuestCard';
