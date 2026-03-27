/* eslint-disable react-refresh/only-export-components */
import { cn } from '@/lib/utils';
import { type VariantProps, cva } from 'class-variance-authority';

export const CardVariants = cva('block', {
    variants: {
        variant: {
            default: 'bg-background-panel border-accent/20',
            featured:
                'bg-background-panel border-accent rounded-t-2xl border-t-9 border-t-accent [&_[data-slot="title"]]:text-accent',
            accent: 'bg-background-panel border-accent bg-accent/10 [&_[data-slot="title"]]:text-accent',
            ghost: 'bg-background-panel/30 border-transparent',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

export type CardProps = React.ComponentProps<'div'> &
    VariantProps<typeof CardVariants>;

export const Card = ({ className, variant, children, ...props }: CardProps) => {
    return (
        <div
            className={
                'flex flex-col gap-3 p-6 rounded-xl border ' +
                cn(CardVariants({ variant, className }))
            }
            {...props}
        >
            {children}
        </div>
    );
};

Card.displayName = 'Card';

export const CardTitle = ({
    className,
    ...props
}: React.ComponentProps<'h3'>) => {
    return (
        <h3
            data-slot="title"
            className={cn('text-lg font-headings', className)}
            {...props}
        />
    );
};

CardTitle.displayName = 'CardTitle';

export const CardDescription = ({
    className,
    ...props
}: React.ComponentProps<'p'>) => {
    return (
        <p
            className={cn('text-sm text-text-secondary', className)}
            {...props}
        />
    );
};

CardDescription.displayName = 'CardDescription';

export const CardContent = ({
    className,
    ...props
}: React.ComponentProps<'div'>) => {
    return <div className={cn('flex-1', className)} {...props} />;
};

CardContent.displayName = 'CardContent';

export const CardFooter = ({
    className,
    ...props
}: React.ComponentProps<'div'>) => {
    return (
        <div
            className={cn('flex items-center justify-end gap-2', className)}
            {...props}
        />
    );
};

CardFooter.displayName = 'CardFooter';
