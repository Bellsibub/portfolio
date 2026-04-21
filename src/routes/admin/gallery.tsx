import { QuestGallerySection } from '@/components/features';
import { PageWrapper } from '@/components/layouts';
import { useQuests } from '@/lib/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/gallery')({
    component: RouteComponent,
});

function RouteComponent() {
    const { data: quests = [], isLoading } = useQuests();

    if (isLoading) {
        return (
            <PageWrapper>
                <div className="p-6">Loading quests...</div>
            </PageWrapper>
        );
    }

    return (
        <PageWrapper>
            <div className="max-w-6xl mx-auto space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Quest Gallery Manager
                    </h1>
                    <p className="text-text-secondary mt-2">
                        Manage images for your quests
                    </p>
                </div>

                {quests.length === 0 ? (
                    <div className="text-center py-8 text-text-secondary">
                        No quests found. Create a quest first.
                    </div>
                ) : (
                    <div className="space-y-6">
                        {quests.map((quest) => (
                            <QuestGallerySection key={quest.id} quest={quest} />
                        ))}
                    </div>
                )}
            </div>
        </PageWrapper>
    );
}
