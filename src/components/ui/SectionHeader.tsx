/* eslint-disable react-refresh/only-export-components */
import { Separator } from '@/components/ui/Separator';
import { cn } from '@/lib/utils';
import { type VariantProps, cva } from 'class-variance-authority';

export const SectionHeaderVariants = cva(
    'flex items-center gap-6 lg:gap-16 flex-1',
    {
        variants: {
            variant: {
                default: 'text-text-primary',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    },
);

type SectionHeaderProps = {
    title: string;
} & React.ComponentProps<'div'> &
    VariantProps<typeof SectionHeaderVariants>;

export const SectionHeader = ({
    className,
    variant,
    title,
    ...props
}: SectionHeaderProps) => {
    return (
        <div
            className={cn(SectionHeaderVariants({ variant, className }))}
            {...props}
        >
            <h2 className="shrink-0">{title}</h2>
            <Separator variant="accent" />
        </div>
    );
};

SectionHeader.displayName = 'SectionHeader';
