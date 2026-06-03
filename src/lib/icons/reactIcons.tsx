import * as Fa from 'react-icons/fa';
import * as Si from 'react-icons/si';
import * as Tb from 'react-icons/tb';

import type { SkillIconValue } from './iconData';

export type { SkillIconValue };

// Combine all icon libraries
const allIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    ...Fa,
    ...Si,
    ...Tb,
};

export function getIconComponent(iconName: string | null | undefined) {
    if (!iconName) return null;
    return allIcons[iconName] ?? null;
}

export function isValidIcon(iconName: string): boolean {
    return iconName in allIcons;
}
