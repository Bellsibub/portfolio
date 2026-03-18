/* eslint-disable react-refresh/only-export-components */
import { cn } from '@/lib/utils';
import { type VariantProps, cva } from 'class-variance-authority';
import { Avatar as RadixAvatar } from 'radix-ui';

export const avatarVariants = cva('relative flex shrink-0 overflow-hidden', {
    variants: {
        size: {
            sm: 'size-8',
            md: 'size-10',
            lg: 'size-16',
            xl: 'size-32',
            '2xl': 'size-48',
            '3xl': 'size-64',
            '4xl': 'size-96',
        },
        shape: {
            circle: 'rounded-full',
            rounded: 'rounded-2xl',
            square: 'rounded-none',
        },
    },
    defaultVariants: {
        size: 'md',
        shape: 'circle',
    },
});

type AvatarProps = React.ComponentProps<typeof RadixAvatar.Root> &
    VariantProps<typeof avatarVariants>;

export const Avatar = ({ className, size, shape, ...props }: AvatarProps) => (
    <RadixAvatar.Root
        className={cn(avatarVariants({ size, shape }), className)}
        {...props}
    />
);

export const AvatarImage = ({
    className,
    ...props
}: React.ComponentProps<typeof RadixAvatar.Image>) => (
    <RadixAvatar.Image
        className={cn('aspect-square size-full object-cover', className)}
        {...props}
    />
);

export const AvatarFallback = ({
    className,
    ...props
}: React.ComponentProps<typeof RadixAvatar.Fallback>) => (
    <RadixAvatar.Fallback
        className={cn(
            'flex size-full items-center justify-center bg-background-panel text-text-secondary text-sm font-semibold',
            className,
        )}
        {...props}
    />
);

Avatar.displayName = 'Avatar';
AvatarImage.displayName = 'AvatarImage';
AvatarFallback.displayName = 'AvatarFallback';
