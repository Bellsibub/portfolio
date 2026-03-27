import {
    Badge,
    Button,
    Card,
    CardContent,
    CardDescription,
    CardTitle,
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    SectionHeader,
    Separator,
} from '@/components/ui';
import type { Quests } from '@/lib/dev/quests';

type QuestDetailProps = {
    quest: Quests;
} & React.HTMLAttributes<HTMLDivElement>;

export const QuestDetail = ({ quest, ...props }: QuestDetailProps) => {
    return (
        <div className="flex flex-col gap-8 p-2.5" {...props}>
            <SectionHeader
                title={quest.title}
                variant="image"
                imageUrl={quest.imageUrl}
                caption={quest.description}
            />
            <Separator variant="accent" />
            <Card
                variant="ghost"
                className="flex-row flex-wrap lg:flex-nowrap gap-10"
            >
                <div className="space-y-4">
                    <CardTitle>Summary</CardTitle>
                    <CardDescription>{quest.summary}</CardDescription>
                </div>
                <div className="space-y-4 shrink-0">
                    <CardTitle>Tech stack & links</CardTitle>
                    <CardContent className="flex flex-col gap-4">
                        <div className="flex flex-wrap gap-2">
                            {quest.rewards.map((tech) => (
                                <Badge key={tech}>{tech}</Badge>
                            ))}
                        </div>
                        <div className="flex gap-4">
                            <Button variant="link" asChild>
                                <a href={quest.demoLink}>Demo</a>
                            </Button>
                            <Button variant="link" asChild>
                                <a href={quest.githubLink}>Code</a>
                            </Button>
                        </div>
                    </CardContent>
                </div>
            </Card>
            <Carousel>
                <CarouselContent>
                    {quest.images?.map((s) => (
                        <CarouselItem key={s.label}>
                            <img
                                src={s.url}
                                alt={s.label}
                                className="h-80 w-full object-cover rounded-xl"
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>

            <Card variant="ghost">
                <CardTitle>Reflections</CardTitle>
                <CardDescription>{quest.reflections}</CardDescription>
            </Card>
        </div>
    );
};

QuestDetail.displayName = 'QuestDetail';
