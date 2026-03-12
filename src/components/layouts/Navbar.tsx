import { cn } from '@/lib/utils';

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
                'h-25 flex items-center justify-between px-10',
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
                    <a
                        key={link.href}
                        href={link.href}
                        className="text-sm font-medium text-gray-300 hover:text-white"
                    >
                        {link.name}
                    </a>
                ))}
            </div>
        </nav>
    );
};

Navbar.displayName = 'Navbar';
