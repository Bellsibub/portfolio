import supabase from '@/lib/supabase/client';
import type { TablesInsert } from '@/lib/supabase/types';
import { useMutation } from '@tanstack/react-query';

type ContactMessage = TablesInsert<'contact_messages'>;

async function submitContact(message: ContactMessage): Promise<void> {
    const { error } = await supabase.from('contact_messages').insert(message);
    if (error) throw error;
}

export function useContactSubmit() {
    return useMutation({
        mutationFn: submitContact,
    });
}
