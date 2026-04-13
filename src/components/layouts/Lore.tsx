import { Card, CardContent, CardTitle, SectionHeader } from '@/components/ui';
import { useLore } from '@/lib/react-query/useLore';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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
                            <Markdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    p: ({ children }) => (
                                        <p className="mb-2 last:mb-0">
                                            {children}
                                        </p>
                                    ),
                                    ul: ({ children }) => (
                                        <ul className="list-disc list-inside space-y-1 my-2">
                                            {children}
                                        </ul>
                                    ),
                                    ol: ({ children }) => (
                                        <ol className="list-decimal list-inside space-y-1 my-2">
                                            {children}
                                        </ol>
                                    ),
                                    blockquote: ({ children }) => (
                                        <blockquote className="border-l-2 border-accent pl-3 italic text-text-secondary my-2">
                                            {children}
                                        </blockquote>
                                    ),
                                    strong: ({ children }) => (
                                        <strong className="font-bold text-secondary">
                                            {children}
                                        </strong>
                                    ),
                                    em: ({ children }) => (
                                        <em className="italic text-text-secondary">
                                            {children}
                                        </em>
                                    ),
                                }}
                            >
                                {section.content}
                            </Markdown>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

Lore.displayName = 'Lore';
