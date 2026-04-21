-- ============================================================
-- Lore admin write policies
-- Allows INSERT, UPDATE, DELETE for lore_sections table.
-- ============================================================

CREATE POLICY "lore_sections_admin_write"
    ON lore_sections FOR ALL
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');