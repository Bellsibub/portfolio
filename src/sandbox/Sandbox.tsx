import { Button, ToastProvider } from '@/components/ui';
import { CardStory } from '@/sandbox/stories/CardStory';
import { useState } from 'react';

import { ButtonStory } from './stories/ButtonStory';
import { DialogStory } from './stories/DialogStory';
import { DropdownMenuStory } from './stories/DropdownMenuStory';
import { InputStory } from './stories/InputStory';
import { QueryStory } from './stories/QueryStory';
import { TextareaStory } from './stories/TextareaStory';
import { ToastStory } from './stories/ToastStory';
import { TooltipStory } from './stories/TooltipStory';

const STORIES = [
    { name: 'Button', component: ButtonStory },
    { name: 'Input', component: InputStory },
    { name: 'Textarea', component: TextareaStory },
    { name: 'Dialog', component: DialogStory },
    { name: 'Tooltip', component: TooltipStory },
    { name: 'DropdownMenu', component: DropdownMenuStory },
    { name: 'Toast', component: ToastStory },
    { name: 'Query', component: QueryStory },
    { name: 'Card', component: CardStory },
    {
        name: 'SectionHeader',
        component: () => <p>SectionHeader story goes here</p>,
    },
    { name: 'Badge', component: () => <p>Badge story goes here</p> },
    { name: 'StatBar', component: () => <p>StatBar story goes here</p> },
    {
        name: 'InventoryItem',
        component: () => <p>InventoryItem story goes here</p>,
    },
] as const;

type StoryName = (typeof STORIES)[number]['name'];

export function Sandbox() {
    const [active, setActive] = useState<StoryName>('Button');
    const ActiveStory = STORIES.find((s) => s.name === active)!.component;

    return (
        <ToastProvider>
            <div className="flex min-h-screen">
                {/* Sidebar */}
                <aside className="w-52 shrink-0 border-r border-accent/20 bg-background-panel">
                    <div className="sticky top-0 p-4 space-y-1">
                        <p className="caption px-3 pb-3 uppercase tracking-widest">
                            Components
                        </p>
                        {STORIES.map(({ name }) => (
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
                </aside>

                {/* Content */}
                <main className="flex-1 p-10 space-y-2">
                    <h2 className="mb-8">{active}</h2>
                    <ActiveStory />
                </main>
            </div>
        </ToastProvider>
    );
}
