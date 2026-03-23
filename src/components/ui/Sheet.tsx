import { Dialog as RadixDialog } from 'radix-ui';
import { forwardRef } from 'react';

const Sheet = RadixDialog.Root;
const SheetTrigger = RadixDialog.Trigger;
const SheetClose = RadixDialog.Close;

const SheetOverlay = forwardRef<
    React.ElementRef<typeof RadixDialog.Overlay>,
    React.ComponentPropsWithoutRef<typeof RadixDialog.Overlay>
>(({ className = '', ...props }, ref) => (
    <RadixDialog.Overlay
        ref={ref}
        className={[
            'fixed inset-0 z-50 bg-black/60 backdrop-blur-sm',
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
            className,
        ].join(' ')}
        {...props}
    />
));
SheetOverlay.displayName = RadixDialog.Overlay.displayName;

const SheetContent = forwardRef<
    React.ElementRef<typeof RadixDialog.Content>,
    React.ComponentPropsWithoutRef<typeof RadixDialog.Content>
>(({ className = '', children, ...props }, ref) => (
    <RadixDialog.Portal>
        <SheetOverlay />
        <RadixDialog.Content
            ref={ref}
            className={[
                'fixed inset-y-0 right-0 z-50 w-3/4 max-w-sm',
                'bg-background-panel border-l border-accent/20 p-6 shadow-lg',
                'data-[state=open]:animate-in data-[state=closed]:animate-out',
                'data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right',
                className,
            ].join(' ')}
            {...props}
        >
            {children}
            <RadixDialog.Close className="absolute right-4 top-4 rounded opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background-panel transition-opacity">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                </svg>
                <span className="sr-only">Close</span>
            </RadixDialog.Close>
        </RadixDialog.Content>
    </RadixDialog.Portal>
));
SheetContent.displayName = RadixDialog.Content.displayName;

const SheetTitle = forwardRef<
    React.ElementRef<typeof RadixDialog.Title>,
    React.ComponentPropsWithoutRef<typeof RadixDialog.Title>
>(({ className = '', ...props }, ref) => (
    <RadixDialog.Title
        ref={ref}
        className={[
            'text-xl font-headings text-text-primary mb-2',
            className,
        ].join(' ')}
        {...props}
    />
));
SheetTitle.displayName = RadixDialog.Title.displayName;

const SheetDescription = forwardRef<
    React.ElementRef<typeof RadixDialog.Description>,
    React.ComponentPropsWithoutRef<typeof RadixDialog.Description>
>(({ className = '', ...props }, ref) => (
    <RadixDialog.Description
        ref={ref}
        className={['text-sm text-text-secondary', className].join(' ')}
        {...props}
    />
));
SheetDescription.displayName = RadixDialog.Description.displayName;

const SheetHeader = ({
    className = '',
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={['flex flex-col gap-1 mb-6', className].join(' ')}
        {...props}
    />
);
SheetHeader.displayName = 'SheetHeader';

const SheetFooter = ({
    className = '',
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={['flex flex-col gap-2 mt-6', className].join(' ')}
        {...props}
    />
);
SheetFooter.displayName = 'SheetFooter';

export {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetTitle,
    SheetDescription,
    SheetClose,
    SheetHeader,
    SheetFooter,
};
