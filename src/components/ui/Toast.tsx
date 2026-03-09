import { forwardRef } from 'react';
import { Toast as RadixToast } from 'radix-ui';

type ToastVariant = 'default' | 'success' | 'error';

const ToastProvider = RadixToast.Provider;

const ToastViewport = forwardRef<
  React.ElementRef<typeof RadixToast.Viewport>,
  React.ComponentPropsWithoutRef<typeof RadixToast.Viewport>
>(({ className = '', ...props }, ref) => (
  <RadixToast.Viewport
    ref={ref}
    className={[
      'fixed bottom-4 right-4 z-[100] flex flex-col gap-2',
      'w-[380px] max-w-[100vw]',
      className,
    ].join(' ')}
    {...props}
  />
));
ToastViewport.displayName = RadixToast.Viewport.displayName;

const variantClasses: Record<ToastVariant, string> = {
  default: 'bg-background-panel border-accent-primary/20',
  success: 'bg-accent-darker border-accent-primary',
  error: 'bg-danger-primary border-danger-lighter/50',
};

interface ToastProps extends React.ComponentPropsWithoutRef<typeof RadixToast.Root> {
  variant?: ToastVariant;
}

const Toast = forwardRef<React.ElementRef<typeof RadixToast.Root>, ToastProps>(
  ({ className = '', variant = 'default', ...props }, ref) => (
    <RadixToast.Root
      ref={ref}
      className={[
        'group relative flex items-start gap-3 overflow-hidden rounded border p-4 shadow-lg',
        'text-text-primary transition-all',
        'data-[state=open]:animate-in data-[state=closed]:animate-out',
        'data-[state=closed]:fade-out-80 data-[state=open]:fade-in-0',
        'data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-right-full',
        variantClasses[variant],
        className,
      ].join(' ')}
      {...props}
    />
  )
);
Toast.displayName = RadixToast.Root.displayName;

const ToastTitle = forwardRef<
  React.ElementRef<typeof RadixToast.Title>,
  React.ComponentPropsWithoutRef<typeof RadixToast.Title>
>(({ className = '', ...props }, ref) => (
  <RadixToast.Title
    ref={ref}
    className={['text-sm font-semibold text-text-primary', className].join(' ')}
    {...props}
  />
));
ToastTitle.displayName = RadixToast.Title.displayName;

const ToastDescription = forwardRef<
  React.ElementRef<typeof RadixToast.Description>,
  React.ComponentPropsWithoutRef<typeof RadixToast.Description>
>(({ className = '', ...props }, ref) => (
  <RadixToast.Description
    ref={ref}
    className={['text-sm text-text-secondary', className].join(' ')}
    {...props}
  />
));
ToastDescription.displayName = RadixToast.Description.displayName;

const ToastAction = forwardRef<
  React.ElementRef<typeof RadixToast.Action>,
  React.ComponentPropsWithoutRef<typeof RadixToast.Action>
>(({ className = '', ...props }, ref) => (
  <RadixToast.Action
    ref={ref}
    className={[
      'ml-auto shrink-0 rounded border border-accent-primary/30 px-3 py-1',
      'text-xs text-text-primary transition-colors',
      'hover:bg-accent-primary/10 focus:outline-none focus:ring-2 focus:ring-accent-primary',
      className,
    ].join(' ')}
    {...props}
  />
));
ToastAction.displayName = RadixToast.Action.displayName;

const ToastClose = forwardRef<
  React.ElementRef<typeof RadixToast.Close>,
  React.ComponentPropsWithoutRef<typeof RadixToast.Close>
>(({ className = '', ...props }, ref) => (
  <RadixToast.Close
    ref={ref}
    className={[
      'absolute right-2 top-2 rounded opacity-70 transition-opacity',
      'hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-accent-primary',
      className,
    ].join(' ')}
    {...props}
  >
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='14'
      height='14'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-hidden='true'
    >
      <path d='M18 6 6 18' />
      <path d='m6 6 12 12' />
    </svg>
    <span className='sr-only'>Close</span>
  </RadixToast.Close>
));
ToastClose.displayName = RadixToast.Close.displayName;

export {
  ToastProvider,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastAction,
  ToastClose,
  ToastViewport,
};
export type { ToastProps };
