import { Slot as RadixSlot } from 'radix-ui';
import { forwardRef } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    asChild?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
    primary:
        'bg-accent text-text-inverted hover:bg-accent-darker focus-visible:ring-accent border-accent-darker',
    secondary:
        'bg-secondary text-text-inverted hover:bg-secondary-darker focus-visible:ring-secondary border-accent',
    outline:
        'bg-transparent text-accent hover:bg-accent/10 focus-visible:ring-accent border-accent',
    ghost: 'bg-transparent text-accent hover:bg-accent/10 focus-visible:ring-accent border-transparent',
    link: 'bg-transparent text-accent underline underline-offset-7 focus-visible:ring-accent border-transparent hover:text-accent-darker',
};

const sizeClasses: Record<ButtonSize, string> = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-3 py-1 text-sm lg:px-4 lg:py-2 lg:text-base',
    lg: 'px-4 py-2 text-base lg:px-6 lg:py-3 lg:text-lg',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            variant = 'primary',
            size = 'md',
            asChild = false,
            className = '',
            ...props
        },
        ref,
    ) => {
        const Comp = asChild ? RadixSlot.Slot : 'button';
        return (
            <Comp
                ref={ref}
                className={[
                    'inline-flex items-center justify-center gap-2 rounded-lg border-2 cursor-pointer',
                    'font-body tracking-[25%] transition-colors',
                    'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:ring-offset-background-primary',
                    'disabled:opacity-50 disabled:pointer-events-none',
                    variantClasses[variant],
                    sizeClasses[size],
                    className,
                ].join(' ')}
                {...props}
            />
        );
    },
);
Button.displayName = 'Button';

export { Button };
export type { ButtonProps };
