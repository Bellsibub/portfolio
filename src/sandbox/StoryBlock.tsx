interface StoryBlockProps {
    label: string;
    children: React.ReactNode;
    center?: boolean;
}

export function StoryBlock({
    label,
    children,
    center = false,
}: StoryBlockProps) {
    return (
        <div className="space-y-2">
            <p className="caption">{label}</p>
            <div
                className={[
                    'flex flex-wrap gap-4 rounded p-6 bg-background-primary border border-accent/10',
                    center ? 'items-center justify-center' : 'items-start',
                ].join(' ')}
            >
                {children}
            </div>
        </div>
    );
}

interface StoryGroupProps {
    title: string;
    children: React.ReactNode;
}

export function StoryGroup({ title, children }: StoryGroupProps) {
    return (
        <section className="space-y-6">
            <h3 className="text-text-secondary border-b border-accent/20 pb-2">
                {title}
            </h3>
            {children}
        </section>
    );
}
