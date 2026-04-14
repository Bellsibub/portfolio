import supabase from '@/lib/supabase/client';
import type { Tables } from '@/lib/supabase/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type CharacterUpdate = {
    name?: string;
    title?: string;
    tagline?: string;
    cv_url?: string;
    avatar_url?: string;
    stats?: Array<{ label: string; value: string | number }>;
};

type UpdateCharacterParams = {
    characterId: string;
    data: CharacterUpdate;
    avatarFile?: File;
    cvFile?: File;
};

async function updateCharacter({
    characterId,
    data,
    avatarFile,
    cvFile,
}: UpdateCharacterParams): Promise<Tables<'character'>> {
    let avatarUrl = data.avatar_url;
    let cvUrl = data.cv_url;

    // Upload avatar if provided
    if (avatarFile) {
        const avatarFileName = `avatar-${Date.now()}-${avatarFile.name}`;
        const { error: avatarError } = await supabase.storage
            .from('character-avatars')
            .upload(avatarFileName, avatarFile);

        if (avatarError) throw avatarError;

        const { data: avatarPublicUrl } = supabase.storage
            .from('character-avatars')
            .getPublicUrl(avatarFileName);

        avatarUrl = avatarPublicUrl.publicUrl;
    }

    // Upload CV if provided
    if (cvFile) {
        const cvFileName = `cv-${Date.now()}-${cvFile.name}`;
        const { error: cvError } = await supabase.storage
            .from('character-cv')
            .upload(cvFileName, cvFile);

        if (cvError) throw cvError;

        const { data: cvPublicUrl } = supabase.storage
            .from('character-cv')
            .getPublicUrl(cvFileName);

        cvUrl = cvPublicUrl.publicUrl;
    }

    // Update character record
    const updateData = {
        ...data,
        ...(avatarUrl !== undefined && { avatar_url: avatarUrl }),
        ...(cvUrl !== undefined && { cv_url: cvUrl }),
    };

    const { data: character, error } = await supabase
        .from('character')
        .update(updateData)
        .eq('id', characterId)
        .select()
        .single();

    if (error) throw error;

    return character;
}

export function useUpdateCharacter() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateCharacter,
        onSuccess: () => {
            // Invalidate and refetch character data
            queryClient.invalidateQueries({ queryKey: ['character'] });
        },
    });
}
