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
                allowedMimeTypes: [
                    'image/jpeg',
                    'image/png',
                    'image/gif',
                    'image/webp',
                ],
                fileSizeLimit: 10485760, // 10MB
            });
            if (error) throw error;
        }
    } catch (error) {
        console.warn(`Could not ensure bucket ${bucketName} exists:`, error);
    }
}

/**
 * Ensure a quest's image folder exists in the bucket
 * Creates a placeholder file to establish the folder structure
 * @param questId The UUID of the quest
 */
export async function ensureQuestImageFolder(questId: string): Promise<void> {
    try {
        await ensureBucket('quest-images');

        // Create a placeholder file to ensure folder exists
        const placeholderPath = `${questId}/.placeholder`;
        const placeholderBlob = new Blob([''], { type: 'text/plain' });

        // Upload or overwrite placeholder
        await supabase.storage
            .from('quest-images')
            .upload(placeholderPath, placeholderBlob, { upsert: true });
    } catch (error) {
        console.warn(
            `Could not ensure quest image folder ${questId} exists:`,
            error,
        );
        // Don't throw — allow quest creation to proceed even if folder setup fails
    }
}

/**
 * Upload a quest image to Supabase storage
 * @param file The image file to upload
 * @param questId The UUID of the quest
 * @returns Promise<string> The public URL of the uploaded image
 */
export async function uploadQuestImage(
    file: File,
    questId: string,
): Promise<string> {
    await ensureBucket('quest-images');

    // Sanitize filename by removing problematic characters
    const sanitizedName = file.name
        .toLowerCase()
        .replace(/[^a-z0-9.-]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '');

    // Generate unique filename with timestamp
    const fileName = `${questId}/${Date.now()}-${sanitizedName}`;

    const { error } = await supabase.storage
        .from('quest-images')
        .upload(fileName, file);

    if (error) throw error;

    const { data: publicUrl } = supabase.storage
        .from('quest-images')
        .getPublicUrl(fileName);

    return publicUrl.publicUrl;
}

/**
 * Delete a quest image from Supabase storage
 * @param filePath The full path of the file in the bucket (e.g., "quest-id/timestamp-filename.jpg")
 */
export async function deleteQuestImage(filePath: string): Promise<void> {
    const { error } = await supabase.storage
        .from('quest-images')
        .remove([filePath]);

    if (error) throw error;
}
