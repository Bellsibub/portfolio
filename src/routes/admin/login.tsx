import { Button, Card, CardTitle, Input } from '@/components/ui';
import supabase from '@/lib/supabase/client';
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/admin/login')({
    beforeLoad: async () => {
        const {
            data: { session },
        } = await supabase.auth.getSession();

        if (session) {
            throw redirect({ to: '/admin/' });
        }
    },
    component: LoginPage,
});

function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
            return;
        }

        navigate({ to: '/admin/' });
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-background-primary px-4">
            <Card className="w-full max-w-sm">
                <CardTitle>Admin Login</CardTitle>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4 mt-2"
                >
                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor="email"
                            className="text-sm text-text-secondary"
                        >
                            Email
                        </label>
                        <Input
                            id="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="admin@example.com"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor="password"
                            className="text-sm text-text-secondary"
                        >
                            Password
                        </label>
                        <Input
                            id="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                        />
                    </div>
                    {error && (
                        <p className="text-sm text-danger-lighter">{error}</p>
                    )}
                    <Button type="submit" disabled={loading} className="mt-1">
                        {loading ? 'Signing in…' : 'Sign in'}
                    </Button>
                </form>
            </Card>
        </div>
    );
}
