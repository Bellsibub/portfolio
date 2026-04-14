import avatarSrc from '@/assets/avatar.png';
import { Stats } from '@/components/features';
import { Avatar, AvatarFallback, AvatarImage, Button } from '@/components/ui';
import { useCharacter } from '@/lib/react-query/useCharacter';
import { Link } from '@tanstack/react-router';

type CharacterProps = {} & React.HTMLAttributes<HTMLDivElement>;

export const Character = ({ ...props }: CharacterProps) => {
    const { data: character, isPending, isError } = useCharacter();

    if (isPending) return <p className="text-secondary p-2.5">Loading...</p>;
    if (isError || !character)
        return <p className="text-danger p-2.5">Character not found.</p>;

    return (
        <div
            className="flex flex-col lg:flex-row items-center gap-5 lg:gap-20 p-2.5"
            {...props}
        >
            <Avatar size="4xl" shape={'rounded'}>
                <AvatarImage
                    src={character.avatar_url || avatarSrc}
                    alt="Avatar"
                />
                <AvatarFallback>BS</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-4 lg:gap-8">
                <div className="flex flex-col gap-1 lg:gap-5">
                    <h1>{character.name}</h1>
                    <p>{character.title}</p>
                </div>
                <p className="italic caption">{character.tagline}</p>
                <div className="flex gap-4">
                    <Button asChild>
                        <Link to="/contact">Contact</Link>
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => {
                            if (character.cv_url) {
                                window.open(character.cv_url, '_blank');
                            }
                        }}
                    >
                        View CV
                    </Button>
                </div>
                <Stats stats={character.stats || []} />
            </div>
        </div>
    );
};

Character.displayName = 'Character';
