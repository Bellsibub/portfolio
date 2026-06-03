import {
    Button,
    Dialog,
    DialogClose,
    DialogContent,
    DialogTitle,
    DialogTrigger,
    IconSelect,
    Input,
    Label,
    Select,
    Switch,
    Textarea,
} from '@/components/ui';
import { SKILL_ICONS } from '@/lib/icons/iconData';
import { getIconComponent } from '@/lib/icons/reactIcons';
import type { Skill } from '@/lib/react-query/useQuests';
import {
    useCreateSkill,
    useUpdateSkill,
} from '@/lib/react-query/useSkillMutations';
import type { Enums, TablesInsert } from '@/lib/supabase/types';
import type { FormDialogProps } from '@/lib/types';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { useCallback } from 'react';

const SKILL_CATEGORIES: { label: string; value: Enums<'skill-category'> }[] = [
    { label: 'Language', value: 'language' },
    { label: 'Framework', value: 'framework' },
    { label: 'Tool', value: 'tool' },
    { label: 'Styling', value: 'styling' },
    { label: 'Runtime', value: 'runtime' },
    { label: 'Skill', value: 'skill' },
];

function generateSlug(name: string): string {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single
        .trim();
}

const MAX_EQUIPPED = 6;

type SkillFormProps = FormDialogProps<Skill> & {
    equippedCount?: number;
};

type SkillPayload = TablesInsert<'skills'>;

export function SkillForm({
    data: skill,
    trigger,
    equippedCount = 0,
}: SkillFormProps) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState(skill?.name ?? '');
    const [slug, setSlug] = useState(skill?.slug ?? '');
    const [category, setCategory] = useState<Enums<'skill-category'>>(
        skill?.category ?? 'language',
    );
    const [description, setDescription] = useState(skill?.description ?? '');
    const [iconName, setIconName] = useState(skill?.icon_name ?? '');
    const [highlights, setHighlights] = useState<string[]>(
        skill?.highlights ?? [],
    );
    const [newHighlight, setNewHighlight] = useState('');
    const [equipped, setEquipped] = useState<boolean>(skill?.equipped ?? false);

    const createMutation = useCreateSkill();
    const updateMutation = useUpdateSkill();

    const isEditing = Boolean(skill);
    const isLoading = createMutation.isPending || updateMutation.isPending;

    const handleOpenChange = (newOpen: boolean) => {
        if (newOpen) {
            setName(skill?.name ?? '');
            setSlug(skill?.slug ?? '');
            setCategory(
                (skill?.category as Enums<'skill-category'>) ?? 'language',
            );
            setDescription(skill?.description ?? '');
            setIconName(skill?.icon_name ?? '');
            setHighlights(skill?.highlights ?? []);
            setNewHighlight('');
            setEquipped(skill?.equipped ?? false);
        }
        setOpen(newOpen);
    };

    const handleAddHighlight = useCallback(() => {
        const trimmed = newHighlight.trim();
        if (trimmed && !highlights.includes(trimmed)) {
            setHighlights((prev) => [...prev, trimmed]);
            setNewHighlight('');
        }
    }, [newHighlight, highlights]);

    const handleRemoveHighlight = useCallback((index: number) => {
        setHighlights((prev) => prev.filter((_, i) => i !== index));
    }, []);

    const handleHighlightKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddHighlight();
        }
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
            highlights: highlights.length > 0 ? highlights : null,
            equipped,
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
                            onChange={(event) => {
                                const value = event.target.value;
                                setName(value);
                                setSlug(generateSlug(value));
                            }}
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
                            placeholder="auto-generated-slug"
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="skill-category">Category</Label>
                        <Select
                            id="skill-category"
                            value={category}
                            onChange={(event) =>
                                setCategory(
                                    event.target
                                        .value as Enums<'skill-category'>,
                                )
                            }
                            required
                        >
                            {SKILL_CATEGORIES.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="skill-icon">Icon</Label>
                        <IconSelect
                            options={SKILL_ICONS}
                            value={iconName || null}
                            onChange={(value) => setIconName(value || '')}
                            placeholder="Select an icon"
                            renderIcon={(iconName, className) => {
                                const Icon = getIconComponent(iconName);
                                return Icon ? (
                                    <Icon className={className} />
                                ) : (
                                    <span className={className} />
                                );
                            }}
                        />
                        {iconName && (
                            <div className="mt-2 flex items-center gap-2 text-accent">
                                <span className="text-sm">Preview:</span>
                                {(() => {
                                    const IconPreview =
                                        getIconComponent(iconName);
                                    return IconPreview ? (
                                        <IconPreview className="w-6 h-6" />
                                    ) : (
                                        <span className="text-sm text-muted">
                                            Invalid icon
                                        </span>
                                    );
                                })()}
                            </div>
                        )}
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-0.5">
                            <Label htmlFor="skill-equipped">Equipped</Label>
                            {!equipped && equippedCount >= MAX_EQUIPPED && (
                                <span className="text-xs text-text-secondary">
                                    Max {MAX_EQUIPPED} skills can be equipped
                                </span>
                            )}
                        </div>
                        <Switch
                            id="skill-equipped"
                            checked={equipped}
                            onCheckedChange={setEquipped}
                            disabled={
                                !equipped && equippedCount >= MAX_EQUIPPED
                            }
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
                    <div>
                        <Label htmlFor="skill-highlights">Highlights</Label>
                        <div className="flex gap-2 mt-2">
                            <Input
                                id="skill-highlights"
                                value={newHighlight}
                                onChange={(event) =>
                                    setNewHighlight(event.target.value)
                                }
                                onKeyDown={handleHighlightKeyDown}
                                placeholder="Add a highlight (e.g., '3+ years experience')"
                            />
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={handleAddHighlight}
                                disabled={!newHighlight.trim()}
                            >
                                Add
                            </Button>
                        </div>
                        {highlights.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-3">
                                {highlights.map((highlight, index) => (
                                    <div
                                        key={`${highlight}-${index}`}
                                        className="flex items-center gap-1 bg-accent/10 text-accent px-3 py-1 rounded-full text-sm"
                                    >
                                        <span>{highlight}</span>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleRemoveHighlight(index)
                                            }
                                            className="text-accent hover:text-destructive transition-colors ml-1"
                                            aria-label={`Remove ${highlight}`}
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
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
