import { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ error = false, className = '', ...props }, ref) => {
        return (
            <input
                ref={ref}
                className={[
                    'w-full rounded px-3 py-2 text-base text-text-primary',
                    'bg-background-panel',
                    'border',
                    error
                        ? 'border-danger-lighter focus:ring-danger-lighter'
                        : 'border-accent/30 focus:ring-accent',
                    'focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-background-primary',
                    'placeholder:text-text-secondary',
                    'disabled:opacity-50 disabled:cursor-not-allowed',
                    'transition-colors',
                    className,
                ].join(' ')}
                {...props}
            />
        );
    },
);
Input.displayName = 'Input';

export { Input };
export type { InputProps };
