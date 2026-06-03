import type { Quest, Skill } from '@/lib/react-query/useQuests';
import { Link } from '@tanstack/react-router';

import { Dialog, DialogContent, DialogDescription, DialogTitle } from '../ui';

type SkillDialogProps = {
    skill: Skill;
    Icon?: React.ComponentType<{ className?: string }> | null;
    linkedQuests?: Quest[];
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export const SkillDialog = ({
    skill,
    Icon,
    linkedQuests,
    open,
    onOpenChange,
}: SkillDialogProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-sm">
                <div className="flex items-center gap-4 mb-2">
                    {Icon && <Icon className="size-12 shrink-0" />}
                    <div className="flex flex-col gap-1">
                        <DialogTitle>{skill.name}</DialogTitle>
                        {skill.category && (
                            <span className="text-xs uppercase tracking-widest text-accent font-medium">
                                {skill.category}
                            </span>
                        )}
                    </div>
                </div>
                {skill.description ? (
                    <DialogDescription>{skill.description}</DialogDescription>
                ) : (
                    <DialogDescription className="sr-only">
                        {skill.name} skill details
                    </DialogDescription>
                )}
                {skill.highlights && skill.highlights.length > 0 && (
                    <ul className="mt-2 space-y-1 list-disc list-inside text-sm text-text-secondary">
                        {skill.highlights.map((h, i) => (
                            <li key={i}>{h}</li>
                        ))}
                    </ul>
                )}
                {linkedQuests && linkedQuests.length > 0 && (
                    <div className="mt-4">
                        <p className="text-sm font-medium mb-2">
                            Used in quests:
                        </p>
                        <ul className="space-y-1">
                            {linkedQuests.map((quest) => (
                                <li key={quest.id}>
                                    <Link
                                        to="/quests/$slug"
                                        params={{ slug: quest.slug }}
                                        className="text-sm text-accent hover:underline"
                                        onClick={() => onOpenChange(false)}
                                    >
                                        {quest.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

SkillDialog.displayName = 'SkillDialog';
