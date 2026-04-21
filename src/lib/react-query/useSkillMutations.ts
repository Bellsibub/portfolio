import supabase from '@/lib/supabase/client';
import type { Tables, TablesInsert, TablesUpdate } from '@/lib/supabase/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { keys } from './keys';

type SkillInsert = TablesInsert<'skills'>;
type SkillUpdate = TablesUpdate<'skills'>;

async function createSkill(data: SkillInsert): Promise<Tables<'skills'>> {
    const { data: skill, error } = await supabase
        .from('skills')
        .insert(data)
        .select()
        .single();

    if (error) throw error;
    return skill;
}

async function updateSkill({
    id,
    data,
}: {
    id: string;
    data: SkillUpdate;
}): Promise<Tables<'skills'>> {
    const { data: skill, error } = await supabase
        .from('skills')
        .update(data)
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;
    return skill;
}

async function deleteSkill(id: string): Promise<void> {
    const { error } = await supabase.from('skills').delete().eq('id', id);
    if (error) throw error;
}

export function useCreateSkill() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createSkill,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: keys.skills.all });
        },
    });
}

export function useUpdateSkill() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateSkill,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: keys.skills.all });
        },
    });
}

export function useDeleteSkill() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteSkill,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: keys.skills.all });
        },
    });
}
