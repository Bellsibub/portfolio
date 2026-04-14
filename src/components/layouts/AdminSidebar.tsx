import { Sheet, SheetContent, SheetTitle } from '@/components/ui';
import supabase from '@/lib/supabase/client';
import { cn } from '@/lib/utils';
import { Link, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';

type SidebarLink = {
    label: string;
    to: string;
    icon: React.ReactNode;
};

const links: SidebarLink[] = [
    {
        label: 'Dashboard',
        to: '/admin/',
        icon: (
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
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
            </svg>
        ),
    },
    {
        label: 'Character',
        to: '/admin/character',
        icon: (
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
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
            </svg>
        ),
    },
    {
        label: 'Skills',
        to: '/admin/skills',
        icon: (
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
                <polyline points="22,12 18,12 15,21 9,3 6,12 2,12" />
            </svg>
        ),
    },
    {
        label: 'Lore',
        to: '/admin/lore',
        icon: (
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
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
        ),
    },
    {
        label: 'Quests',
        to: '/admin/quests',
        icon: (
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
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14,2 14,8 20,8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10,9 9,9 8,9" />
            </svg>
        ),
    },
    {
        label: 'Messages',
        to: '/admin/messages',
        icon: (
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
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
        ),
    },
    {
        label: 'Settings',
        to: '/admin/settings',
        icon: (
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
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
        ),
    },
];

const LogoutIcon = () => (
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
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16,17 21,12 16,7" />
        <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
);

const HamburgerIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
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
);

type AdminSidebarProps = {
    email?: string;
    className?: string;
};

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
    const navigate = useNavigate();

    async function handleLogout() {
        await supabase.auth.signOut();
        navigate({ to: '/admin/login' });
    }

    return (
        <>
            <nav className="flex flex-col gap-1 p-3 flex-1">
                {links.map((link) => (
                    <Link
                        key={link.to}
                        to={link.to}
                        onClick={onNavigate}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-text-secondary transition-colors hover:bg-accent/10 hover:text-text-primary"
                        activeProps={{
                            className: 'bg-accent/15 text-accent! font-medium',
                        }}
                        activeOptions={{ exact: link.to === '/admin/' }}
                    >
                        {link.icon}
                        {link.label}
                    </Link>
                ))}
            </nav>
            <div className="p-3 border-t border-accent/20">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm text-text-secondary transition-colors hover:bg-danger/10 hover:text-danger-lighter"
                >
                    <LogoutIcon />
                    Logout
                </button>
            </div>
        </>
    );
}

export function AdminSidebar({ email, className }: AdminSidebarProps) {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* ── Desktop sidebar ── */}
            <aside
                className={cn(
                    'hidden lg:flex flex-col w-56 shrink-0 min-h-screen',
                    'bg-background-panel border-r border-accent/20',
                    className,
                )}
            >
                <div className="px-5 py-5 border-b border-accent/20">
                    <p className="font-headings text-sm text-text-primary">
                        Admin
                    </p>
                    <p className="text-xs text-text-secondary truncate mt-0.5">
                        {email}
                    </p>
                </div>
                <NavLinks />
            </aside>

            {/* ── Mobile top bar ── */}
            <header className="lg:hidden fixed top-0 inset-x-0 z-40 flex items-center justify-between px-4 h-14 bg-background-panel border-b border-accent/20">
                <p className="font-headings text-sm text-text-primary">Admin</p>
                <button
                    onClick={() => setOpen(true)}
                    aria-label="Open menu"
                    className="p-2 rounded opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-accent transition-opacity"
                >
                    <HamburgerIcon />
                </button>
            </header>

            {/* ── Mobile drawer ── */}
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent>
                    <SheetTitle className="sr-only">Navigation</SheetTitle>
                    <div className="px-2 py-1 mb-2">
                        <p className="font-headings text-sm text-text-primary">
                            Admin
                        </p>
                        <p className="text-xs text-text-secondary truncate mt-0.5">
                            {email}
                        </p>
                    </div>
                    <NavLinks onNavigate={() => setOpen(false)} />
                </SheetContent>
            </Sheet>
        </>
    );
}

AdminSidebar.displayName = 'AdminSidebar';
