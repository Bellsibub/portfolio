import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui';

type QuestImagesProps = {} & React.HTMLAttributes<HTMLDivElement>;

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

export const QuestImages = ({ ...props }: QuestImagesProps) => {
    return (
        <div {...props}>
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
    );
};

QuestImages.displayName = 'QuestImages';
