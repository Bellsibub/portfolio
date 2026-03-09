import { Slot as RadixSlot } from 'radix-ui';
import { forwardRef } from 'react';

type ButtonVariant = 'primary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    asChild?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
    primary:
        'bg-accent-primary text-background-primary hover:bg-accent-darker focus-visible:ring-accent-primary border-transparent',
    ghost: 'bg-transparent text-text-primary hover:bg-accent-primary/10 focus-visible:ring-accent-primary border-accent-primary/50',
    danger: 'bg-danger-primary text-text-primary hover:bg-danger-darker focus-visible:ring-danger-primary border-transparent',
};

const sizeClasses: Record<ButtonSize, string> = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
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
                    'inline-flex items-center justify-center gap-2 rounded border cursor-pointer',
                    'font-body tracking-wide transition-colors',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary',
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
