import { Badge, Button, Card, CardContent, CardTitle } from '@/components/ui';
import type { Skill } from '@/lib/react-query/useQuests';
import { cn } from '@/lib/utils';

import { SkillForm } from './SkillForm';

type SkillTreeProps = {
    skills: Skill[];
    onDelete: (skill: Skill) => void;
};

function renderNode(
    skill: Skill,
    onDelete: (skill: Skill) => void,
    equippedCount: number,
) {
    return (
        <div key={skill.id} className="space-y-4 h-full">
            <Card className={cn('p-4 h-full')}>
                <div className="flex flex-row gap-4 justify-between">
                    <div className="space-y-2">
                        <CardTitle>{skill.name}</CardTitle>
                        <div className="flex flex-wrap gap-2 text-sm text-text-secondary">
                            {skill.equipped && (
                                <Badge variant="default">Equipped</Badge>
                            )}
                        </div>
                    </div>
                    <div className="flex gap-2 justify-end">
                        <SkillForm
                            data={skill}
                            equippedCount={equippedCount}
                            trigger={
                                <Button variant="outline" size="sm">
                                    Edit
                                </Button>
                            }
                        />
                        <Button
                            variant="outline"
                            size="sm"
                            className="border-danger-primary text-danger-lighter"
                            onClick={() => onDelete(skill)}
                        >
                            Delete
                        </Button>
                    </div>
                </div>
                {skill.description ? (
                    <CardContent>
                        <p className="text-sm text-text-secondary">
                            {skill.description}
                        </p>
                    </CardContent>
                ) : null}
                <div className="mt-3 flex flex-wrap gap-2">
                    <Badge variant="outline">{skill.category}</Badge>
                </div>
            </Card>
        </div>
    );
}

export function SkillTree({ skills, onDelete }: SkillTreeProps) {
    if (skills.length === 0) {
        return (
            <div className="rounded-3xl border border-dashed border-accent/30 bg-background-panel p-8 text-center text-text-secondary">
                No skills yet. Use the button above to create your first skill.
            </div>
        );
    }

    const equippedCount = skills.filter((s) => s.equipped).length;

    return (
        <div className="grid grid-cols-2 auto-rows-fr gap-4 items-stretch">
            {skills.map((skill) => renderNode(skill, onDelete, equippedCount))}
        </div>
    );
}
