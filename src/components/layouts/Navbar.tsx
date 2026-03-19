import {
    Button,
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui';
import { cn } from '@/lib/utils';
import { Link } from '@tanstack/react-router';

export type NavLink = {
    name: string;
    href: string;
};

type NavbarProps = {
    links?: NavLink[];
    className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export const Navbar = ({ links, className, ...props }: NavbarProps) => {
    return (
        <nav
            className={cn(
                'h-25 flex items-center justify-between px-5 lg:px-20 sticky top-0 z-50 bg-background/80 backdrop-blur-sm',
                className,
            )}
            {...props}
        >
            <div>
                <h3>Bellsibub.dev</h3>
                <p className="caption">Fullstack developer</p>
            </div>
            <div className="hidden lg:flex items-center gap-2">
                {links?.map((link) => (
                    <Button asChild key={link.href} variant="ghost" size="sm">
                        <Link
                            to={link.href}
                            className="text-text-primary"
                            activeProps={{ className: 'text-accent!' }}
                        >
                            {link.name}
                        </Link>
                    </Button>
                ))}
            </div>
            <Sheet>
                <SheetTrigger asChild>
                    <button
                        className="lg:hidden p-2 rounded opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-accent transition-opacity"
                        aria-label="Open menu"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <line x1="4" y1="6" x2="20" y2="6" />
                            <line x1="4" y1="12" x2="20" y2="12" />
                            <line x1="4" y1="18" x2="20" y2="18" />
                        </svg>
                    </button>
                </SheetTrigger>
                <SheetContent>
                    <SheetTitle className="sr-only">Menu</SheetTitle>
                    <nav className="flex flex-col gap-2 mt-8">
                        {links?.map((link) => (
                            <Button
                                asChild
                                key={link.href}
                                variant="ghost"
                                size="sm"
                            >
                                <Link
                                    to={link.href}
                                    className="text-text-primary justify-start"
                                    activeProps={{ className: 'text-accent!' }}
                                >
                                    {link.name}
                                </Link>
                            </Button>
                        ))}
                    </nav>
                </SheetContent>
            </Sheet>
        </nav>
    );
};

Navbar.displayName = 'Navbar';
