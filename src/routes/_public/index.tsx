import { BadgeStory } from '@/sandbox/stories/BadgeStory';
import { ButtonStory } from '@/sandbox/stories/ButtonStory';
import { DialogStory } from '@/sandbox/stories/DialogStory';
import { QuestCardStory } from '@/sandbox/stories/QuestCardStory';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_public/')({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div>
            <ButtonStory id="button" />
            <DialogStory id="dialog" />
            <QuestCardStory id="quest-card" />
            <BadgeStory id="badge" />
        </div>
    );
}
