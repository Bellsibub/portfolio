/* eslint-disable react-refresh/only-export-components */
import { cn } from '@/lib/utils';
import { type VariantProps, cva } from 'class-variance-authority';

export const QuestCardVariants = cva('block', {
    variants: {
        variant: {
            default: 'text-white',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

export const QuestCard = ({
    className,
    variant,
    ...props
}: React.ComponentProps<'div'> & VariantProps<typeof QuestCardVariants>) => {
    return (
        <div
            className={cn(QuestCardVariants({ variant, className }))}
            {...props}
        >
            QuestCard
        </div>
    );
};

QuestCard.displayName = 'QuestCard';
