import {
    Button,
    Checkbox,
    Dialog,
    DialogClose,
    DialogContent,
    DialogTitle,
    DialogTrigger,
    Input,
    Label,
    MarkdownEditor,
    Select,
    Switch,
    Textarea,
} from '@/components/ui';
import {
    useCreateQuest,
    useUpdateQuest,
} from '@/lib/react-query/useQuestMutations';
import { useSkills } from '@/lib/react-query/useSkills';
import supabase from '@/lib/supabase/client';
import type { Tables } from '@/lib/supabase/types';
import type { FormDialogProps } from '@/lib/types';
import { useState } from 'react';

type Quest = Tables<'quests'> & {
    quest_skills?: {
        skill: {
            id: string;
            name: string;
            category: string;
            created_at: string;
            description: string | null;
            icon_name: string | null;
            parent_id: string | null;
            slug: string;
        };
    }[];
};

const LEVELS = ['novice', 'apprentice', 'adept', 'master'] as const;
const DIFFICULTIES = ['easy', 'medium', 'hard', 'legendary'] as const;

function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single
        .trim();
}

function getInitialFormData(quest?: Quest) {
    return {
        title: quest?.title ?? '',
        description: quest?.description ?? '',
        summary: quest?.summary ?? '',
        slug: quest?.slug ?? '',
        level: (quest?.level ?? 'novice') as (typeof LEVELS)[number],
        difficulty: (quest?.difficulty ??
            'easy') as (typeof DIFFICULTIES)[number],
        is_completed: quest?.is_completed ?? false,
        is_featured: quest?.is_featured ?? false,
        demo_link: quest?.demo_link ?? '',
        github_link: quest?.github_link ?? '',
        reflections: quest?.reflections ?? '',
        selectedSkills:
            quest?.quest_skills?.map(
                (qs: { skill: { id: string } }) => qs.skill.id,
            ) ?? [],
    };
}

export function QuestForm({ data, trigger }: FormDialogProps<Quest>) {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState(() => getInitialFormData(data));

    const createMutation = useCreateQuest();
    const updateMutation = useUpdateQuest();
    const { data: skills = [] } = useSkills();

    const isEditing = !!data;
    const isLoading = createMutation.isPending || updateMutation.isPending;

    const handleOpenChange = (next: boolean) => {
        if (next) setFormData(getInitialFormData(data));
        setOpen(next);
    };

    const handleTitleChange = (value: string) => {
        setFormData((prev) => ({
            ...prev,
            title: value,
            slug: generateSlug(value),
        }));
    };

    const handleSkillChange = (skillId: string, checked: boolean) => {
        setFormData((prev) => ({
            ...prev,
            selectedSkills: checked
                ? [...prev.selectedSkills, skillId]
                : prev.selectedSkills.filter((id: string) => id !== skillId),
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title.trim() || !formData.description.trim()) return;

        const { selectedSkills, ...questData } = formData;

        try {
            let quest: Tables<'quests'>;

            if (isEditing && data) {
                quest = await updateMutation.mutateAsync({
                    id: data.id,
                    data: questData,
                });
            } else {
                quest = await createMutation.mutateAsync(questData);
            }

            // Handle quest skills
            if (quest.id) {
                // Delete existing quest skills
                await supabase
                    .from('quest_skills')
                    .delete()
                    .eq('quest_id', quest.id);

                // Insert new quest skills
                if (selectedSkills.length > 0) {
                    const questSkillsData = selectedSkills.map(
                        (skillId: string) => ({
                            quest_id: quest.id,
                            skill_id: skillId,
                        }),
                    );

                    await supabase.from('quest_skills').insert(questSkillsData);
                }
            }

            setOpen(false);
        } catch (error) {
            console.error('Failed to save quest:', error);
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogTitle>
                    {isEditing ? 'Edit Quest' : 'Create Quest'}
                </DialogTitle>
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="title">Title *</Label>
                            <Input
                                id="title"
                                value={formData.title}
                                onChange={(e) =>
                                    handleTitleChange(e.target.value)
                                }
                                placeholder="Enter quest title"
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="slug">Slug</Label>
                            <Input
                                id="slug"
                                value={formData.slug}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        slug: e.target.value,
                                    }))
                                }
                                placeholder="auto-generated-slug"
                            />
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="description">Description *</Label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    description: e.target.value,
                                }))
                            }
                            placeholder="Enter quest description"
                            required
                        />
                    </div>

                    <div>
                        <Label htmlFor="summary">Summary</Label>
                        <Textarea
                            id="summary"
                            value={formData.summary}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    summary: e.target.value,
                                }))
                            }
                            placeholder="Enter quest summary"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="level">Level</Label>
                            <Select
                                id="level"
                                value={formData.level}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        level: e.target
                                            .value as (typeof LEVELS)[number],
                                    }))
                                }
                            >
                                {LEVELS.map((level) => (
                                    <option key={level} value={level}>
                                        {level.charAt(0).toUpperCase() +
                                            level.slice(1)}
                                    </option>
                                ))}
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="difficulty">Difficulty</Label>
                            <Select
                                id="difficulty"
                                value={formData.difficulty}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        difficulty: e.target
                                            .value as (typeof DIFFICULTIES)[number],
                                    }))
                                }
                            >
                                {DIFFICULTIES.map((difficulty) => (
                                    <option key={difficulty} value={difficulty}>
                                        {difficulty.charAt(0).toUpperCase() +
                                            difficulty.slice(1)}
                                    </option>
                                ))}
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="demo_link">Demo Link</Label>
                            <Input
                                id="demo_link"
                                value={formData.demo_link}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        demo_link: e.target.value,
                                    }))
                                }
                                placeholder="https://demo.example.com"
                            />
                        </div>
                        <div>
                            <Label htmlFor="github_link">GitHub Link</Label>
                            <Input
                                id="github_link"
                                value={formData.github_link}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        github_link: e.target.value,
                                    }))
                                }
                                placeholder="https://github.com/user/repo"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <Switch
                                checked={formData.is_completed}
                                onCheckedChange={(checked) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        is_completed: checked,
                                    }))
                                }
                            />
                            <Label>Completed</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <Switch
                                checked={formData.is_featured}
                                onCheckedChange={(checked) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        is_featured: checked,
                                    }))
                                }
                            />
                            <Label>Featured</Label>
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="reflections">Reflections</Label>
                        <MarkdownEditor
                            value={formData.reflections}
                            onChange={(value) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    reflections: value,
                                }))
                            }
                            placeholder="Enter reflections in markdown format"
                        />
                    </div>

                    <div>
                        <Label>Skills</Label>
                        <div className="grid grid-cols-2 gap-2 mt-2 max-h-40 overflow-y-auto">
                            {skills.map((skill) => (
                                <div
                                    key={skill.id}
                                    className="flex items-center gap-2"
                                >
                                    <Checkbox
                                        id={`skill-${skill.id}`}
                                        checked={formData.selectedSkills.includes(
                                            skill.id,
                                        )}
                                        onCheckedChange={(checked) =>
                                            handleSkillChange(skill.id, checked)
                                        }
                                    />
                                    <Label
                                        htmlFor={`skill-${skill.id}`}
                                        className="text-sm cursor-pointer"
                                    >
                                        {skill.name}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <DialogClose asChild>
                            <Button type="button" variant="ghost">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading
                                ? 'Saving...'
                                : isEditing
                                  ? 'Update'
                                  : 'Create'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
