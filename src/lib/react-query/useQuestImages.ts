import supabase from '@/lib/supabase/client';
import type { Tables } from '@/lib/supabase/types';
import { useQuery } from '@tanstack/react-query';

import { keys } from './keys';

export type QuestImage = Tables<'quest_images'>;

async function fetchQuestImages(questId: string): Promise<QuestImage[]> {
    const { data, error } = await supabase
        .from('quest_images')
        .select('*')
        .eq('quest_id', questId)
        .order('order', { ascending: true });

    if (error) throw error;
    return data;
}

export function useQuestImages(questId: string) {
    return useQuery({
        queryKey: keys.questImages.byQuest(questId),
        queryFn: () => fetchQuestImages(questId),
    });
}
