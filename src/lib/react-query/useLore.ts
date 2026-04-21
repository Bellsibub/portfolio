import supabase from '@/lib/supabase/client';
import type { Tables } from '@/lib/supabase/types';
import { useQuery } from '@tanstack/react-query';

async function fetchLore(): Promise<Tables<'lore_sections'>[]> {
    const { data, error } = await supabase.from('lore_sections').select('*');
    if (error) throw error;
    return data;
}

export function useLore() {
    return useQuery({
        queryKey: ['lore'],
        queryFn: fetchLore,
    });
}
