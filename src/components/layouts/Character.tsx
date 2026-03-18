import avatarSrc from '@/assets/avatar.png';
import { Stats } from '@/components/features';
import { Avatar, AvatarFallback, AvatarImage, Button } from '@/components/ui';
import { Link } from '@tanstack/react-router';

type CharacterProps = {} & React.HTMLAttributes<HTMLDivElement>;

export const Character = ({ ...props }: CharacterProps) => {
    return (
        <div className="flex flex-row items-center gap-20 p-2.5" {...props}>
            <Avatar size={'4xl'} shape={'rounded'}>
                <AvatarImage src={avatarSrc} alt="Avatar" />
                <AvatarFallback>BS</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-8">
                <div>
                    <h1>Isabella Billgren</h1>
                    <p>Fullstack developer</p>
                </div>
                <p>Crafting systems, tools and digital worlds</p>
                <div className="flex gap-4">
                    <Button asChild>
                        <Link to="/contact">Contact</Link>
                    </Button>
                    <Button variant="outline">Download CV</Button>
                </div>
                <Stats
                    stats={[
                        { label: 'STR', value: 'Debugging' },
                        { label: 'DEX', value: 'Frontend' },
                        { label: 'INT', value: 'Architecture' },
                        { label: 'WIS', value: 'UX' },
                        { label: 'CHA', value: 'Backend' },
                    ]}
                />
            </div>
        </div>
    );
};

Character.displayName = 'Character';
