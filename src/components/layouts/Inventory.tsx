import { InventoryItem, type Item } from '@/components/features';
import { Card, SectionHeader, Separator } from '@/components/ui';
import { React } from 'developer-icons';

type InventoryProps = {} & React.HTMLAttributes<HTMLDivElement>;

const TEMP_ITEM: Item = {
    id: '1',
    name: 'React',
    description: 'A JavaScript library for building user interfaces',
    Icon: React,
    isEquipped: false,
};

const TEMP_ITEMS: Item[] = [
    TEMP_ITEM,
    { ...TEMP_ITEM, id: '2', name: 'TypeScript', Icon: undefined },
    { ...TEMP_ITEM, id: '4', name: 'Next.js', Icon: undefined },
    { ...TEMP_ITEM, id: '5', name: 'Tailwind CSS', Icon: undefined },
    { ...TEMP_ITEM, id: '6', name: 'Framer Motion', Icon: undefined },
    { ...TEMP_ITEM, id: '7', name: 'Three.js', Icon: undefined },
    { ...TEMP_ITEM, id: '8', name: 'React Native', Icon: undefined },
    { ...TEMP_ITEM, id: '9', name: 'React Router', Icon: undefined },
    { ...TEMP_ITEM, id: '10', name: 'React Query', Icon: undefined },
];

const TEMP_EQUIPPED: Item[] = [
    {
        ...TEMP_ITEM,
        id: '3',
        name: 'Node.js',
        Icon: undefined,
        isEquipped: true,
    },
    {
        ...TEMP_ITEM,
        id: '11',
        name: 'Next.js',
        Icon: undefined,
        isEquipped: true,
    },
    {
        ...TEMP_ITEM,
        id: '456',
        name: 'Tailwind CSS',
        Icon: undefined,
        isEquipped: true,
    },
    {
        ...TEMP_ITEM,
        id: '476',
        name: 'Framer Motion',
        Icon: undefined,
        isEquipped: true,
    },
];

export const Inventory = ({ ...props }: InventoryProps) => {
    const MAX_EQUIPPED = 6;
    const MAX_UNEQUIPPED = 15;

    const equippedItems =
        TEMP_EQUIPPED.length < MAX_EQUIPPED
            ? [
                  ...TEMP_EQUIPPED,
                  ...Array(MAX_EQUIPPED - TEMP_EQUIPPED.length).fill(null),
              ]
            : TEMP_EQUIPPED.slice(0, MAX_EQUIPPED);

    const unequippedItems =
        TEMP_ITEMS.length < MAX_UNEQUIPPED
            ? [
                  ...TEMP_ITEMS,
                  ...Array(MAX_UNEQUIPPED - TEMP_ITEMS.length).fill(null),
              ]
            : TEMP_ITEMS.slice(0, MAX_UNEQUIPPED);

    return (
        <div className="flex flex-col gap-6 p-2.5" {...props}>
            <SectionHeader title="Inventory" className="uppercase" />
            <div className="flex flex-col items-center gap-6">
                <div className="grid grid-cols-3 md:grid-cols-5 gap-2.5">
                    {unequippedItems.map((item, index) => (
                        <InventoryItem key={item?.id || index} item={item} />
                    ))}
                </div>
                <Separator variant="accent" className="" />
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
