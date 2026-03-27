export const keys = {
    quests: {
        all: ['quests'] as const,
        bySlug: (slug: string) => ['quests', slug] as const,
    },
};
