import { Popover as RadixPopover } from 'radix-ui';
import { forwardRef } from 'react';

const Popover = RadixPopover.Root;
const PopoverTrigger = RadixPopover.Trigger;

const PopoverContent = forwardRef<
    React.ElementRef<typeof RadixPopover.Content>,
    React.ComponentPropsWithoutRef<typeof RadixPopover.Content>
>(({ className = '', sideOffset = 6, ...props }, ref) => (
    <RadixPopover.Portal>
        <RadixPopover.Content
            ref={ref}
            sideOffset={sideOffset}
            className={[
                'z-50 overflow-hidden rounded border border-accent/30',
                'bg-background-panel px-3 py-1.5',
                'font-body text-xs text-text-primary',
                'shadow-md',
                'animate-in fade-in-0 zoom-in-95',
                'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
                'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
                'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
                className,
            ].join(' ')}
            {...props}
        >
            {props.children}
            <RadixPopover.Arrow className="fill-accent/30" />
        </RadixPopover.Content>
    </RadixPopover.Portal>
));
PopoverContent.displayName = RadixPopover.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent };
