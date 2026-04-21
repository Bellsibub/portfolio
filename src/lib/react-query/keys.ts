export const keys = {
    quests: {
        all: ['quests'] as const,
        bySlug: (slug: string) => ['quests', slug] as const,
    },
    questImages: {
        all: ['questImages'] as const,
        byQuest: (questId: string) => ['questImages', questId] as const,
    },
    character: {
        all: ['character'] as const,
        byId: (id: string) => ['character', id] as const,
    },
    skills: {
        all: ['skills'] as const,
    },
    lore: {
        all: ['lore'] as const,
    },
};
