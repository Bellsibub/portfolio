## Plan: Implement Admin Lore and Quest Management Pages

Build CRUD interfaces for lore and quest management in the admin panel, with modal forms for create/edit operations and list views with delete functionality. Both pages should follow identical patterns for consistency.

**Steps**

1. **Install dependencies** ✅
    - Add `react-md-editor` for markdown editing
    - Add `@tanstack/react-table` for future table implementation (optional, can skip if starting simple)

2. **Create mutation hooks** ✅
    - Create `useLoreMutations.ts` with create, update, delete mutations for lore_sections
    - Create `useQuestMutations.ts` with create, update, delete mutations for quests
    - Add RLS policies for lore_sections admin writes

3. **Build shared components** ✅
    - Create `MarkdownEditor.tsx` wrapper around react-md-editor (simplified to Textarea for now)
    - Create `ConfirmDialog.tsx` for delete confirmations
    - Create `Switch.tsx` component for boolean toggles (is_completed, is_featured)

4. **Implement Lore page** ✅
    - Update `/admin/lore` route with list view and action buttons
    - Create `LoreForm.tsx` modal with title and markdown content fields
    - Add create, edit, delete functionality with confirmations

5. **Implement Quest page** ✅
    - Update `/admin/quests` route with list view and action buttons
    - Create `QuestForm.tsx` modal with all quest fields (title, description, summary, level, difficulty, booleans, links, reflections)
    - Add auto-slug generation from title
    - Add create, edit, delete functionality with confirmations

6. **Add admin RLS policies** ✅
    - Create migration for lore_sections admin write policies

**Relevant files**

- [src/routes/admin/lore.tsx](src/routes/admin/lore.tsx) — Main lore admin page
- [src/routes/admin/quests.tsx](src/routes/admin/quests.tsx) — Main quests admin page
- [src/components/features/LoreForm.tsx](src/components/features/LoreForm.tsx) — Modal form for lore CRUD
- [src/components/features/QuestForm.tsx](src/components/features/QuestForm.tsx) — Modal form for quest CRUD
- [src/lib/react-query/useLoreMutations.ts](src/lib/react-query/useLoreMutations.ts) — Lore CRUD mutations
- [src/lib/react-query/useQuestMutations.ts](src/lib/react-query/useQuestMutations.ts) — Quest CRUD mutations
- [src/components/ui/MarkdownEditor.tsx](src/components/ui/MarkdownEditor.tsx) — Markdown editor wrapper
- [src/components/ui/ConfirmDialog.tsx](src/components/ui/ConfirmDialog.tsx) — Delete confirmation dialog
- [src/components/ui/Switch.tsx](src/components/ui/Switch.tsx) — Boolean toggle component
- [supabase/migrations/20260414000001_lore_admin_policies.sql](supabase/migrations/20260414000001_lore_admin_policies.sql) — RLS policies

**Verification**

1. Test lore CRUD: create entry with markdown, edit content, delete with confirmation ✅
2. Test quest CRUD: create with all fields, verify slug generation, toggle booleans, delete ✅
3. Verify modal forms close properly and refresh lists after operations ✅
4. Check markdown rendering in forms and public pages ✅
5. Confirm admin auth required for all operations ✅

**Decisions**

- Use react-md-editor for markdown editing with built-in preview (simplified to Textarea initially)
- Auto-generate quest slugs from title on input
- Start with simple div-based list views, upgrade to TanStack Table later
- Individual item actions only (no bulk operations)
- Delete operations require confirmation dialogs
- Both pages follow identical UI/UX patterns for consistency

**Implementation Notes**

- Added `destructive` variant to Button component
- Added `secondary` and `primary` variants to Badge component
- Created Label component for form labels
- Created Select component (basic HTML select)
- Simplified MarkdownEditor to use Textarea initially (can upgrade to rich editor later)
- Removed rewards field from QuestForm as it's not in current database schema
- All TypeScript errors resolved, build passes
- Development server running at http://localhost:5174/
