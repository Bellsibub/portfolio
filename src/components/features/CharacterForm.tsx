import { Stats } from '@/components/features';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
    Button,
    Card,
    CardContent,
    CardTitle,
    Input,
    Textarea,
} from '@/components/ui';
import { useCharacter } from '@/lib/react-query/useCharacter';
import { useUpdateCharacter } from '@/lib/react-query/useUpdateCharacter';
import React, { useState } from 'react';

type StatItem = { label: string; value: string | number };

type CharacterFormProps = {} & React.HTMLAttributes<HTMLDivElement>;

export const CharacterForm = ({ ...props }: CharacterFormProps) => {
    const { data: character, isPending: isLoadingCharacter } = useCharacter();
    const updateCharacter = useUpdateCharacter();

    const [formData, setFormData] = useState({
        name: '',
        title: '',
        tagline: '',
        stats: [] as StatItem[],
    });

    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [cvFile, setCvFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

    // Initialize form data when character loads
    React.useEffect(() => {
        if (character) {
            setFormData({
                name: character.name || '',
                title: character.title || '',
                tagline: character.tagline || '',
                stats: character.stats || [],
            });
            if (character.avatar_url) {
                setAvatarPreview(character.avatar_url);
            }
        }
    }, [character]);

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setAvatarFile(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setAvatarPreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setCvFile(file);
        }
    };

    const addStat = () => {
        setFormData((prev) => ({
            ...prev,
            stats: [...prev.stats, { label: '', value: '' }],
        }));
    };

    const updateStat = (
        index: number,
        field: 'label' | 'value',
        value: string,
    ) => {
        setFormData((prev) => ({
            ...prev,
            stats: prev.stats.map((stat, i) =>
                i === index ? { ...stat, [field]: value } : stat,
            ),
        }));
    };

    const removeStat = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            stats: prev.stats.filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await updateCharacter.mutateAsync({
                characterId: character?.id || '',
                data: formData,
                avatarFile: avatarFile || undefined,
                cvFile: cvFile || undefined,
            });

            alert('Character updated successfully!');

            // Reset file states
            setAvatarFile(null);
            setCvFile(null);
        } catch (error) {
            console.error('Failed to update character:', error);
            alert('Failed to update character. Please try again.');
        }
    };

    if (isLoadingCharacter) {
        return (
            <p className="text-secondary p-2.5">Loading character data...</p>
        );
    }

    if (!character) {
        return <p className="text-danger p-2.5">Character not found.</p>;
    }

    return (
        <Card {...props}>
            <CardTitle>Edit Character</CardTitle>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Avatar Upload */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Avatar</label>
                        <div className="flex items-center gap-4">
                            <Avatar size="lg">
                                <AvatarImage
                                    src={avatarPreview || undefined}
                                    alt="Avatar preview"
                                />
                                <AvatarFallback>BS</AvatarFallback>
                            </Avatar>
                            <div>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleAvatarChange}
                                    className="w-auto"
                                />
                                <p className="text-xs text-muted-foreground mt-1">
                                    Upload a new avatar image (PNG, JPG, etc.)
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Name */}
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                            Name *
                        </label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    name: e.target.value,
                                }))
                            }
                            required
                        />
                    </div>

                    {/* Title */}
                    <div className="space-y-2">
                        <label htmlFor="title" className="text-sm font-medium">
                            Title *
                        </label>
                        <Input
                            id="title"
                            value={formData.title}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    title: e.target.value,
                                }))
                            }
                            required
                        />
                    </div>

                    {/* Tagline */}
                    <div className="space-y-2">
                        <label
                            htmlFor="tagline"
                            className="text-sm font-medium"
                        >
                            Tagline
                        </label>
                        <Textarea
                            id="tagline"
                            value={formData.tagline}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    tagline: e.target.value,
                                }))
                            }
                            placeholder="Optional tagline..."
                        />
                    </div>

                    {/* CV Upload */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">CV File</label>
                        <Input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleCvChange}
                        />
                        <p className="text-xs text-muted-foreground">
                            Upload a new CV file (PDF, DOC, DOCX)
                        </p>
                        {character.cv_url && (
                            <p className="text-xs text-muted-foreground">
                                Current: {character.cv_url.split('/').pop()}
                            </p>
                        )}
                    </div>

                    {/* Stats */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium">Stats</label>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={addStat}
                            >
                                Add Stat
                            </Button>
                        </div>
                        <div className="space-y-2">
                            {formData.stats.map((stat, index) => (
                                <div
                                    key={index}
                                    className="flex gap-2 items-center"
                                >
                                    <Input
                                        placeholder="Label"
                                        value={stat.label}
                                        onChange={(e) =>
                                            updateStat(
                                                index,
                                                'label',
                                                e.target.value,
                                            )
                                        }
                                        className="flex-1"
                                    />
                                    <Input
                                        placeholder="Value"
                                        value={stat.value}
                                        onChange={(e) =>
                                            updateStat(
                                                index,
                                                'value',
                                                e.target.value,
                                            )
                                        }
                                        className="flex-1"
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => removeStat(index)}
                                    >
                                        Remove
                                    </Button>
                                </div>
                            ))}
                        </div>
                        {formData.stats.length > 0 && (
                            <div className="mt-4 p-4 bg-muted rounded">
                                <p className="text-sm font-medium mb-2">
                                    Preview:
                                </p>
                                <Stats stats={formData.stats} />
                            </div>
                        )}
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex gap-4">
                        <Button
                            type="submit"
                            disabled={updateCharacter.isPending}
                        >
                            {updateCharacter.isPending
                                ? 'Saving...'
                                : 'Save Changes'}
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                // Reset form to original values
                                if (character) {
                                    setFormData({
                                        name: character.name || '',
                                        title: character.title || '',
                                        tagline: character.tagline || '',
                                        stats: character.stats || [],
                                    });
                                    setAvatarFile(null);
                                    setCvFile(null);
                                    setAvatarPreview(
                                        character.avatar_url || null,
                                    );
                                }
                            }}
                        >
                            Reset
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

CharacterForm.displayName = 'CharacterForm';
