import supabase from '@/lib/supabase/client';
import { useQuery } from '@tanstack/react-query';

import { keys } from './keys';
import type { Skill } from './useQuests';

async function fetchSkills(): Promise<Skill[]> {
    const { data, error } = await supabase.from('skills').select('*');
    if (error) throw error;
    return data;
}

export function useSkills() {
    return useQuery({
        queryKey: keys.skills.all,
        queryFn: fetchSkills,
    });
}
