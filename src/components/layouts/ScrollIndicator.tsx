import { cn } from '@/lib/utils';
import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { useState } from 'react';

import type { NavLink } from './Navbar';

type ScrollIndicatorProps = {
    links: NavLink[];
    activeIndex: number;
};

export const ScrollIndicator = ({
    links,
    activeIndex,
}: ScrollIndicatorProps) => {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div
            className={cn(
                'fixed right-2 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4 items-end group',
                'transition-all duration-300 ease-in-out rounded-lg bg-transparent',
                'hover:bg-background-panel/80 hover:p-4 hover:backdrop-blur-sm',
                mobileOpen && 'bg-background-primary/50 p-4 backdrop-blur-sm',
            )}
            onClick={() => setMobileOpen((prev) => !prev)}
        >
            {links.map(({ name, href }, index) => {
                const isActive = index === activeIndex;

                return (
                    <Link
                        key={href}
                        to={href as string}
                        className={cn(
                            'flex items-center gap-3 scale-100 hover:scale-125 transition-transform duration-300 ease-in-out',
                            'pointer-events-none lg:pointer-events-auto',
                            mobileOpen && 'pointer-events-auto',
                        )}
                        aria-label={name}
                        onClick={(e) => {
                            setMobileOpen(false);
                            e.stopPropagation();
                        }}
                    >
                        <span
                            className={cn(
                                'text-xs font-mono transition-all duration-300',
                                'opacity-0 translate-x-1',
                                'lg:group-hover:opacity-100 lg:group-hover:translate-x-0',
                                mobileOpen && 'opacity-100 translate-x-0',
                                isActive
                                    ? 'text-accent'
                                    : 'text-text-secondary',
                            )}
                        >
                            {name}
                        </span>
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            className={cn(
                                '-rotate-90 transition-all duration-300',
                                isActive
                                    ? 'text-accent'
                                    : 'text-text-tertiary group-hover:text-text-secondary',
                            )}
                        >
                            {/* background track */}
                            <circle
                                cx="10"
                                cy="10"
                                r="7"
                                strokeWidth="1.5"
                                fill="none"
                                stroke="currentColor"
                                className="opacity-20"
                            />
                            {/* animated progress ring */}
                            <motion.circle
                                cx="10"
                                cy="10"
                                r="7"
                                strokeWidth="1.5"
                                fill="none"
                                stroke="currentColor"
                                pathLength="1"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: isActive ? 1 : 0 }}
                                transition={{
                                    duration: 0.5,
                                    ease: 'easeInOut',
                                }}
                            />
                            {/* center dot */}
                            <motion.circle
                                cx="10"
                                cy="10"
                                fill="currentColor"
                                initial={{ r: 0 }}
                                animate={{ r: isActive ? 2.5 : 1.5 }}
                                transition={{
                                    duration: 0.3,
                                    ease: 'easeInOut',
                                }}
                            />
                        </svg>
                    </Link>
                );
            })}
        </div>
    );
};

ScrollIndicator.displayName = 'ScrollIndicator';
