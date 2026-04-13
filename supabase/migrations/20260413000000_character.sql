-- ============================================================
-- Character (singleton row representing the portfolio owner)
-- ============================================================
CREATE TABLE character (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    title text NOT NULL,
    tagline text,
    cv_url text,
    stats jsonb NOT NULL DEFAULT '[]',
    created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE character ENABLE ROW LEVEL SECURITY;

CREATE POLICY "character_public_read"
    ON character FOR SELECT
    USING (true);

CREATE POLICY "character_admin_write"
    ON character FOR ALL
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

-- ============================================================
-- Seed initial character row
-- ============================================================
INSERT INTO character (name, title, tagline, stats)
VALUES (
    'Isabella Billgren',
    'Fullstack developer',
    'Crafting systems, tools and digital worlds',
    '[
        {"label": "STR", "value": "Debugging"},
        {"label": "DEX", "value": "Frontend"},
        {"label": "INT", "value": "Architecture"},
        {"label": "WIS", "value": "UX"},
        {"label": "CHA", "value": "Backend"}
    ]'::jsonb
);
