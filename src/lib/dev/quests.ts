export type Quests = {
    id: string;
    title: string;
    description: string;
    slug: string;
    level: 'novice' | 'apprentice' | 'adept' | 'master';
    difficulty: 'easy' | 'medium' | 'hard' | 'legendary';
    rewards: string[];
    isCompleted: boolean;
    isFeatured: boolean;
};

const TEMP_QUEST: Quests = {
    id: '1',
    title: 'Defeat the Dragon',
    description: 'Slay the dragon terrorizing the village.',
    slug: 'defeat-the-dragon',
    level: 'adept',
    difficulty: 'hard',
    rewards: ['React', 'TypeScript', 'Gold'],
    isCompleted: false,
    isFeatured: false,
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
