import { Button } from '@/components/ui';
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
                'h-25 flex items-center justify-between px-10 sticky top-0 z-50 bg-background/80 backdrop-blur-sm',
                className,
            )}
            {...props}
        >
            <div>
                <h3>Bellsibub.dev</h3>
                <p className="caption">Fullstack developer</p>
            </div>
            <div className="inline-flex items-center gap-2">
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
        </nav>
    );
};

Navbar.displayName = 'Navbar';
