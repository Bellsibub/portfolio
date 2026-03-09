import { forwardRef } from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ error = false, className = '', ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={[
          'w-full rounded px-3 py-2 text-base text-text-primary',
          'bg-background-panel',
          'border',
          error
            ? 'border-danger-lighter focus:ring-danger-lighter'
            : 'border-accent-primary/30 focus:ring-accent-primary',
          'focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-background-primary',
          'placeholder:text-text-secondary',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'resize-y transition-colors',
          className,
        ].join(' ')}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
export type { TextareaProps };
