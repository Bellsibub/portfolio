import supabase from '@/lib/supabase/client';
import type { Tables } from '@/lib/supabase/types';
import { useQuery } from '@tanstack/react-query';

import { keys } from './keys';

export type Quest = Tables<'quests'>;

async function fetchQuests(): Promise<Quest[]> {
    const { data, error } = await supabase
        .from('quests')
        .select('*')
        .order('created_at');
    if (error) throw error;
    return data;
}

export function useQuests() {
    return useQuery({
        queryKey: keys.quests.all,
        queryFn: fetchQuests,
    });
}
