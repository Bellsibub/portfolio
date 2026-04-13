import { InventoryItem, type Item } from '@/components/features';
import { Card, SectionHeader, Separator } from '@/components/ui';
import * as CustomIcons from '@/lib/icons/customIcons';
import { type Skill, useQuests } from '@/lib/react-query/useQuests';
import { useSkills } from '@/lib/react-query/useSkills';
import * as DeveloperIcons from 'developer-icons';

const allIcons = {
    ...DeveloperIcons,
    ...CustomIcons,
} as Record<string, React.ComponentType<{ className?: string }>>;

type InventoryProps = {} & React.HTMLAttributes<HTMLDivElement>;

function skillToItem(skill: Skill, isEquipped: boolean): Item {
    const Icon = skill.icon_name
        ? (allIcons[skill.icon_name] ?? undefined)
        : undefined;
    return {
        ...skill,
        Icon: Icon as Item['Icon'],
        isEquipped,
    };
}

export const Inventory = ({ ...props }: InventoryProps) => {
    const MAX_EQUIPPED = 6;
    const MAX_UNEQUIPPED = 15;

    const { data: quests } = useQuests();
    const { data: skills } = useSkills();

    const hotbarSkillIds = new Set(
        (quests ?? [])
            .filter((q) => !q.is_completed)
            .flatMap((q) => q.quest_skills.map((qs) => qs.skill.id)),
    );

    const hotbarSkills = (skills ?? []).filter((s) => hotbarSkillIds.has(s.id));
    const inventorySkills = (skills ?? []).filter(
        (s) => !hotbarSkillIds.has(s.id),
    );

    const equippedItems: (Item | null)[] = [
        ...hotbarSkills.map((s) => skillToItem(s, true)),
        ...Array(Math.max(0, MAX_EQUIPPED - hotbarSkills.length)).fill(null),
    ].slice(0, MAX_EQUIPPED);

    const unequippedItems: (Item | null)[] = [
        ...inventorySkills.map((s) => skillToItem(s, false)),
        ...Array(Math.max(0, MAX_UNEQUIPPED - inventorySkills.length)).fill(
            null,
        ),
    ].slice(0, MAX_UNEQUIPPED);

    return (
        <div className="flex flex-col gap-6 p-2.5" {...props}>
            <SectionHeader title="Inventory" className="uppercase" />
            <div className="flex flex-col items-center gap-6">
                {/* Inventory grid — skills NOT linked to any in-progress quest */}
                <div className="grid grid-cols-3 md:grid-cols-5 gap-2.5">
                    {unequippedItems.map((item, index) => (
                        <InventoryItem key={item?.id || index} item={item} />
                    ))}
                </div>
                <Separator variant="accent" className="" />
                {/* Hotbar — skills linked to at least one in-progress quest */}
                <Card className="grid grid-cols-3 md:grid-cols-6 gap-2.5 p-2.5!">
                    {equippedItems.map((item, index) => (
                        <InventoryItem key={item?.id || index} item={item} />
                    ))}
                </Card>
            </div>
        </div>
    );
};

Inventory.displayName = 'Inventory';
