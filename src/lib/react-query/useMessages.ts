import supabase from '@/lib/supabase/client';
import type { Tables } from '@/lib/supabase/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

async function fetchMessages(): Promise<Tables<'contact_messages'>[]> {
    const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
}

async function deleteMessage(id: string): Promise<void> {
    const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id);
    if (error) throw error;
}

export function useMessages() {
    return useQuery({
        queryKey: ['messages'],
        queryFn: fetchMessages,
    });
}

export function useDeleteMessage() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteMessage,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['messages'] });
        },
    });
}
