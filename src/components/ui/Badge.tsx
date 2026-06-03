import { cn } from '@/lib/utils';
import { type VariantProps, cva } from 'class-variance-authority';

export const BadgeVariants = cva(
    'block caption rounded-lg border font-semibold',
    {
        variants: {
            variant: {
                default: 'border-transparent bg-accent text-background-primary',
                outline: 'border-accent text-accent',
                secondary:
                    'border-transparent bg-secondary text-background-primary',
                primary:
                    'border-transparent bg-primary text-background-primary',
            },
            size: {
                default: 'px-3 py-1 uppercase tracking-widest',
                sm: 'px-2 py-0.5 text-xs',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
);

export const Badge = ({
    className,
    variant,
    size,
    children,
    ...props
}: React.ComponentProps<'div'> & VariantProps<typeof BadgeVariants>) => {
    return (
        <div
            className={cn(BadgeVariants({ variant, size, className }))}
            {...props}
        >
            {children}
        </div>
    );
};

Badge.displayName = 'Badge';
