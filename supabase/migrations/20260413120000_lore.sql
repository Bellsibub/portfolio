-- ============================================================
-- Lore Sections (editable cards on the Lore page)
-- ============================================================
CREATE TABLE lore_sections (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    content text NOT NULL,
    "order" int2 NOT NULL DEFAULT 0,
    created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE lore_sections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "lore_sections_public_read"
    ON lore_sections FOR SELECT
    USING (true);

CREATE POLICY "lore_sections_admin_write"
    ON lore_sections FOR ALL
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

-- ============================================================
-- Seed initial lore sections (content stored as Markdown)
-- ============================================================
INSERT INTO lore_sections (title, content, "order") VALUES
(
    'Origin Story',
    E'Every developer has an **origin story**.\n\nMine started with curiosity about how games, systems, and digital worlds work.\n\nToday I build applications that help people organize complexity — whether that''s sales battle cards, game backlogs, or internal tools.',
    0
),
(
    'The Journey',
    E'This is where the *journey* takes shape.\n\n- Started as a curious tinkerer\n- Grew into a **fullstack developer**\n- Learned that the best tools are the ones that feel invisible\n\n> The road is long, but every quest starts with a single step.',
    1
),
(
    'Current Campaign',
    E'Currently focused on building **portfolio-worthy projects** and leveling up in:\n\n- TypeScript & React\n- Supabase & backend architecture\n- UI/UX that doesn''t make people cry\n\nAlways open to new quests and collaborations.',
    2
);
