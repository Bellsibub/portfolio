import { DropdownMenu as RadixDropdownMenu } from 'radix-ui';
import { forwardRef } from 'react';

const DropdownMenu = RadixDropdownMenu.Root;
const DropdownMenuTrigger = RadixDropdownMenu.Trigger;
const DropdownMenuSub = RadixDropdownMenu.Sub;

const DropdownMenuContent = forwardRef<
    React.ElementRef<typeof RadixDropdownMenu.Content>,
    React.ComponentPropsWithoutRef<typeof RadixDropdownMenu.Content>
>(({ className = '', sideOffset = 6, ...props }, ref) => (
    <RadixDropdownMenu.Portal>
        <RadixDropdownMenu.Content
            ref={ref}
            sideOffset={sideOffset}
            className={[
                'z-50 min-w-48 overflow-hidden rounded border border-accent-primary/20',
                'bg-background-panel p-1 shadow-lg',
                'animate-in data-[state=closed]:animate-out',
                'fade-in-0 data-[state=closed]:fade-out-0',
                'zoom-in-95 data-[state=closed]:zoom-out-95',
                'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
                'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
                className,
            ].join(' ')}
            {...props}
        />
    </RadixDropdownMenu.Portal>
));
DropdownMenuContent.displayName = RadixDropdownMenu.Content.displayName;

const DropdownMenuItem = forwardRef<
    React.ElementRef<typeof RadixDropdownMenu.Item>,
    React.ComponentPropsWithoutRef<typeof RadixDropdownMenu.Item>
>(({ className = '', ...props }, ref) => (
    <RadixDropdownMenu.Item
        ref={ref}
        className={[
            'relative flex cursor-pointer select-none items-center gap-2 rounded px-2 py-1.5',
            'text-sm text-text-primary outline-none transition-colors',
            'focus:bg-accent-primary/10 focus:text-text-primary',
            'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
            className,
        ].join(' ')}
        {...props}
    />
));
DropdownMenuItem.displayName = RadixDropdownMenu.Item.displayName;

const DropdownMenuLabel = forwardRef<
    React.ElementRef<typeof RadixDropdownMenu.Label>,
    React.ComponentPropsWithoutRef<typeof RadixDropdownMenu.Label>
>(({ className = '', ...props }, ref) => (
    <RadixDropdownMenu.Label
        ref={ref}
        className={[
            'px-2 py-1.5 text-xs font-semibold text-text-secondary',
            className,
        ].join(' ')}
        {...props}
    />
));
DropdownMenuLabel.displayName = RadixDropdownMenu.Label.displayName;

const DropdownMenuSeparator = forwardRef<
    React.ElementRef<typeof RadixDropdownMenu.Separator>,
    React.ComponentPropsWithoutRef<typeof RadixDropdownMenu.Separator>
>(({ className = '', ...props }, ref) => (
    <RadixDropdownMenu.Separator
        ref={ref}
        className={['-mx-1 my-1 h-px bg-accent-primary/20', className].join(
            ' ',
        )}
        {...props}
    />
));
DropdownMenuSeparator.displayName = RadixDropdownMenu.Separator.displayName;

const DropdownMenuSubTrigger = forwardRef<
    React.ElementRef<typeof RadixDropdownMenu.SubTrigger>,
    React.ComponentPropsWithoutRef<typeof RadixDropdownMenu.SubTrigger>
>(({ className = '', children, ...props }, ref) => (
    <RadixDropdownMenu.SubTrigger
        ref={ref}
        className={[
            'relative flex cursor-pointer select-none items-center gap-2 rounded px-2 py-1.5',
            'text-sm text-text-primary outline-none transition-colors',
            'focus:bg-accent-primary/10 data-[state=open]:bg-accent-primary/10',
            'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
            className,
        ].join(' ')}
        {...props}
    >
        {children}
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="ml-auto"
            aria-hidden="true"
        >
            <path d="m9 18 6-6-6-6" />
        </svg>
    </RadixDropdownMenu.SubTrigger>
));
DropdownMenuSubTrigger.displayName = RadixDropdownMenu.SubTrigger.displayName;

const DropdownMenuSubContent = forwardRef<
    React.ElementRef<typeof RadixDropdownMenu.SubContent>,
    React.ComponentPropsWithoutRef<typeof RadixDropdownMenu.SubContent>
>(({ className = '', ...props }, ref) => (
    <RadixDropdownMenu.SubContent
        ref={ref}
        className={[
            'z-50 min-w-32 overflow-hidden rounded border border-accent-primary/20',
            'bg-background-panel p-1 shadow-lg',
            'animate-in data-[state=closed]:animate-out',
            'fade-in-0 data-[state=closed]:fade-out-0',
            'zoom-in-95 data-[state=closed]:zoom-out-95',
            'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
            'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
            className,
        ].join(' ')}
        {...props}
    />
));
DropdownMenuSubContent.displayName = RadixDropdownMenu.SubContent.displayName;

export {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuLabel,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuSubContent,
};
