import { QuestForm } from '@/components/features';
import { AdminContentList, PageWrapper } from '@/components/layouts';
import { Badge } from '@/components/ui';
import { useDeleteQuest, useQuests } from '@/lib/react-query';
import type { Tables } from '@/lib/supabase/types';
import { createFileRoute } from '@tanstack/react-router';

type Quest = Tables<'quests'>;

export const Route = createFileRoute('/admin/quests')({
    component: RouteComponent,
});

function RouteComponent() {
    const { data: quests = [], isLoading } = useQuests();
    const deleteMutation = useDeleteQuest();

    if (isLoading) {
        return <div className="p-6">Loading quests...</div>;
    }

    const QuestContent: React.FC<{ item: Quest }> = ({ item }) => (
        <div className="flex flex-col gap-4">
            <p className="text-text-secondary">
                {item.description || 'No description'}
            </p>

            <div className="flex flex-col gap-2">
                <div className="inline-flex items-center gap-2">
                    <p className="text-accent">Level:</p>
                    <p>{item.level}</p>
                </div>
                <div className="inline-flex items-center gap-2">
                    <p className="text-accent">Difficulty:</p>
                    <p>{item.difficulty}</p>
                </div>
            </div>
        </div>
    );

    const QuestBadges: React.FC<{ item: Quest }> = ({ item }) => (
        <div className="flex items-center gap-2">
            {item.is_featured && <Badge variant="default">Featured</Badge>}
            {item.is_completed && <Badge variant="secondary">Completed</Badge>}
        </div>
    );

    return (
        <PageWrapper>
            <div className="max-w-4xl mx-auto">
                <AdminContentList
                    title="Quests"
                    dataType="Quest"
                    FormDialog={QuestForm}
                    data={quests}
                    deleteMutation={deleteMutation}
                    ItemContent={QuestContent}
                    ItemBadges={QuestBadges}
                />
            </div>
        </PageWrapper>
    );
}
