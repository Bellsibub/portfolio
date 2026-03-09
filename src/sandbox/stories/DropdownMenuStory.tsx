import {
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from '@/components/ui';

import { StoryBlock, StoryGroup } from '../StoryBlock';

export function DropdownMenuStory() {
    return (
        <div className="space-y-10">
            <StoryGroup title="Basic">
                <StoryBlock label="simple menu" center>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost">Open Menu</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuItem>Billing</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Sign out</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </StoryBlock>
            </StoryGroup>

            <StoryGroup title="With labels">
                <StoryBlock label="grouped with label" center>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="primary">My Account</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuLabel>Danger zone</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Delete account</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </StoryBlock>
            </StoryGroup>

            <StoryGroup title="Nested (Sub)">
                <StoryBlock label="with submenu" center>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost">More options</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>New file</DropdownMenuItem>
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger>
                                    Export as
                                </DropdownMenuSubTrigger>
                                <DropdownMenuSubContent>
                                    <DropdownMenuItem>PDF</DropdownMenuItem>
                                    <DropdownMenuItem>PNG</DropdownMenuItem>
                                    <DropdownMenuItem>SVG</DropdownMenuItem>
                                </DropdownMenuSubContent>
                            </DropdownMenuSub>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </StoryBlock>
            </StoryGroup>
        </div>
    );
}
