import { useIsMobile } from '@/lib/hooks/useIsMobile';
import type { Skill } from '@/lib/react-query/useQuests';
import { cn } from '@/lib/utils';
import { type VariantProps, cva } from 'class-variance-authority';

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '../ui';

export interface Item extends Skill {
    Icon: React.ComponentType<{ className?: string }> | undefined | null;
    isEquipped: boolean;
}

export const InventoryItemVariants = cva(
    'size-[80px] flex flex-col items-center justify-center p-3 gap-2 bg-background-panel rounded-lg border',
    {
        variants: {
            variant: {
                default:
                    'border-accent/20 hover:border-accent transition-all duration-500 ease-in-out',
                equipped:
                    'border-accent bg-accent/10 border-t-9 rounded-t-2xl ',
                empty: 'border-dashed border-accent/20 bg-transparent',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    },
);

type InventoryItemProps = {
    item: Item | null | undefined;
} & React.ComponentProps<'div'> &
    VariantProps<typeof InventoryItemVariants>;

export const InventoryItem = ({
    className,
    variant,
    item,
    ...props
}: InventoryItemProps) => {
    const isMobile = useIsMobile();
    const resolvedVariant = !item
        ? 'empty'
        : item.isEquipped
          ? 'equipped'
          : variant;

    const itemBox = (
        <div
            className={cn(
                InventoryItemVariants({ variant: resolvedVariant, className }),
                'group',
            )}
            {...props}
        >
            {item?.Icon && (
                <item.Icon className="transition-[width,height] duration-500 ease-in-out size-14 group-hover:size-10 group-data-[state=open]:size-10" />
            )}
            {!item?.Icon && (
                <span className="caption tracking-widest overflow-hidden">
                    {item?.name}
                </span>
            )}
        </div>
    );

    if (!item?.name || !item?.Icon) return itemBox;

    if (isMobile) {
        return (
            <Popover>
                <PopoverTrigger asChild>{itemBox}</PopoverTrigger>
                <PopoverContent side="top">{item.name}</PopoverContent>
            </Popover>
        );
    }

    return (
        <Tooltip delayDuration={1000}>
            <TooltipTrigger asChild>{itemBox}</TooltipTrigger>
            <TooltipContent side="top">{item.name}</TooltipContent>
        </Tooltip>
    );
};

InventoryItem.displayName = 'InventoryItem';
