import {
    Badge,
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
import { TEMP_QUESTS } from '@/lib/dev/quests';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_public/quests_/$slug')({
    component: RouteComponent,
});

function RouteComponent() {
    const { slug } = Route.useParams();
    const quest = TEMP_QUESTS.find((q) => q.slug === slug);

    if (!quest) return <div>Quest not found.</div>;

    return (
        <div className="max-w-5xl w-full lg:pt-20 pb-20 self-baseline">
            <div className="flex flex-col gap-8 p-2.5">
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
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                {quest.rewards.map((tech) => (
                                    <Badge key={tech}>{tech}</Badge>
                                ))}
                            </div>
                            {/* {quest.links.map((link) => (
                                <p key={link}>{link}</p>
                            ))} */}
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
                    <CardDescription>{quest.summary}</CardDescription>
                </Card>
            </div>
        </div>
    );
}
