import { Separator } from '@/components/ui/Separator';
import { cn } from '@/lib/utils';
import { type VariantProps, cva } from 'class-variance-authority';

export const SectionHeaderVariants = cva(
    'flex items-center gap-6 lg:gap-16 flex-1',
    {
        variants: {
            variant: {
                default: 'text-text-primary',
                image: 'text-text-primary relative overflow-hidden basis-auto h-35',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    },
);

type SectionHeaderProps = {
    title: string;
    imageUrl?: string;
    caption?: string;
} & React.ComponentProps<'div'> &
    VariantProps<typeof SectionHeaderVariants>;

export const SectionHeader = ({
    className,
    variant,
    title,
    imageUrl,
    caption,
    ...props
}: SectionHeaderProps) => {
    return (
        <div
            className={cn(SectionHeaderVariants({ variant, className }))}
            {...props}
        >
            <div className="flex flex-col gap-2">
                <h2 className="shrink-0">{title}</h2>
                {caption && <p className="caption">{caption}</p>}
            </div>
            {variant !== 'image' && <Separator variant="accent" />}
            {imageUrl && (
                <div className="absolute inset-y-0 right-0 w-[65%] pointer-events-none -z-10">
                    <img
                        src={imageUrl}
                        alt=""
                        className="h-full w-full object-cover rounded-xl"
                    />
                    <div className="absolute inset-0 bg-linear-to-r from-background-primary to-transparent" />
                </div>
            )}
        </div>
    );
};

SectionHeader.displayName = 'SectionHeader';
