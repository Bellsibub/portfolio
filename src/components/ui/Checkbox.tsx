import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

interface CheckboxProps extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'type'
> {
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
    ({ className, checked, onCheckedChange, onChange, ...props }, ref) => {
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            onCheckedChange?.(e.target.checked);
            onChange?.(e);
        };

        return (
            <label className="inline-flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    ref={ref}
                    checked={checked}
                    onChange={handleChange}
                    className="sr-only"
                    {...props}
                />
                <div
                    className={cn(
                        'flex h-4 w-4 items-center justify-center rounded border border-muted-foreground/20 bg-background',
                        checked && 'bg-accent border-accent',
                        className,
                    )}
                >
                    {checked && (
                        <svg
                            className="h-3 w-3 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    )}
                </div>
            </label>
        );
    },
);

Checkbox.displayName = 'Checkbox';

export { Checkbox };
