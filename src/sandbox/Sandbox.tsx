import { Button, Separator, ToastProvider } from '@/components/ui';
import { BadgeStory } from '@/sandbox/stories/BadgeStory';
import { CardStory } from '@/sandbox/stories/CardStory';
import { InventoryItemStory } from '@/sandbox/stories/InventoryItemStory';
import { QuestCardStory } from '@/sandbox/stories/QuestCardStory';
import { SectionHeaderStory } from '@/sandbox/stories/SectionHeaderStory';
import { SeparatorStory } from '@/sandbox/stories/SeparatorStory';
import { StatsStory } from '@/sandbox/stories/StatsStory';
import { useState } from 'react';

import { ButtonStory } from './stories/ButtonStory';
import { DialogStory } from './stories/DialogStory';
import { DropdownMenuStory } from './stories/DropdownMenuStory';
import { InputStory } from './stories/InputStory';
import { QueryStory } from './stories/QueryStory';
import { TextareaStory } from './stories/TextareaStory';
import { ToastStory } from './stories/ToastStory';
import { TooltipStory } from './stories/TooltipStory';

const STORIES = {
    ui: [
        { name: 'Button', component: ButtonStory },
        { name: 'Input', component: InputStory },
        { name: 'Textarea', component: TextareaStory },
        { name: 'Dialog', component: DialogStory },
        { name: 'Tooltip', component: TooltipStory },
        { name: 'DropdownMenu', component: DropdownMenuStory },
        { name: 'Toast', component: ToastStory },
        { name: 'Query', component: QueryStory },
        { name: 'Card', component: CardStory },
        { name: 'Separator', component: SeparatorStory },
        {
            name: 'SectionHeader',
            component: SectionHeaderStory,
        },
        { name: 'Badge', component: BadgeStory },
    ],
    features: [
        { name: 'Stats', component: StatsStory },
        {
            name: 'InventoryItem',
            component: InventoryItemStory,
        },
        {
            name: 'QuestCard',
            component: QuestCardStory,
        },
    ],
} as const;

type StoryName = (typeof STORIES)[keyof typeof STORIES][number]['name'];

function ActiveStory({ active }: { active: StoryName }) {
    const story = [...STORIES.ui, ...STORIES.features].find(
        (s) => s.name === active,
    );
    if (!story) return <p>Story not found</p>;
    const Component = story.component;
    return <Component />;
}

export function Sandbox() {
    const [active, setActive] = useState<StoryName>('Button');

    return (
        <ToastProvider>
            <div className="flex min-h-screen">
                {/* Sidebar */}
                <aside className="w-52 shrink-0 border-r border-accent/20 bg-background-panel">
                    <div className="sticky top-0 p-4 space-y-2">
                        <div className="space-y-2">
                            <p className="caption px-3 uppercase tracking-widest">
                                UI Components
                            </p>
                            <Separator />
                            <div>
                                {STORIES.ui.map(({ name }) => (
                                    <Button
                                        key={name}
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setActive(name)}
                                        className={[
                                            'w-full flex-1 justify-start',
                                            active === name
                                                ? 'bg-accent/20 text-accent'
                                                : 'text-text-secondary hover:text-text-primary hover:bg-accent/10',
                                        ].join(' ')}
                                    >
                                        {name}
                                    </Button>
                                ))}
                            </div>
                        </div>
                        <div className="-mx-4 space-y-1">
                            <Separator variant={'accent'} />
                            <Separator variant={'accent'} />
                        </div>
                        <div className="pt-5 space-y-2">
                            <p className="caption px-3 uppercase tracking-widest">
                                feature components
                            </p>
                            <Separator />
                            <div>
                                {STORIES.features.map(({ name }) => (
                                    <Button
                                        key={name}
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setActive(name)}
                                        className={[
                                            'w-full flex-1 justify-start',
                                            active === name
                                                ? 'bg-accent/20 text-accent'
                                                : 'text-text-secondary hover:text-text-primary hover:bg-accent/10',
                                        ].join(' ')}
                                    >
                                        {name}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Content */}
                <main className="flex-1 p-10 space-y-2">
                    <h2 className="mb-8">{active}</h2>
                    <ActiveStory active={active} />
                </main>
            </div>
        </ToastProvider>
    );
}
