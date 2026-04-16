import type { Tables } from '@/lib/supabase/types';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type LoreContentProps = {
    item: Tables<'lore_sections'>;
} & React.HTMLAttributes<HTMLDivElement>;

export const LoreContent = ({ item, ...props }: LoreContentProps) => {
    return (
        <div className="flex flex-col gap-4" {...props}>
            <Markdown
                remarkPlugins={[remarkGfm]}
                components={{
                    p: ({ children }) => (
                        <p className="mb-2 last:mb-0">{children}</p>
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
                {item.content}
            </Markdown>
        </div>
    );
};

LoreContent.displayName = 'LoreContent';
