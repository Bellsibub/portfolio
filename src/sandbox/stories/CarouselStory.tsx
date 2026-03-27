import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui';
import { StoryBlock, StoryGroup } from '@/sandbox/StoryBlock';

const SLIDES = [
    {
        url: 'https://picsum.photos/500',
        label: 'Slide 1',
    },
    {
        url: 'https://picsum.photos/1200',
        label: 'Slide 2',
    },
    {
        url: 'https://picsum.photos/2440',
        label: 'Slide 3',
    },
    {
        url: 'https://picsum.photos/1600',
        label: 'Slide 4',
    },
];

export const CarouselStory = () => {
    return (
        <div className="space-y-8">
            <StoryGroup title="Default (no loop)">
                <StoryBlock label="4 slides, arrows + dots">
                    <div className="w-full max-w-lg">
                        <Carousel>
                            <CarouselContent>
                                {SLIDES.map((s) => (
                                    <CarouselItem key={s.label}>
                                        <img
                                            src={s.url}
                                            alt={s.label}
                                            className="h-48 w-full object-cover rounded-xl"
                                        />
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                    </div>
                </StoryBlock>
            </StoryGroup>

            <StoryGroup title="With loop">
                <StoryBlock label="loop=true">
                    <div className="w-full max-w-lg">
                        <Carousel loop>
                            <CarouselContent>
                                {SLIDES.map((s) => (
                                    <CarouselItem key={s.label}>
                                        <img
                                            src={s.url}
                                            alt={s.label}
                                            className="h-48 w-full object-cover rounded-xl"
                                        />
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                    </div>
                </StoryBlock>
            </StoryGroup>

            <StoryGroup title="Single slide (no dots)">
                <StoryBlock label="dots hidden when only 1 slide">
                    <div className="w-full max-w-lg">
                        <Carousel>
                            <CarouselContent>
                                <CarouselItem>
                                    <img
                                        src="https://picsum.photos/500"
                                        alt="Only Slide"
                                        className="h-48 w-full object-cover rounded-xl"
                                    />
                                </CarouselItem>
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                    </div>
                </StoryBlock>
            </StoryGroup>
        </div>
    );
};

CarouselStory.displayName = 'CarouselStory';
