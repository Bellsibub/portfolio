/* eslint-disable react-refresh/only-export-components */
import { cn } from '@/lib/utils';
import { type VariantProps, cva } from 'class-variance-authority';
import type { DeveloperIconProps } from 'developer-icons/dist/icon';

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
    const resolvedVariant = !Icon && !label ? 'empty' : variant;
    return (
        <div
            className={cn(
                InventoryItemVariants({ variant: resolvedVariant, className }),
                'group',
            )}
            {...props}
        >
            {Icon && (
                <Icon className="transition-[width,height] duration-500 ease-in-out size-14 group-hover:size-7" />
            )}
            <span className="caption tracking-widest opacity-0 max-h-0 overflow-hidden transition-[max-height,opacity] duration-500 ease-in-out group-hover:max-h-8 group-hover:opacity-100">
                {label}
            </span>
        </div>
    );
};

InventoryItem.displayName = 'InventoryItem';
