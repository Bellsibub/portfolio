import supabase from '@/lib/supabase/client';
import type { Tables } from '@/lib/supabase/types';
import { useQuery } from '@tanstack/react-query';

import { keys } from './keys';

export type QuestImage = Tables<'quest_images'>;
export type QuestWithImages = Tables<'quests'> & { quest_images: QuestImage[] };

async function fetchQuest(slug: string): Promise<QuestWithImages> {
    const { data, error } = await supabase
        .from('quests')
        .select('*, quest_images(*)')
        .eq('slug', slug)
        .order('order', { referencedTable: 'quest_images' })
        .single();
    if (error) throw error;
    return data;
}

export function useQuest(slug: string) {
    return useQuery({
        queryKey: keys.quests.bySlug(slug),
        queryFn: () => fetchQuest(slug),
    });
}
