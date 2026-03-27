-- ============================================================
-- Quests
-- ============================================================
CREATE TABLE quests (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    description text NOT NULL,
    summary text NOT NULL,
    slug text UNIQUE NOT NULL,
    level text NOT NULL CHECK (level IN ('novice', 'apprentice', 'adept', 'master')),
    difficulty text NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard', 'legendary')),
    rewards text[] NOT NULL DEFAULT '{}',
    is_completed boolean NOT NULL DEFAULT false,
    is_featured boolean NOT NULL DEFAULT false,
    image_url text,
    demo_link text,
    github_link text,
    reflections text,
    created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE quests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "quests_public_read"
    ON quests FOR SELECT
    USING (true);

-- ============================================================
-- Quest Images (carousel)
-- ============================================================
CREATE TABLE quest_images (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    quest_id uuid NOT NULL REFERENCES quests (id) ON DELETE CASCADE,
    url text NOT NULL,
    label text NOT NULL,
    "order" int NOT NULL DEFAULT 0
);

ALTER TABLE quest_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "quest_images_public_read"
    ON quest_images FOR SELECT
    USING (true);

-- ============================================================
-- Contact Messages
-- ============================================================
CREATE TABLE contact_messages (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    email text NOT NULL,
    subject text NOT NULL,
    message text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "contact_messages_public_insert"
    ON contact_messages FOR INSERT
    WITH CHECK (true);
