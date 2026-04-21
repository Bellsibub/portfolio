import { Badge, Button, Card, CardContent, CardTitle } from '@/components/ui';
import type { Skill } from '@/lib/react-query/useQuests';
import { cn } from '@/lib/utils';

import { SkillForm } from './SkillForm';

type SkillTreeProps = {
    skills: Skill[];
    onDelete: (skill: Skill) => void;
};

type SkillNode = Skill & {
    children: SkillNode[];
};

function buildSkillTree(skills: Skill[]): SkillNode[] {
    const nodes = skills.map((skill) => ({
        ...skill,
        children: [] as SkillNode[],
    }));
    const nodeMap = new Map<string, SkillNode>(
        nodes.map((node) => [node.id, node]),
    );

    const roots: SkillNode[] = [];

    for (const node of nodes) {
        if (node.parent_id && nodeMap.has(node.parent_id)) {
            nodeMap.get(node.parent_id)?.children.push(node);
        } else {
            roots.push(node);
        }
    }

    const sortNodes = (items: SkillNode[]) => {
        items.sort((a, b) => a.name.localeCompare(b.name));
        items.forEach((item) => sortNodes(item.children));
    };

    sortNodes(roots);
    return roots;
}

function renderNode(
    node: SkillNode,
    skills: Skill[],
    onDelete: (skill: Skill) => void,
    depth = 0,
) {
    return (
        <div key={node.id} className="space-y-4">
            <Card
                className={cn(
                    'p-4',
                    depth > 0 && 'ml-6 border-accent/40 bg-background-panel/80',
                )}
            >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="space-y-2">
                        <CardTitle>{node.name}</CardTitle>
                        <div className="flex flex-wrap gap-2 text-sm text-text-secondary"></div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <SkillForm
                            skills={skills}
                            data={node}
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
                            onClick={() => onDelete(node)}
                        >
                            Delete
                        </Button>
                        <SkillForm
                            skills={skills}
                            defaultParentId={node.id}
                            trigger={
                                <Button variant="ghost" size="sm">
                                    Add child
                                </Button>
                            }
                        />
                    </div>
                </div>
                {node.description ? (
                    <CardContent>
                        <p className="text-sm text-text-secondary">
                            {node.description}
                        </p>
                    </CardContent>
                ) : null}
                <div className="mt-3 flex flex-wrap gap-2">
                    <Badge variant="outline">{node.category}</Badge>
                </div>
            </Card>
            {node.children.length > 0 ? (
                <div className="space-y-4">
                    {node.children.map((child) =>
                        renderNode(child, skills, onDelete, depth + 1),
                    )}
                </div>
            ) : null}
        </div>
    );
}

export function SkillTree({ skills, onDelete }: SkillTreeProps) {
    const tree = buildSkillTree(skills);

    if (tree.length === 0) {
        return (
            <div className="rounded-3xl border border-dashed border-accent/30 bg-background-panel p-8 text-center text-text-secondary">
                No skills yet. Use the button above to create your first skill.
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {tree.map((node) => renderNode(node, skills, onDelete))}
        </div>
    );
}
