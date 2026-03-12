import { type NavLink, Navbar } from '@/components/layouts';
import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_public')({
    component: PublicLayout,
});

const links: NavLink[] = [
    { name: 'Button', href: '#button' },
    { name: 'Dialog', href: '#dialog' },
    { name: 'Quest Card', href: '#quest-card' },
    { name: 'Badge', href: '#badge' },
];

function PublicLayout() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar links={links} />
            <main className="flex-1 space-y-2 p-10">
                <Outlet />
            </main>
        </div>
    );
}
