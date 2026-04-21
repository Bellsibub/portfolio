import { cn } from '@/lib/utils';
import { type VariantProps, cva } from 'class-variance-authority';

export const BadgeVariants = cva(
    'block caption px-3 py-1 rounded-lg border uppercase tracking-widest font-semibold',
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
        },
        defaultVariants: {
            variant: 'default',
        },
    },
);

export const Badge = ({
    className,
    variant,
    children,
    ...props
}: React.ComponentProps<'div'> & VariantProps<typeof BadgeVariants>) => {
    return (
        <div className={cn(BadgeVariants({ variant, className }))} {...props}>
            {children}
        </div>
    );
};

Badge.displayName = 'Badge';
