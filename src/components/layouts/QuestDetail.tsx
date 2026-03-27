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
import type { QuestWithImages } from '@/lib/react-query/useQuest';

type QuestDetailProps = {
    quest: QuestWithImages;
} & React.HTMLAttributes<HTMLDivElement>;

export const QuestDetail = ({ quest, ...props }: QuestDetailProps) => {
    return (
        <div className="flex flex-col gap-8 p-2.5" {...props}>
            <SectionHeader
                title={quest.title}
                variant="image"
                imageUrl={quest.image_url ?? undefined}
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
                            {quest.quest_skills.map(({ skill }) => (
                                <Badge key={skill.id}>{skill.name}</Badge>
                            ))}
                        </div>
                        <div className="flex gap-4">
                            {quest.demo_link && (
                                <Button variant="link" asChild>
                                    <a href={quest.demo_link} target="_blank">
                                        Demo
                                    </a>
                                </Button>
                            )}
                            {quest.github_link && (
                                <Button variant="link" asChild>
                                    <a href={quest.github_link} target="_blank">
                                        Code
                                    </a>
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </div>
            </Card>
            {quest.quest_images.length > 0 && (
                <Carousel>
                    <CarouselContent>
                        {quest.quest_images.map((s) => (
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
            )}

            {quest.reflections && (
                <Card variant="ghost">
                    <CardTitle>Reflections</CardTitle>
                    <CardDescription>{quest.reflections}</CardDescription>
                </Card>
            )}
        </div>
    );
};

QuestDetail.displayName = 'QuestDetail';
