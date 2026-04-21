import supabase from '@/lib/supabase/client';
import { ensureQuestImageFolder } from '@/lib/supabase/questImageUpload';
import type { Tables, TablesInsert, TablesUpdate } from '@/lib/supabase/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type QuestInsert = TablesInsert<'quests'>;
type QuestUpdate = TablesUpdate<'quests'>;

async function createQuest(data: QuestInsert): Promise<Tables<'quests'>> {
    const { data: quest, error } = await supabase
        .from('quests')
        .insert(data)
        .select()
        .single();

    if (error) throw error;
    return quest;
}

async function updateQuest({
    id,
    data,
}: {
    id: string;
    data: QuestUpdate;
}): Promise<Tables<'quests'>> {
    const { data: quest, error } = await supabase
        .from('quests')
        .update(data)
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;
    return quest;
}

async function deleteQuest(id: string): Promise<void> {
    const { error } = await supabase.from('quests').delete().eq('id', id);
    if (error) throw error;
}

export function useCreateQuest() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createQuest,
        onSuccess: async (newQuest) => {
            try {
                // Create image folder for the new quest
                await ensureQuestImageFolder(newQuest.id);
            } catch (error) {
                console.warn('Failed to create quest image folder:', error);
                // Don't block quest creation if folder setup fails
            }
            queryClient.invalidateQueries({ queryKey: ['quests'] });
        },
    });
}

export function useUpdateQuest() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateQuest,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['quests'] });
        },
    });
}

export function useDeleteQuest() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteQuest,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['quests'] });
        },
    });
}
