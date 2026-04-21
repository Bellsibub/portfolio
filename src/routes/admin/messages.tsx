import { PageWrapper } from '@/components/layouts';
import {
    Button,
    Card,
    CardContent,
    CardFooter,
    ConfirmDialog,
    SectionHeader,
} from '@/components/ui';
import { useDeleteMessage, useMessages } from '@/lib/react-query/useMessages';
import type { Tables } from '@/lib/supabase/types';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/admin/messages')({
    component: RouteComponent,
});

type Message = Tables<'contact_messages'>;

function MessageItem({
    message,
    onDelete,
}: {
    message: Message;
    onDelete: (msg: Message) => void;
}) {
    const [expanded, setExpanded] = useState(false);

    const date = new Date(message.created_at).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <Card>
            <button
                className="flex justify-between items-start gap-4 text-left w-full"
                onClick={() => setExpanded((prev) => !prev)}
            >
                <div className="flex flex-col gap-1 min-w-0">
                    <span className="font-semibold tracking-wide text-text-primary truncate">
                        {message.subject}
                    </span>
                    <span className="text-sm text-text-secondary">
                        {message.name} &mdash;{' '}
                        <a
                            href={`mailto:${message.email}`}
                            className="hover:underline text-accent"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {message.email}
                        </a>
                    </span>
                </div>
                <span className="text-xs text-text-secondary whitespace-nowrap shrink-0 mt-1">
                    {date}
                </span>
            </button>

            {expanded && (
                <CardContent className="mt-2">
                    <p className="text-sm text-text-primary whitespace-pre-wrap leading-relaxed">
                        {message.message}
                    </p>
                </CardContent>
            )}

            <CardFooter className="border-t pt-4 border-accent/20">
                <Button
                    variant="outline"
                    size="sm"
                    className="border-danger-primary text-danger-lighter"
                    onClick={() => onDelete(message)}
                >
                    Delete
                </Button>
            </CardFooter>
        </Card>
    );
}

function RouteComponent() {
    const { data: messages = [], isLoading } = useMessages();
    const deleteMutation = useDeleteMessage();
    const [deleteTarget, setDeleteTarget] = useState<Message | null>(null);

    const handleDelete = async () => {
        if (!deleteTarget) return;
        try {
            await deleteMutation.mutateAsync(deleteTarget.id);
            setDeleteTarget(null);
        } catch (error) {
            console.error('Failed to delete message:', error);
        }
    };

    if (isLoading) {
        return <div className="p-6">Loading messages...</div>;
    }

    return (
        <PageWrapper>
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center gap-4">
                    <SectionHeader title="Inbox" variant="image" />
                    <span className="text-sm text-text-secondary">
                        {messages.length} message
                        {messages.length !== 1 ? 's' : ''}
                    </span>
                </div>

                <div className="space-y-4">
                    {messages.length === 0 ? (
                        <div className="text-center py-8 text-text-secondary">
                            No messages yet.
                        </div>
                    ) : (
                        messages.map((msg) => (
                            <MessageItem
                                key={msg.id}
                                message={msg}
                                onDelete={setDeleteTarget}
                            />
                        ))
                    )}
                </div>
            </div>

            <ConfirmDialog
                open={!!deleteTarget}
                onOpenChange={(open) => !open && setDeleteTarget(null)}
                title="Delete Message"
                description={`Are you sure you want to delete the message from "${deleteTarget?.name}"? This action cannot be undone.`}
                onConfirm={handleDelete}
                confirmText="Delete"
                variant="destructive"
            />
        </PageWrapper>
    );
}
