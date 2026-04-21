import { Button, ConfirmDialog } from '@/components/ui';
import {
    useCreateQuestImage,
    useDeleteQuestImage,
    useQuestImages,
    useSetPrimaryQuestImage,
} from '@/lib/react-query';
import type { Quest } from '@/lib/react-query/useQuests';
import { uploadQuestImage } from '@/lib/supabase/questImageUpload';
import { useRef, useState } from 'react';

interface QuestGallerySectionProps {
    quest: Quest;
}

export function QuestGallerySection({
    quest,
}: QuestGallerySectionProps): React.ReactNode {
    const { data: images = [], isLoading } = useQuestImages(quest.id);
    const createImageMutation = useCreateQuestImage();
    const deleteImageMutation = useDeleteQuestImage();
    const setPrimaryMutation = useSetPrimaryQuestImage();

    const [isUploading, setIsUploading] = useState(false);
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState<{
        imageId: string;
        filePath: string;
    } | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file');
            return;
        }

        // Validate file size (10MB)
        if (file.size > 10485760) {
            alert('File size must be less than 10MB');
            return;
        }

        await handleUpload(file);
        // Reset input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleUpload = async (file: File) => {
        try {
            setIsUploading(true);
            const imageUrl = await uploadQuestImage(file, quest.id);

            await createImageMutation.mutateAsync({
                quest_id: quest.id,
                url: imageUrl,
                label: file.name,
                order: images.length,
            });
        } catch (error) {
            console.error('Failed to upload image:', error);
            alert('Failed to upload image. Please try again.');
        } finally {
            setIsUploading(false);
        }
    };

    const handleDeleteImage = async () => {
        if (!deleteConfirm) return;

        try {
            await deleteImageMutation.mutateAsync({
                questImageId: deleteConfirm.imageId,
                filePath: deleteConfirm.filePath,
            });
            setDeleteConfirm(null);
        } catch (error) {
            console.error('Failed to delete image:', error);
            alert('Failed to delete image. Please try again.');
        }
    };

    const handleSetPrimary = async (imageUrl: string) => {
        try {
            await setPrimaryMutation.mutateAsync({
                questId: quest.id,
                imageUrl,
            });
        } catch (error) {
            console.error('Failed to set primary image:', error);
            alert('Failed to set primary image. Please try again.');
        }
    };

    return (
        <div className="border border-accent/20 rounded-lg p-6 space-y-4">
            {/* Header */}
            <div className="flex justify-between items-center gap-4">
                <h3 className="text-lg font-semibold">{quest.title}</h3>
                <Button
                    size="sm"
                    variant="primary"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                >
                    {isUploading ? 'Uploading...' : '+ Add Image'}
                </Button>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    disabled={isUploading}
                />
            </div>

            {/* Images Grid */}
            {isLoading ? (
                <div className="py-6 text-center text-text-secondary">
                    Loading images...
                </div>
            ) : images.length === 0 ? (
                <div className="py-6 text-center text-text-secondary">
                    No images yet. Click "Add Image" to upload one.
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {images.map((image) => {
                        const isFilePathFormat =
                            image.url.includes('quest-images') &&
                            image.url.includes(quest.id);
                        const filePath = isFilePathFormat
                            ? image.url
                                  .split('/')
                                  .slice(image.url.split('/').indexOf(quest.id))
                                  .join('/')
                            : `${quest.id}/${image.url.split('/').pop()}`;

                        return (
                            <div
                                key={image.id}
                                className="relative group aspect-square rounded-lg overflow-hidden bg-accent/10"
                            >
                                <img
                                    src={image.url}
                                    alt={image.label}
                                    className="w-full h-full object-cover"
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    {/* Delete Button */}
                                    <button
                                        onClick={() => {
                                            setDeleteConfirm({
                                                imageId: image.id,
                                                filePath,
                                            });
                                            setDeleteConfirmOpen(true);
                                        }}
                                        disabled={deleteImageMutation.isPending}
                                        className="p-2 bg-red-600 hover:bg-red-700 rounded text-white disabled:opacity-50"
                                        title="Delete image"
                                    >
                                        ✕
                                    </button>

                                    {/* Set Primary Button */}
                                    <button
                                        onClick={() =>
                                            handleSetPrimary(image.url)
                                        }
                                        disabled={setPrimaryMutation.isPending}
                                        className={`p-2 rounded text-lg disabled:opacity-50 ${
                                            quest.image_url === image.url
                                                ? 'bg-yellow-500 hover:bg-yellow-600'
                                                : 'bg-gray-600 hover:bg-gray-700'
                                        }`}
                                        title="Set as primary image"
                                    >
                                        {quest.image_url === image.url
                                            ? '★'
                                            : '☆'}
                                    </button>
                                </div>

                                {/* Primary Badge */}
                                {quest.image_url === image.url && (
                                    <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-semibold">
                                        Primary
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Delete Confirmation Dialog */}
            <ConfirmDialog
                open={deleteConfirmOpen}
                onOpenChange={(open) => {
                    setDeleteConfirmOpen(open);
                    if (!open) setDeleteConfirm(null);
                }}
                title="Delete Image"
                description="Are you sure you want to delete this image? This action cannot be undone."
                onConfirm={handleDeleteImage}
                variant="destructive"
            />
        </div>
    );
}

QuestGallerySection.displayName = 'QuestGallerySection';
