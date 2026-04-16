import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

interface SwitchProps extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'type'
> {
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
}

const Switch = forwardRef<HTMLInputElement, SwitchProps>(
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
                        'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                        checked ? 'bg-accent' : 'bg-muted',
                        className,
                    )}
                >
                    <span
                        className={cn(
                            'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                            checked ? 'translate-x-6' : 'translate-x-1',
                        )}
                    />
                </div>
            </label>
        );
    },
);

Switch.displayName = 'Switch';

export { Switch };
