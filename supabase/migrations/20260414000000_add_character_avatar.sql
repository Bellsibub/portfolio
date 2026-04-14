-- ============================================================
-- Add avatar_url field to character table for CMS uploads
-- ============================================================
ALTER TABLE character ADD COLUMN avatar_url text;

-- Update RLS policy to allow authenticated users to update avatar_url
-- (existing policy already allows authenticated users to write to character table)