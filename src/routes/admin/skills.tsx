import { SkillForm } from '@/components/features/SkillForm';
import { SkillTree } from '@/components/features/SkillTree';
import { PageWrapper } from '@/components/layouts';
import { Button } from '@/components/ui';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { useDeleteSkill, useSkills } from '@/lib/react-query';
import type { Skill } from '@/lib/react-query/useQuests';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/admin/skills')({
    component: RouteComponent,
});

function RouteComponent() {
    const { data: skills = [], isLoading } = useSkills();
    const deleteMutation = useDeleteSkill();
    const [deleteTarget, setDeleteTarget] = useState<Skill | null>(null);

    if (isLoading) {
        return <div className="p-6">Loading skills...</div>;
    }

    const handleDelete = async () => {
        if (!deleteTarget) return;

        try {
            await deleteMutation.mutateAsync(deleteTarget.id);
            setDeleteTarget(null);
        } catch (error) {
            console.error('Failed to delete skill:', error);
        }
    };

    return (
        <PageWrapper>
            <div className="max-w-5xl mx-auto space-y-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-semibold">Skills</h1>
                        <p className="mt-2 text-sm text-text-secondary">
                            Create, edit, and organize skills into a
                            parent/child tree.
                        </p>
                    </div>
                    <SkillForm
                        skills={skills}
                        trigger={<Button variant="primary">Add Skill</Button>}
                    />
                </div>
                <SkillTree skills={skills} onDelete={setDeleteTarget} />
            </div>
            <ConfirmDialog
                open={!!deleteTarget}
                onOpenChange={(open) => !open && setDeleteTarget(null)}
                title="Delete Skill"
                description={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
                onConfirm={handleDelete}
                confirmText="Delete"
                variant="destructive"
            />
        </PageWrapper>
    );
}
