import {
    Button,
    Dialog,
    DialogClose,
    DialogContent,
    DialogTitle,
    DialogTrigger,
    Input,
    Label,
    MarkdownEditor,
} from '@/components/ui';
import {
    useCreateLoreSection,
    useUpdateLoreSection,
} from '@/lib/react-query/useLoreMutations';
import type { Tables } from '@/lib/supabase/types';
import type { FormDialogProps } from '@/lib/types';
import { useState } from 'react';

type LoreSection = Tables<'lore_sections'>;

export function LoreForm({
    data: loreSection,
    trigger,
}: FormDialogProps<LoreSection>) {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState(loreSection?.title ?? '');
    const [content, setContent] = useState(loreSection?.content ?? '');

    const createMutation = useCreateLoreSection();
    const updateMutation = useUpdateLoreSection();

    const isEditing = !!loreSection;
    const isLoading = createMutation.isPending || updateMutation.isPending;

    const handleOpenChange = (newOpen: boolean) => {
        if (newOpen) {
            setTitle(loreSection?.title ?? '');
            setContent(loreSection?.content ?? '');
        }
        setOpen(newOpen);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim() || !content.trim()) return;

        try {
            if (isEditing && loreSection) {
                await updateMutation.mutateAsync({
                    id: loreSection.id,
                    data: { title: title.trim(), content: content.trim() },
                });
            } else {
                await createMutation.mutateAsync({
                    title: title.trim(),
                    content: content.trim(),
                });
            }
            setOpen(false);
        } catch (error) {
            console.error('Failed to save lore section:', error);
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent>
                <DialogTitle>
                    {isEditing ? 'Edit Lore Section' : 'Create Lore Section'}
                </DialogTitle>
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div>
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter lore section title"
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="content">Content</Label>
                        <MarkdownEditor
                            value={content}
                            onChange={setContent}
                            placeholder="Enter lore content in markdown format"
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
                                  ? 'Update'
                                  : 'Create'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
