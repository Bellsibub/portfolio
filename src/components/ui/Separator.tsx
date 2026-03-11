import { cn } from '@/lib/utils';
import { type VariantProps, cva } from 'class-variance-authority';
import { Separator as RadixSeparator } from 'radix-ui';
import { forwardRef } from 'react';

const separatorVariants = cva('block', {
    variants: {
        variant: {
            default: 'bg-accent/20',
            subtle: 'bg-white/10',
            accent: 'bg-accent',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

export type SeparatorProps = React.ComponentPropsWithoutRef<
    typeof RadixSeparator.Root
> &
    VariantProps<typeof separatorVariants>;

const Separator = forwardRef<
    React.ElementRef<typeof RadixSeparator.Root>,
    SeparatorProps
>(
    (
        {
            className,
            orientation = 'horizontal',
            variant,
            decorative = true,
            ...props
        },
        ref,
    ) => (
        <RadixSeparator.Root
            ref={ref}
            orientation={orientation}
            decorative={decorative}
            className={cn(
                separatorVariants({ variant }),
                orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
                className,
            )}
            {...props}
        />
    ),
);
Separator.displayName = 'Separator';

export { Separator };
