import {
    Button,
    Card,
    CardContent,
    CardFooter,
    CardTitle,
    ConfirmDialog,
    SectionHeader,
} from '@/components/ui';
import type { FormDialogProps } from '@/lib/types';
import type { UseMutationResult } from '@tanstack/react-query';
import React, { useState } from 'react';

interface AdminContentListProps<
    T extends { title: string; id: string },
> extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    dataType: string;
    data: T[];
    FormDialog: React.FC<FormDialogProps<T>>;
    deleteMutation: UseMutationResult<void, Error, string, unknown>;
    ItemContent: React.FC<{ item: T }>;
    ItemBadges?: React.FC<{ item: T }>;
}

export const AdminContentList = <T extends { title: string; id: string }>({
    title,
    dataType,
    FormDialog,
    data,
    deleteMutation,
    ItemContent,
    ItemBadges,
    ...props
}: AdminContentListProps<T>) => {
    const [deleteTarget, setDeleteTarget] = useState<T | null>(null);

    const handleDelete = async () => {
        if (!deleteTarget) return;

        try {
            await deleteMutation.mutateAsync(deleteTarget.id);
            setDeleteTarget(null);
        } catch (error) {
            console.error('Failed to delete quest:', error);
        }
    };

    return (
        <div {...props}>
            {/* HEADER */}
            <div className="flex justify-between items-center gap-4">
                <SectionHeader title={title} variant="image" />
                <FormDialog
                    trigger={<Button variant="primary">Add {title}</Button>}
                />
            </div>
            {/* LIST */}
            <div className="space-y-4">
                {data.length === 0 ? (
                    <div className="text-center py-8 text-text-secondary">
                        No {dataType.toLowerCase()}s found. Create your first
                        one above.
                    </div>
                ) : (
                    data?.map((item, index) => (
                        <Card key={index}>
                            <div className="flex justify-between">
                                <CardTitle className="font-semibold tracking-wider">
                                    {item.title ?? 'Could not find title'}
                                </CardTitle>
                                {ItemBadges && <ItemBadges item={item} />}
                            </div>
                            <CardContent>
                                <ItemContent item={item} />
                            </CardContent>
                            <CardFooter className="border-t pt-4 border-accent/20">
                                <FormDialog
                                    data={item}
                                    trigger={
                                        <Button variant="outline" size="sm">
                                            Edit
                                        </Button>
                                    }
                                />
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="ml-2 border-danger-primary text-danger-lighter"
                                    onClick={() => setDeleteTarget(item)}
                                >
                                    Delete
                                </Button>
                            </CardFooter>
                        </Card>
                    ))
                )}
            </div>

            <ConfirmDialog
                open={!!deleteTarget}
                onOpenChange={(open) => !open && setDeleteTarget(null)}
                title={`Delete ${dataType}`}
                description={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
                onConfirm={handleDelete}
                confirmText="Delete"
                variant="destructive"
            />
        </div>
    );
};

AdminContentList.displayName = 'AdminContentList';
