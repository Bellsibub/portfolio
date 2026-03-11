/* eslint-disable react-refresh/only-export-components */
import { cn } from '@/lib/utils';
import { type VariantProps, cva } from 'class-variance-authority';

export const InventoryItemVariants = cva('block', {
    variants: {
        variant: {
            default: 'text-white',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

export const InventoryItem = ({
    className,
    variant,
    ...props
}: React.ComponentProps<'div'> &
    VariantProps<typeof InventoryItemVariants>) => {
    return (
        <div
            className={cn(InventoryItemVariants({ variant, className }))}
            {...props}
        >
            InventoryItem
        </div>
    );
};

InventoryItem.displayName = 'InventoryItem';
