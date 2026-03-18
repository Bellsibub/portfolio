import { Contact, PageWrapper } from '@/components/layouts';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_public/contact')({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <PageWrapper>
            <Contact />
        </PageWrapper>
    );
}
