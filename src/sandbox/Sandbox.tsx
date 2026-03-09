import { useState } from 'react';
import { ToastProvider } from '@/components/ui';
import { ButtonStory } from './stories/ButtonStory';
import { InputStory } from './stories/InputStory';
import { TextareaStory } from './stories/TextareaStory';
import { DialogStory } from './stories/DialogStory';
import { TooltipStory } from './stories/TooltipStory';
import { DropdownMenuStory } from './stories/DropdownMenuStory';
import { ToastStory } from './stories/ToastStory';
import { QueryStory } from './stories/QueryStory';

const STORIES = [
  { name: 'Button', component: ButtonStory },
  { name: 'Input', component: InputStory },
  { name: 'Textarea', component: TextareaStory },
  { name: 'Dialog', component: DialogStory },
  { name: 'Tooltip', component: TooltipStory },
  { name: 'DropdownMenu', component: DropdownMenuStory },
  { name: 'Toast', component: ToastStory },
  { name: 'Query', component: QueryStory },
] as const;

type StoryName = (typeof STORIES)[number]['name'];

export function Sandbox() {
  const [active, setActive] = useState<StoryName>('Button');
  const ActiveStory = STORIES.find((s) => s.name === active)!.component;

  return (
    <ToastProvider>
      <div className='flex min-h-screen'>
        {/* Sidebar */}
        <aside className='w-52 shrink-0 border-r border-accent-primary/20 bg-background-panel'>
          <div className='sticky top-0 p-4 space-y-1'>
            <p className='caption px-3 pb-3 uppercase tracking-widest'>Components</p>
            {STORIES.map(({ name }) => (
              <button
                key={name}
                onClick={() => setActive(name)}
                className={[
                  'w-full text-left px-3 py-2 rounded text-sm transition-colors cursor-pointer',
                  active === name
                    ? 'bg-accent-primary/20 text-accent-primary'
                    : 'text-text-secondary hover:text-text-primary hover:bg-accent-primary/10',
                ].join(' ')}
              >
                {name}
              </button>
            ))}
          </div>
        </aside>

        {/* Content */}
        <main className='flex-1 p-10 space-y-2'>
          <h2 className='mb-8'>{active}</h2>
          <ActiveStory />
        </main>
      </div>
    </ToastProvider>
  );
}
