import {
    Button,
    Dialog,
    DialogClose,
    DialogContent,
    DialogTitle,
    DialogTrigger,
    Input,
    Label,
    Select,
    Textarea,
} from '@/components/ui';
import type { Skill } from '@/lib/react-query/useQuests';
import {
    useCreateSkill,
    useUpdateSkill,
} from '@/lib/react-query/useSkillMutations';
import type { TablesInsert } from '@/lib/supabase/types';
import type { FormDialogProps } from '@/lib/types';
import { useState } from 'react';
import type { FormEvent } from 'react';

const skillCategories = [
    { label: 'Language', value: 'language' },
    { label: 'Framework', value: 'framework' },
    { label: 'Library', value: 'library' },
    { label: 'Tool', value: 'tool' },
    { label: 'Styling', value: 'styling' },
    { label: 'Runtime', value: 'runtime' },
];

type SkillFormProps = FormDialogProps<Skill> & {
    skills: Skill[];
    defaultParentId?: string;
};

type SkillPayload = TablesInsert<'skills'>;

export function SkillForm({
    data: skill,
    trigger,
    skills,
    defaultParentId,
}: SkillFormProps) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState(skill?.name ?? '');
    const [slug, setSlug] = useState(skill?.slug ?? '');
    const [category, setCategory] = useState(skill?.category ?? 'language');
    const [description, setDescription] = useState(skill?.description ?? '');
    const [iconName, setIconName] = useState(skill?.icon_name ?? '');
    const [parentId, setParentId] = useState(
        skill?.parent_id ?? defaultParentId ?? '',
    );

    const createMutation = useCreateSkill();
    const updateMutation = useUpdateSkill();

    const isEditing = Boolean(skill);
    const isLoading = createMutation.isPending || updateMutation.isPending;

    const handleOpenChange = (newOpen: boolean) => {
        if (newOpen) {
            setName(skill?.name ?? '');
            setSlug(skill?.slug ?? '');
            setCategory(skill?.category ?? 'language');
            setDescription(skill?.description ?? '');
            setIconName(skill?.icon_name ?? '');
            setParentId(skill?.parent_id ?? defaultParentId ?? '');
        }
        setOpen(newOpen);
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        if (!name.trim() || !slug.trim() || !category.trim()) return;

        const payload: SkillPayload = {
            name: name.trim(),
            slug: slug.trim(),
            category,
            description: description.trim() || null,
            icon_name: iconName.trim() || null,
            parent_id: parentId || null,
        };

        try {
            if (isEditing && skill) {
                await updateMutation.mutateAsync({
                    id: skill.id,
                    data: payload,
                });
            } else {
                await createMutation.mutateAsync(payload);
            }
            setOpen(false);
        } catch (error) {
            console.error('Failed to save skill:', error);
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent>
                <DialogTitle>
                    {isEditing ? 'Edit Skill' : 'Create Skill'}
                </DialogTitle>
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div>
                        <Label htmlFor="skill-name">Name</Label>
                        <Input
                            id="skill-name"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            placeholder="Enter skill name"
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="skill-slug">Slug</Label>
                        <Input
                            id="skill-slug"
                            value={slug}
                            onChange={(event) => setSlug(event.target.value)}
                            placeholder="Enter URL slug"
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="skill-category">Category</Label>
                        <Select
                            id="skill-category"
                            value={category}
                            onChange={(event) =>
                                setCategory(event.target.value)
                            }
                            required
                        >
                            {skillCategories.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="skill-parent">Parent Skill</Label>
                        <Select
                            id="skill-parent"
                            value={parentId ?? ''}
                            onChange={(event) =>
                                setParentId(event.target.value)
                            }
                        >
                            <option value="">No parent</option>
                            {skills
                                .filter((item) => item.id !== skill?.id)
                                .map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="skill-icon">Icon Name</Label>
                        <Input
                            id="skill-icon"
                            value={iconName ?? ''}
                            onChange={(event) =>
                                setIconName(event.target.value)
                            }
                            placeholder="Enter icon name"
                        />
                    </div>
                    <div>
                        <Label htmlFor="skill-description">Description</Label>
                        <Textarea
                            id="skill-description"
                            value={description ?? ''}
                            onChange={(event) =>
                                setDescription(event.target.value)
                            }
                            placeholder="Enter skill description"
                            rows={4}
                        />
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
                                  ? 'Update Skill'
                                  : 'Create Skill'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
