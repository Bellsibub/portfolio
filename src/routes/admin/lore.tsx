import { LoreContent, LoreForm } from '@/components/features';
import { AdminContentList, PageWrapper } from '@/components/layouts';
import { useDeleteLoreSection, useLore } from '@/lib/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/lore')({
    component: RouteComponent,
});

function RouteComponent() {
    const { data: loreSections = [], isLoading } = useLore();
    const deleteMutation = useDeleteLoreSection();

    if (isLoading) {
        return <div className="p-6">Loading lore sections...</div>;
    }

    return (
        <PageWrapper>
            <div className="max-w-4xl mx-auto">
                <AdminContentList
                    title="Lore Sections"
                    dataType="Lore Section"
                    FormDialog={LoreForm}
                    data={loreSections}
                    deleteMutation={deleteMutation}
                    ItemContent={LoreContent}
                />
            </div>
        </PageWrapper>
    );
}
