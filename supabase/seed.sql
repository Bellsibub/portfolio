-- ============================================================
-- Skills (parents first, then children)
-- ============================================================
insert into
    skills (
        id,
        name,
        slug,
        description,
        category,
        parent_id,
        icon_name
    )
values
    -- Languages
    (
        '00000000-0000-0000-0000-000000000001',
        'JavaScript',
        'javascript',
        'The language of the web.',
        'language',
        null,
        'javascript'
    ),
    (
        '00000000-0000-0000-0000-000000000002',
        'TypeScript',
        'typescript',
        'Typed superset of JavaScript.',
        'language',
        '00000000-0000-0000-0000-000000000001',
        'typescript'
    ),
    -- Runtimes
    (
        '00000000-0000-0000-0000-000000000003',
        'Node.js',
        'nodejs',
        'JavaScript runtime built on V8.',
        'runtime',
        '00000000-0000-0000-0000-000000000001',
        'nodejs'
    ),
    -- Frameworks
    (
        '00000000-0000-0000-0000-000000000004',
        'React',
        'react',
        'UI library for building component trees.',
        'framework',
        '00000000-0000-0000-0000-000000000001',
        'react'
    ),
    (
        '00000000-0000-0000-0000-000000000005',
        'Next.js',
        'nextjs',
        'Full-stack React framework with SSR and file-based routing.',
        'framework',
        '00000000-0000-0000-0000-000000000004',
        'nextjs'
    ),
    -- Libraries
    (
        '00000000-0000-0000-0000-000000000006',
        'TanStack Query',
        'tanstack-query',
        'Async state management and data fetching for React.',
        'library',
        '00000000-0000-0000-0000-000000000004',
        'reactquery'
    ),
    (
        '00000000-0000-0000-0000-000000000007',
        'TanStack Router',
        'tanstack-router',
        'Type-safe file-based router for React.',
        'library',
        '00000000-0000-0000-0000-000000000004',
        null
    ),
    (
        '00000000-0000-0000-0000-000000000008',
        'Framer Motion',
        'framer-motion',
        'Production-ready animation library for React.',
        'library',
        '00000000-0000-0000-0000-000000000004',
        'framermotion'
    ),
    -- Styling
    (
        '00000000-0000-0000-0000-000000000009',
        'CSS',
        'css',
        'The styling language of the web.',
        'styling',
        null,
        'css3'
    ),
    (
        '00000000-0000-0000-0000-000000000010',
        'Tailwind CSS',
        'tailwind-css',
        'Utility-first CSS framework.',
        'styling',
        '00000000-0000-0000-0000-000000000009',
        'tailwindcss'
    ),
    -- Tools
    (
        '00000000-0000-0000-0000-000000000011',
        'Vite',
        'vite',
        'Lightning-fast frontend build tool.',
        'tool',
        null,
        'vite'
    ),
    (
        '00000000-0000-0000-0000-000000000012',
        'Git',
        'git',
        'Version control system.',
        'tool',
        null,
        'git'
    ),
    (
        '00000000-0000-0000-0000-000000000013',
        'Supabase',
        'supabase',
        'Open source Firebase alternative with Postgres.',
        'tool',
        null,
        'supabase'
    );

-- ============================================================
-- Quests
-- ============================================================
insert into
    quests (
        id,
        title,
        description,
        summary,
        slug,
        level,
        difficulty,
        is_completed,
        is_featured,
        image_url,
        demo_link,
        github_link,
        reflections
    )
values
    (
        'a0000000-0000-0000-0000-000000000001',
        'Defeat the Dragon',
        'A full-stack web app built to slay complexity.',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
        'defeat-the-dragon',
        'adept',
        'hard',
        true,
        true,
        'https://picsum.photos/seed/dragon/800/450',
        'https://example.com',
        'https://github.com',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. This project taught me a lot about state management and async data flows.'
    ),
    (
        'a0000000-0000-0000-0000-000000000002',
        'Rescue the Princess',
        'A responsive dashboard built under pressure.',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        'rescue-the-princess',
        'apprentice',
        'medium',
        true,
        true,
        'https://picsum.photos/seed/princess/800/450',
        'https://example.com',
        'https://github.com',
        'Learned a lot about component composition and keeping UI state minimal.'
    ),
    (
        'a0000000-0000-0000-0000-000000000003',
        'Find the Lost Sword',
        'An ongoing quest to master the dark arts of SSR.',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        'find-the-lost-sword',
        'master',
        'legendary',
        false,
        false,
        'https://picsum.photos/seed/sword/800/450',
        null,
        null,
        null
    );

-- ============================================================
-- Quest Images
-- ============================================================
insert into
    quest_images (quest_id, url, label, "order")
values
    (
        'a0000000-0000-0000-0000-000000000001',
        'https://picsum.photos/seed/dragon1/1200/675',
        'Screenshot 1',
        0
    ),
    (
        'a0000000-0000-0000-0000-000000000001',
        'https://picsum.photos/seed/dragon2/1200/675',
        'Screenshot 2',
        1
    ),
    (
        'a0000000-0000-0000-0000-000000000001',
        'https://picsum.photos/seed/dragon3/1200/675',
        'Screenshot 3',
        2
    ),
    (
        'a0000000-0000-0000-0000-000000000002',
        'https://picsum.photos/seed/princess1/1200/675',
        'Screenshot 1',
        0
    ),
    (
        'a0000000-0000-0000-0000-000000000002',
        'https://picsum.photos/seed/princess2/1200/675',
        'Screenshot 2',
        1
    );

-- ============================================================
-- Quest Skills
-- ============================================================
insert into
    quest_skills (quest_id, skill_id)
values
    -- Defeat the Dragon: React, TypeScript, TanStack Query, Tailwind CSS, Supabase
    (
        'a0000000-0000-0000-0000-000000000001',
        '00000000-0000-0000-0000-000000000004'
    ),
    (
        'a0000000-0000-0000-0000-000000000001',
        '00000000-0000-0000-0000-000000000002'
    ),
    (
        'a0000000-0000-0000-0000-000000000001',
        '00000000-0000-0000-0000-000000000006'
    ),
    (
        'a0000000-0000-0000-0000-000000000001',
        '00000000-0000-0000-0000-000000000010'
    ),
    (
        'a0000000-0000-0000-0000-000000000001',
        '00000000-0000-0000-0000-000000000013'
    ),
    -- Rescue the Princess: React, TypeScript, Next.js, Tailwind CSS
    (
        'a0000000-0000-0000-0000-000000000002',
        '00000000-0000-0000-0000-000000000004'
    ),
    (
        'a0000000-0000-0000-0000-000000000002',
        '00000000-0000-0000-0000-000000000002'
    ),
    (
        'a0000000-0000-0000-0000-000000000002',
        '00000000-0000-0000-0000-000000000005'
    ),
    (
        'a0000000-0000-0000-0000-000000000002',
        '00000000-0000-0000-0000-000000000010'
    ),
    -- Find the Lost Sword: Next.js, TypeScript, Supabase
    (
        'a0000000-0000-0000-0000-000000000003',
        '00000000-0000-0000-0000-000000000005'
    ),
    (
        'a0000000-0000-0000-0000-000000000003',
        '00000000-0000-0000-0000-000000000002'
    ),
    (
        'a0000000-0000-0000-0000-000000000003',
        '00000000-0000-0000-0000-000000000013'
    );

-- ============================================================
-- Inventory Items
-- ============================================================
insert into
    inventory_items (skill_id, is_equipped)
values
    -- Equipped
    ('00000000-0000-0000-0000-000000000004', true), -- React
    ('00000000-0000-0000-0000-000000000002', true), -- TypeScript
    ('00000000-0000-0000-0000-000000000010', true), -- Tailwind CSS
    ('00000000-0000-0000-0000-000000000003', true), -- Node.js
    -- Unequipped
    ('00000000-0000-0000-0000-000000000005', false), -- Next.js
    ('00000000-0000-0000-0000-000000000006', false), -- TanStack Query
    ('00000000-0000-0000-0000-000000000007', false), -- TanStack Router
    ('00000000-0000-0000-0000-000000000008', false), -- Framer Motion
    ('00000000-0000-0000-0000-000000000011', false), -- Vite
    ('00000000-0000-0000-0000-000000000013', false);

-- Supabase