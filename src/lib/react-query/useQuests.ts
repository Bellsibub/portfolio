import supabase from '@/lib/supabase/client';
import type { Tables } from '@/lib/supabase/types';
import { useQuery } from '@tanstack/react-query';

import { keys } from './keys';

export type Skill = Tables<'skills'>;
export type Quest = Tables<'quests'> & { quest_skills: { skill: Skill }[] };

async function fetchQuests(): Promise<Quest[]> {
    const { data, error } = await supabase
        .from('quests')
        .select('*, quest_skills(skill:skills(*))')
        .order('is_completed', { ascending: true });
    if (error) throw error;
    return data;
}

export function useQuests() {
    return useQuery({
        queryKey: keys.quests.all,
        queryFn: fetchQuests,
    });
}
