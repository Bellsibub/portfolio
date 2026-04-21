import supabase from '@/lib/supabase/client';
import { deleteQuestImage as deleteImageFromStorage } from '@/lib/supabase/questImageUpload';
import type { Tables, TablesInsert } from '@/lib/supabase/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { keys } from './keys';

type QuestImage = Tables<'quest_images'>;
type QuestImageInsert = TablesInsert<'quest_images'>;

async function createQuestImage(data: QuestImageInsert): Promise<QuestImage> {
    const { data: image, error } = await supabase
        .from('quest_images')
        .insert(data)
        .select()
        .single();

    if (error) throw error;
    return image;
}

async function deleteQuestImageRecord(imageId: string): Promise<void> {
    const { error } = await supabase
        .from('quest_images')
        .delete()
        .eq('id', imageId);

    if (error) throw error;
}

async function setPrimaryQuestImage({
    questId,
    imageUrl,
}: {
    questId: string;
    imageUrl: string;
}): Promise<Tables<'quests'>> {
    const { data: quest, error } = await supabase
        .from('quests')
        .update({ image_url: imageUrl })
        .eq('id', questId)
        .select()
        .single();

    if (error) throw error;
    return quest;
}

export function useCreateQuestImage() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createQuestImage,
        onSuccess: (image) => {
            queryClient.invalidateQueries({
                queryKey: keys.questImages.byQuest(image.quest_id),
            });
        },
    });
}

export function useDeleteQuestImage() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            questImageId,
            filePath,
        }: {
            questImageId: string;
            filePath: string;
        }) => {
            // Delete from storage first
            try {
                await deleteImageFromStorage(filePath);
            } catch (storageError) {
                console.error(
                    'Failed to delete image from storage:',
                    storageError,
                );
                // Continue with DB delete even if storage delete fails
            }

            // Delete from database
            await deleteQuestImageRecord(questImageId);
        },
        onSuccess: () => {
            // Invalidate all questImages queries after deletion
            queryClient.invalidateQueries({
                queryKey: keys.questImages.all,
            });
        },
    });
}

export function useSetPrimaryQuestImage() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: setPrimaryQuestImage,
        onSuccess: (quest) => {
            // Invalidate both quests and quest images
            queryClient.invalidateQueries({ queryKey: keys.quests.all });
            queryClient.invalidateQueries({
                queryKey: keys.questImages.byQuest(quest.id),
            });
        },
    });
}
