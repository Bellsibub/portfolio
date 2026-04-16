import { LoreContent } from '@/components/features';
import { Card, CardContent, CardTitle, SectionHeader } from '@/components/ui';
import { useLore } from '@/lib/react-query/useLore';

type LoreProps = {} & React.HTMLAttributes<HTMLDivElement>;

export const Lore = ({ ...props }: LoreProps) => {
    const { data: lore, isPending, isError } = useLore();

    if (isPending) return <p className="text-secondary p-2.5">Loading...</p>;
    if (isError || !lore)
        return <p className="text-danger p-2.5">Lore not found.</p>;

    return (
        <div className="flex flex-col gap-10 p-2.5" {...props}>
            <SectionHeader title="Lore" className="uppercase" />
            <div className="flex flex-col gap-5 md:w-md lg:w-xl mx-auto">
                {lore.map((section) => (
                    <Card key={section.id} variant={'accent'}>
                        <CardTitle className="text-2xl">
                            {section.title}
                        </CardTitle>
                        <CardContent>
                            <LoreContent item={section} />
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

Lore.displayName = 'Lore';
