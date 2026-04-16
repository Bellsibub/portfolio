import supabase from '@/lib/supabase/client';
import type { Tables, TablesInsert, TablesUpdate } from '@/lib/supabase/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type LoreSectionInsert = TablesInsert<'lore_sections'>;
type LoreSectionUpdate = TablesUpdate<'lore_sections'>;

async function createLoreSection(
    data: LoreSectionInsert,
): Promise<Tables<'lore_sections'>> {
    const { data: loreSection, error } = await supabase
        .from('lore_sections')
        .insert(data)
        .select()
        .single();

    if (error) throw error;
    return loreSection;
}

async function updateLoreSection({
    id,
    data,
}: {
    id: string;
    data: LoreSectionUpdate;
}): Promise<Tables<'lore_sections'>> {
    const { data: loreSection, error } = await supabase
        .from('lore_sections')
        .update(data)
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;
    return loreSection;
}

async function deleteLoreSection(id: string): Promise<void> {
    const { error } = await supabase
        .from('lore_sections')
        .delete()
        .eq('id', id);
    if (error) throw error;
}

export function useCreateLoreSection() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createLoreSection,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['lore'] });
        },
    });
}

export function useUpdateLoreSection() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateLoreSection,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['lore'] });
        },
    });
}

export function useDeleteLoreSection() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteLoreSection,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['lore'] });
        },
    });
}
