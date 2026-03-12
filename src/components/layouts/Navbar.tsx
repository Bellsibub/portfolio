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
            <div>
                {links?.map((link) => (
                    <Link
                        key={link.href}
                        to={link.href}
                        className="text-sm font-medium text-gray-300 hover:text-white"
                    >
                        {link.name}
                    </Link>
                ))}
            </div>
        </nav>
    );
};

Navbar.displayName = 'Navbar';
