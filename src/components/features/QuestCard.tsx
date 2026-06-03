import {
    Badge,
    Button,
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    type CardProps,
    CardTitle,
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui';
import type { Quest } from '@/lib/react-query/useQuests';
import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import { LuArchive, LuBug, LuConstruction, LuSparkles } from 'react-icons/lu';

const STATUS_CONFIG = {
    active: {
        icon: LuConstruction,
        label: 'Active',
        tooltip: 'Currently under active development.',
    },
    maintenance: {
        icon: LuBug,
        label: 'Maintenance',
        tooltip: 'Released and maintained with bug fixes and support.',
    },
    enhancement: {
        icon: LuSparkles,
        label: 'Enhancement',
        tooltip:
            'Core scope completed, with planned improvements and new features.',
    },
    archived: {
        icon: LuArchive,
        label: 'Archived',
        tooltip: 'Completed and no longer under active development.',
    },
} as const;

export interface QuestCardProps extends CardProps {
    quest: Quest;
}

export const QuestCard = ({ quest, ...props }: QuestCardProps) => {
    const statusConfig = quest.status
        ? STATUS_CONFIG[quest.status as keyof typeof STATUS_CONFIG]
        : null;
    const StatusIcon = statusConfig?.icon;
    const [tooltipOpen, setTooltipOpen] = useState(false);

    return (
        <Card
            variant={quest.is_featured ? 'featured' : 'default'}
            className="relative"
            {...props}
        >
            {statusConfig && StatusIcon && (
                <TooltipProvider>
                    <Tooltip open={tooltipOpen} onOpenChange={setTooltipOpen}>
                        <TooltipTrigger
                            asChild={false}
                            className="absolute top-4 right-4 text-text-secondary hover:text-text-primary transition-colors"
                            aria-label={`Status: ${statusConfig.label} — ${statusConfig.tooltip}`}
                            onTouchEnd={(e) => {
                                e.preventDefault();
                                setTooltipOpen((prev) => !prev);
                            }}
                        >
                            <StatusIcon className="size-4" aria-hidden="true" />
                        </TooltipTrigger>
                        <TooltipContent side="left">
                            {statusConfig.tooltip}
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            )}
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
                    <p className="caption tracking-widest">Level up in:</p>
                    <div className="inline-flex items-center gap-2 flex-wrap">
                        {quest.quest_skills
                            .filter((qs) => qs.skill_importance === 'primary')
                            .map(({ skill }) => (
                                <Badge key={skill.id} variant="outline">
                                    {skill.name}
                                </Badge>
                            ))}
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button
                    variant={quest.status === 'archived' ? 'ghost' : 'outline'}
                    asChild
                >
                    <Link to="/quests/$slug" params={{ slug: quest.slug }}>
                        {quest.status === 'archived'
                            ? 'View details'
                            : 'View progress'}
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
};

QuestCard.displayName = 'QuestCard';
