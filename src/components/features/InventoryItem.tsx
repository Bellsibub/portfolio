import { cn } from '@/lib/utils';
import { type VariantProps, cva } from 'class-variance-authority';
import type { DeveloperIconProps } from 'developer-icons/dist/icon';

export type Item = {
    id: string;
    name: string;
    description: string;
    Icon: React.ComponentType<DeveloperIconProps> | undefined | null;
    isEquipped: boolean;
};

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
    const resolvedVariant = !item
        ? 'empty'
        : item.isEquipped
          ? 'equipped'
          : variant;
    return (
        <div
            className={cn(
                InventoryItemVariants({ variant: resolvedVariant, className }),
                'group',
            )}
            {...props}
        >
            {item?.Icon && (
                <item.Icon className="transition-[width,height] duration-500 ease-in-out size-14 group-hover:size-7" />
            )}
            <span
                className={cn(
                    'caption tracking-widest overflow-hidden',
                    item?.Icon &&
                        'opacity-0 max-h-0 transition-[max-height,opacity] duration-500 ease-in-out group-hover:max-h-8 group-hover:opacity-100',
                )}
            >
                {item?.name}
            </span>
        </div>
    );
};

InventoryItem.displayName = 'InventoryItem';
