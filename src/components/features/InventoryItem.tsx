/* eslint-disable react-refresh/only-export-components */
import { cn } from '@/lib/utils';
import { type VariantProps, cva } from 'class-variance-authority';
import type { DeveloperIconProps } from 'developer-icons/dist/icon';

// import { React } from 'developer-icons';
export const InventoryItemVariants = cva(
    'size-[80px] flex flex-col items-center justify-center p-3 gap-2 bg-background-panel rounded-lg border',
    {
        variants: {
            variant: {
                default:
                    'border-accent/20 hover:border-accent transition-all duration-500 ease-in-out',
                equipped:
                    'border-accent bg-accent/10 border-t-9 rounded-t-2xl ',
                empty: 'border-transparent',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    },
);

type InventoryItemProps = {
    Icon: React.ComponentType<DeveloperIconProps> | undefined | null;
    label: string | null | undefined;
} & React.ComponentProps<'div'> &
    VariantProps<typeof InventoryItemVariants>;

export const InventoryItem = ({
    className,
    variant,
    Icon,
    label,
    ...props
}: InventoryItemProps) => {
    return (
        <div
            className={cn(
                InventoryItemVariants({ variant, className }),
                'group',
            )}
            {...props}
        >
            {Icon && (
                <Icon className="transition-all duration-500 size-12 group-hover:size-7" />
            )}
            <span className="caption tracking-widest opacity-0 hidden transition-[display,opacity] transition-discrete duration-500 group-hover:inline-block group-hover:opacity-100 starting:opacity-0">
                {label}
            </span>
        </div>
    );
};

InventoryItem.displayName = 'InventoryItem';
