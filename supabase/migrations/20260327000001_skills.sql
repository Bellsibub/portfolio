-- ============================================================
-- Skills (skill tree via self-referential parent_id)
-- ============================================================
CREATE TABLE skills (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    slug text UNIQUE NOT NULL,
    description text,
    category text NOT NULL CHECK (category IN ('language', 'framework', 'library', 'tool', 'styling', 'runtime')),
    parent_id uuid REFERENCES skills (id) ON DELETE SET NULL,
    icon_name text,
    created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE skills ENABLE ROW LEVEL SECURITY;

CREATE POLICY "skills_public_read"
    ON skills FOR SELECT
    USING (true);

-- ============================================================
-- Quest Skills (many-to-many: quests <-> skills)
-- ============================================================
CREATE TABLE quest_skills (
    quest_id uuid NOT NULL REFERENCES quests (id) ON DELETE CASCADE,
    skill_id uuid NOT NULL REFERENCES skills (id) ON DELETE CASCADE,
    PRIMARY KEY (quest_id, skill_id)
);

ALTER TABLE quest_skills ENABLE ROW LEVEL SECURITY;

CREATE POLICY "quest_skills_public_read"
    ON quest_skills FOR SELECT
    USING (true);

-- ============================================================
-- Inventory Items (equipped/unequipped skills)
-- ============================================================
CREATE TABLE inventory_items (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    skill_id uuid NOT NULL REFERENCES skills (id) ON DELETE CASCADE,
    is_equipped boolean NOT NULL DEFAULT false,
    created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE inventory_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "inventory_items_public_read"
    ON inventory_items FOR SELECT
    USING (true);

-- ============================================================
-- Drop rewards column from quests (replaced by quest_skills)
-- ============================================================
ALTER TABLE quests DROP COLUMN rewards;
