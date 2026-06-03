import { InventoryItem, type Item } from '@/components/features';
import {
    Card,
    CardDescription,
    CardTitle,
    SectionHeader,
    Separator,
} from '@/components/ui';
import { getIconComponent } from '@/lib/icons/reactIcons';
import { type Quest, type Skill, useQuests } from '@/lib/react-query/useQuests';
import { useSkills } from '@/lib/react-query/useSkills';

type InventoryProps = {} & React.HTMLAttributes<HTMLDivElement>;

function skillToItem(
    skill: Skill,
    isEquipped: boolean,
    linkedQuests: Quest[],
): Item {
    const IconComponent = getIconComponent(skill.icon_name);
    return {
        ...skill,
        Icon: IconComponent ?? undefined,
        isEquipped,
        linkedQuests,
    };
}

export const Inventory = ({ ...props }: InventoryProps) => {
    const MAX_EQUIPPED = 6;
    const MAX_UNEQUIPPED = 15;

    const { data: quests } = useQuests();
    const { data: skills } = useSkills();

    // Build a map of skill IDs to linked quests
    const skillQuestsMap = new Map<string, Quest[]>();
    for (const quest of quests ?? []) {
        for (const { skill } of quest.quest_skills) {
            if (!skillQuestsMap.has(skill.id)) {
                skillQuestsMap.set(skill.id, []);
            }
            skillQuestsMap.get(skill.id)!.push(quest);
        }
    }

    const hotbarSkills = (skills ?? []).filter((s) => s.equipped);
    const inventorySkills = (skills ?? []).filter((s) => !s.equipped);

    const equippedItems: (Item | null)[] = [
        ...hotbarSkills.map((s) =>
            skillToItem(s, true, skillQuestsMap.get(s.id) ?? []),
        ),
        ...Array(Math.max(0, MAX_EQUIPPED - hotbarSkills.length)).fill(null),
    ].slice(0, MAX_EQUIPPED);

    const unequippedItems: (Item | null)[] = [
        ...inventorySkills.map((s) =>
            skillToItem(s, false, skillQuestsMap.get(s.id) ?? []),
        ),
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
                {/* Hotbar — most prominent and most used skills */}
                <Card variant="accent" className="gap-4">
                    <div className="flex flex-col gap-1">
                        <CardTitle>Core Skills</CardTitle>
                        <CardDescription>
                            My most prominent and most used skills
                        </CardDescription>
                    </div>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-2.5">
                        {equippedItems.map((item, index) => (
                            <InventoryItem
                                key={item?.id || index}
                                item={item}
                            />
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
};

Inventory.displayName = 'Inventory';
