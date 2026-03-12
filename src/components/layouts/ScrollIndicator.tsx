import { cn } from '@/lib/utils';
import { Link } from '@tanstack/react-router';

import type { NavLink } from './Navbar';

type ScrollIndicatorProps = {
    links: NavLink[];
    activeIndex: number;
};

export const ScrollIndicator = ({
    links,
    activeIndex,
}: ScrollIndicatorProps) => {
    return (
        <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4 items-end">
            {links.map(({ name, href }, index) => {
                const isActive = index === activeIndex;

                return (
                    <Link
                        key={href}
                        to={href as string}
                        className="group flex items-center gap-3"
                        aria-label={name}
                    >
                        <span
                            className={cn(
                                'text-xs font-mono transition-all duration-200 opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0',
                                isActive
                                    ? 'text-accent'
                                    : 'text-text-secondary',
                            )}
                        >
                            {name}
                        </span>
                        <span
                            className={cn(
                                'block rounded-full transition-all duration-300',
                                isActive
                                    ? 'w-3 h-3 bg-accent'
                                    : 'w-2 h-2 bg-text-tertiary group-hover:bg-text-secondary',
                            )}
                        />
                    </Link>
                );
            })}
        </div>
    );
};

ScrollIndicator.displayName = 'ScrollIndicator';
