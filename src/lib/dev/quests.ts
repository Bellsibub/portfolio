type Image = {
    url: string;
    label: string;
};

const SLIDES = [
    {
        url: 'https://picsum.photos/500',
        label: 'Slide 1',
    },
    {
        url: 'https://picsum.photos/1200',
        label: 'Slide 2',
    },
    {
        url: 'https://picsum.photos/2440',
        label: 'Slide 3',
    },
    {
        url: 'https://picsum.photos/1600',
        label: 'Slide 4',
    },
];

export type Quests = {
    id: string;
    title: string;
    description: string;
    summary: string;
    slug: string;
    level: 'novice' | 'apprentice' | 'adept' | 'master';
    difficulty: 'easy' | 'medium' | 'hard' | 'legendary';
    rewards: string[];
    isCompleted: boolean;
    isFeatured: boolean;
    imageUrl?: string;
    images?: Image[];
    demoLink?: string;
    githubLink?: string;
    reflections?: string;
};

const TEMP_QUEST: Quests = {
    id: '1',
    title: 'Defeat the Dragon',
    description: 'Slay the dragon terrorizing the village.',
    summary:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi.',
    slug: 'defeat-the-dragon',
    level: 'adept',
    difficulty: 'hard',
    rewards: ['React', 'TypeScript', 'Gold'],
    isCompleted: false,
    isFeatured: false,
    imageUrl: 'https://picsum.photos/500',
    images: SLIDES,
    demoLink: 'https://example.com',
    githubLink: 'https://github.com',
    reflections:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi.',
};

const TEMP_QUESTS: Quests[] = [
    { ...TEMP_QUEST, isFeatured: true },
    {
        ...TEMP_QUEST,
        id: '2',
        title: 'Rescue the Princess',
        slug: 'rescue-the-princess',
        isFeatured: true,
    },
    {
        ...TEMP_QUEST,
        id: '3',
        title: 'Find the Lost Sword',
        slug: 'find-the-lost-sword',
    },
    {
        ...TEMP_QUEST,
        id: '4',
        title: 'Defeat the Dragon',
        slug: 'defeat-the-dragon',
        isCompleted: true,
    },
    {
        ...TEMP_QUEST,
        id: '5',
        title: 'Rescue the Princess',
        slug: 'rescue-the-princess',
        isCompleted: true,
    },
    {
        ...TEMP_QUEST,
        id: '6',
        title: 'Find the Lost Sword',
        slug: 'find-the-lost-sword',
        isCompleted: true,
    },
    {
        ...TEMP_QUEST,
        id: '7',
        title: 'Defeat the Dragon',
        slug: 'defeat-the-dragon',
        isCompleted: true,
    },
    {
        ...TEMP_QUEST,
        id: '8',
        title: 'Rescue the Princess',
        slug: 'rescue-the-princess',
        isCompleted: true,
    },
    {
        ...TEMP_QUEST,
        id: '9',
        title: 'Find the Lost Sword',
        slug: 'find-the-lost-sword',
        isCompleted: true,
    },
    {
        ...TEMP_QUEST,
        id: '10',
        title: 'Defeat the Dragon',
        slug: 'defeat-the-dragon',
        isCompleted: true,
    },
];

export { TEMP_QUESTS };
