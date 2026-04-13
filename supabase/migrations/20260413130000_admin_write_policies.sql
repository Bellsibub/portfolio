-- ============================================================
-- Admin write policies (authenticated role)
-- Allows INSERT, UPDATE, DELETE for all content tables.
-- Public SELECT policies are preserved from earlier migrations.
-- ============================================================

-- Quests
CREATE POLICY "quests_admin_write"
    ON quests FOR ALL
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

-- Quest Images
CREATE POLICY "quest_images_admin_write"
    ON quest_images FOR ALL
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

-- Skills
CREATE POLICY "skills_admin_write"
    ON skills FOR ALL
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

-- Quest Skills (join table)
CREATE POLICY "quest_skills_admin_write"
    ON quest_skills FOR ALL
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

-- Contact Messages: admin can read and delete submissions
CREATE POLICY "contact_messages_admin_all"
    ON contact_messages FOR ALL
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');
