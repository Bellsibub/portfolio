import supabase from './client';

/**
 * Ensure storage bucket exists and is public
 */
async function ensureBucket(bucketName: string): Promise<void> {
    try {
        // Try to get bucket info
        const { data: buckets } = await supabase.storage.listBuckets();
        const bucketExists = buckets?.some(
            (bucket) => bucket.name === bucketName,
        );

        if (!bucketExists) {
            // Create bucket if it doesn't exist
            const { error } = await supabase.storage.createBucket(bucketName, {
                public: true,
                allowedMimeTypes:
                    bucketName === 'character-avatars'
                        ? ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
                        : [
                              'application/pdf',
                              'application/msword',
                              'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                          ],
                fileSizeLimit:
                    bucketName === 'character-avatars' ? 5242880 : 10485760, // 5MB for avatars, 10MB for CV
            });
            if (error) throw error;
        }
    } catch (error) {
        console.warn(`Could not ensure bucket ${bucketName} exists:`, error);
    }
}

/**
 * Upload an avatar image to Supabase storage
 * @param file The avatar file to upload
 * @returns Promise<string> The public URL of the uploaded avatar
 */
export async function uploadAvatar(file: File): Promise<string> {
    await ensureBucket('character-avatars');

    const fileName = `avatar-${Date.now()}-${file.name}`;
    const { error } = await supabase.storage
        .from('character-avatars')
        .upload(fileName, file);

    if (error) throw error;

    const { data: publicUrl } = supabase.storage
        .from('character-avatars')
        .getPublicUrl(fileName);

    return publicUrl.publicUrl;
}

/**
 * Upload a CV file to Supabase storage
 * @param file The CV file to upload
 * @returns Promise<string> The public URL of the uploaded CV
 */
export async function uploadCV(file: File): Promise<string> {
    await ensureBucket('character-cv');

    const fileName = `cv-${Date.now()}-${file.name}`;
    const { error } = await supabase.storage
        .from('character-cv')
        .upload(fileName, file);

    if (error) throw error;

    const { data: publicUrl } = supabase.storage
        .from('character-cv')
        .getPublicUrl(fileName);

    return publicUrl.publicUrl;
}
