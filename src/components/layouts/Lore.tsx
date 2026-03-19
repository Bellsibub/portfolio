import { Card, CardContent, CardTitle, SectionHeader } from '@/components/ui';

type LoreProps = {} & React.HTMLAttributes<HTMLDivElement>;

export const Lore = ({ ...props }: LoreProps) => {
    return (
        <div className="flex flex-col gap-10 p-2.5" {...props}>
            <SectionHeader title="Lore" className="uppercase" />
            <div className="flex flex-col gap-5 md:w-md lg:w-xl mx-auto">
                <Card variant="accent">
                    <CardTitle className="text-2xl">Origin story</CardTitle>
                    <CardContent>
                        <p>
                            Every developer has an origin story.
                            <br />
                            <br />
                            Mine started with curiosity about how games,
                            systems, and digital worlds work.
                            <br />
                            <br />
                            Today I build applications that help people organize
                            complexity — whether that's sales battle cards, game
                            backlogs, or internal tools.
                        </p>
                    </CardContent>
                </Card>
                <Card variant="accent">
                    <CardTitle className="text-2xl">The Journey</CardTitle>
                    <CardContent>
                        <p>
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Iste eaque obcaecati nisi, veritatis
                            voluptatibus magnam molestiae placeat accusamus sed
                            esse et fugiat repudiandae rerum illum autem
                            deleniti illo aliquid cum?
                        </p>
                    </CardContent>
                </Card>
                <Card variant="accent">
                    <CardTitle className="text-2xl">Current Campaign</CardTitle>
                    <CardContent>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Voluptas, voluptate. Doloribus, magnam.
                            Voluptas, voluptate. Doloribus, magnam.
                            <br />
                            <br />
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Voluptas, voluptate. Doloribus, magnam.
                            Voluptas, voluptate. Doloribus, magnam.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

Lore.displayName = 'Lore';
