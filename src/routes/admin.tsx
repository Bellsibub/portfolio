import { AdminSidebar } from '@/components/layouts';
import supabase from '@/lib/supabase/client';
import { useAuth } from '@/lib/supabase/useAuth';
import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/admin')({
    beforeLoad: async ({ location }) => {
        if (location.pathname === '/admin/login') return;

        const {
            data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
            throw redirect({ to: '/admin/login' });
        }
    },
    component: AdminLayout,
});

function AdminLayout() {
    const { session } = useAuth();

    return (
        <div className="flex min-h-screen bg-background-primary">
            <AdminSidebar email={session?.user.email} />
            <main className="flex-1 p-6 overflow-auto pt-20 lg:pt-6">
                <Outlet />
            </main>
        </div>
    );
}
