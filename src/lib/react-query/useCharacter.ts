import type { StatItem } from '@/components/features';
import { keys } from '@/lib/react-query/keys';
import supabase from '@/lib/supabase/client';
import type { Tables } from '@/lib/supabase/types';
import { useQuery } from '@tanstack/react-query';

export type Character = Omit<Tables<'character'>, 'stats'> & {
    stats: StatItem[];
};

async function fetchCharacter(): Promise<Character> {
    const { data, error } = await supabase
        .from('character')
        .select('*')
        .single();
    if (error) throw error;
    return data as unknown as Character;
}

export function useCharacter() {
    return useQuery({
        queryKey: keys.character.all,
        queryFn: () => fetchCharacter(),
    });
}
