/* eslint-disable react-hooks/set-state-in-effect */
import { cn } from '@/lib/utils';
import useEmblaCarousel, {
    type UseEmblaCarouselType,
} from 'embla-carousel-react';
import {
    createContext,
    forwardRef,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react';

type CarouselImage = {
    src: string;
    alt: string;
};

type CarouselContextValue = {
    emblaRef: (node: HTMLElement | null) => void;
    scrollPrev: () => void;
    scrollNext: () => void;
    canScrollPrev: boolean;
    canScrollNext: boolean;
    selectedIndex: number;
    scrollSnaps: number[];
    scrollTo: (index: number) => void;
};

interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
    loop?: boolean;
    onSlideChange?: (index: number) => void;
}

type CarouselContentProps = React.HTMLAttributes<HTMLDivElement>;
type CarouselItemProps = React.HTMLAttributes<HTMLDivElement>;
type CarouselArrowProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const CarouselContext = createContext<CarouselContextValue | null>(null);

function useCarousel(): CarouselContextValue {
    const context = useContext(CarouselContext);
    if (!context)
        throw new Error('useCarousel must be used within a <Carousel>');
    return context;
}

const Carousel = forwardRef<HTMLDivElement, CarouselProps>(
    ({ loop = false, onSlideChange, className, children, ...props }, ref) => {
        const [emblaRef, emblaApi] = useEmblaCarousel({ loop });
        const [canScrollPrev, setCanScrollPrev] = useState(false);
        const [canScrollNext, setCanScrollNext] = useState(false);
        const [selectedIndex, setSelectedIndex] = useState(0);
        const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

        const onSelect = useCallback(
            (api: UseEmblaCarouselType[1]) => {
                if (!api) return;
                setScrollSnaps(api.scrollSnapList());
                setSelectedIndex(api.selectedScrollSnap());
                setCanScrollPrev(api.canScrollPrev());
                setCanScrollNext(api.canScrollNext());
                onSlideChange?.(api.selectedScrollSnap());
            },
            [onSlideChange],
        );

        useEffect(() => {
            if (!emblaApi) return;
            emblaApi.on('select', onSelect);
            emblaApi.on('reInit', onSelect);
            onSelect(emblaApi);
            return () => {
                emblaApi.off('select', onSelect);
                emblaApi.off('reInit', onSelect);
            };
        }, [emblaApi, onSelect]);

        const scrollPrev = useCallback(
            () => emblaApi?.scrollPrev(),
            [emblaApi],
        );
        const scrollNext = useCallback(
            () => emblaApi?.scrollNext(),
            [emblaApi],
        );
        const scrollTo = useCallback(
            (index: number) => emblaApi?.scrollTo(index),
            [emblaApi],
        );

        const handleKeyDown = useCallback(
            (e: React.KeyboardEvent<HTMLDivElement>) => {
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    scrollPrev();
                }
                if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    scrollNext();
                }
            },
            [scrollPrev, scrollNext],
        );

        return (
            <CarouselContext.Provider
                value={{
                    emblaRef,
                    scrollPrev,
                    scrollNext,
                    canScrollPrev,
                    canScrollNext,
                    selectedIndex,
                    scrollSnaps,
                    scrollTo,
                }}
            >
                <div
                    ref={ref}
                    role="region"
                    aria-roledescription="carousel"
                    onKeyDown={handleKeyDown}
                    tabIndex={0}
                    className={cn(
                        'relative w-full focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent focus-visible:ring-offset-1 focus-visible:ring-offset-background-primary',
                        className,
                    )}
                    {...props}
                >
                    {children}
                    {scrollSnaps.length > 1 && (
                        <div
                            className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2"
                            aria-label="Slide indicators"
                        >
                            {scrollSnaps.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => scrollTo(i)}
                                    aria-label={`Go to slide ${i + 1}`}
                                    aria-current={
                                        i === selectedIndex ? 'true' : undefined
                                    }
                                    className={cn(
                                        'h-2 w-2 rounded-full border border-accent/50 transition-colors cursor-pointer',
                                        'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent',
                                        i === selectedIndex
                                            ? 'bg-accent'
                                            : 'bg-background-panel hover:bg-accent/40',
                                    )}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </CarouselContext.Provider>
        );
    },
);
Carousel.displayName = 'Carousel';

const CarouselContent = forwardRef<HTMLDivElement, CarouselContentProps>(
    ({ className, ...props }, ref) => {
        const { emblaRef } = useCarousel();
        return (
            <div
                ref={emblaRef}
                aria-live="polite"
                className="overflow-hidden rounded-xl"
            >
                <div ref={ref} className={cn('flex', className)} {...props} />
            </div>
        );
    },
);
CarouselContent.displayName = 'CarouselContent';

const CarouselItem = forwardRef<HTMLDivElement, CarouselItemProps>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            role="group"
            aria-roledescription="slide"
            className={cn('min-w-0 shrink-0 grow-0 basis-full', className)}
            {...props}
        />
    ),
);
CarouselItem.displayName = 'CarouselItem';

const CarouselPrevious = forwardRef<HTMLButtonElement, CarouselArrowProps>(
    ({ className, ...props }, ref) => {
        const { scrollPrev, canScrollPrev } = useCarousel();
        return (
            <button
                ref={ref}
                aria-label="Previous slide"
                aria-disabled={!canScrollPrev}
                onClick={scrollPrev}
                className={cn(
                    'absolute left-3 top-1/2 -translate-y-1/2 z-10',
                    'inline-flex items-center justify-center',
                    'h-9 w-9 rounded-full border-2',
                    'border-accent bg-background-panel text-accent',
                    'transition-colors cursor-pointer',
                    'hover:bg-accent/10 focus-visible:outline-none',
                    'focus-visible:ring-1 focus-visible:ring-accent focus-visible:ring-offset-1 focus-visible:ring-offset-background-primary',
                    !canScrollPrev && 'opacity-50 pointer-events-none',
                    className,
                )}
                {...props}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                >
                    <path d="m15 18-6-6 6-6" />
                </svg>
                <span className="sr-only">Previous slide</span>
            </button>
        );
    },
);
CarouselPrevious.displayName = 'CarouselPrevious';

const CarouselNext = forwardRef<HTMLButtonElement, CarouselArrowProps>(
    ({ className, ...props }, ref) => {
        const { scrollNext, canScrollNext } = useCarousel();
        return (
            <button
                ref={ref}
                aria-label="Next slide"
                aria-disabled={!canScrollNext}
                onClick={scrollNext}
                className={cn(
                    'absolute right-3 top-1/2 -translate-y-1/2 z-10',
                    'inline-flex items-center justify-center',
                    'h-9 w-9 rounded-full border-2',
                    'border-accent bg-background-panel text-accent',
                    'transition-colors cursor-pointer',
                    'hover:bg-accent/10 focus-visible:outline-none',
                    'focus-visible:ring-1 focus-visible:ring-accent focus-visible:ring-offset-1 focus-visible:ring-offset-background-primary',
                    !canScrollNext && 'opacity-50 pointer-events-none',
                    className,
                )}
                {...props}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                >
                    <path d="m9 18 6-6-6-6" />
                </svg>
                <span className="sr-only">Next slide</span>
            </button>
        );
    },
);
CarouselNext.displayName = 'CarouselNext';

export {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
};
export type { CarouselProps, CarouselImage };
