import {
    Button,
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
    Input,
    Textarea,
} from '@/components/ui';

import { StoryBlock, StoryGroup } from '../StoryBlock';

export function DialogStory({ ...props }) {
    return (
        <div className="space-y-10" {...props}>
            <StoryGroup title="Default">
                <StoryBlock label="basic dialog" center>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="primary">Open Dialog</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogTitle>Are you sure?</DialogTitle>
                            <DialogDescription>
                                This action cannot be undone. This will
                                permanently delete your account and remove your
                                data from our servers.
                            </DialogDescription>
                            <div className="mt-6 flex justify-end gap-3">
                                <DialogClose asChild>
                                    <Button variant="ghost">Cancel</Button>
                                </DialogClose>
                                <DialogClose asChild>
                                    <Button variant="secondary">
                                        Delete account
                                    </Button>
                                </DialogClose>
                            </div>
                        </DialogContent>
                    </Dialog>
                </StoryBlock>
            </StoryGroup>

            <StoryGroup title="Form dialog">
                <StoryBlock label="with inputs" center>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="ghost">Edit Profile</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogTitle>Edit Profile</DialogTitle>
                            <DialogDescription>
                                Make changes to your profile here. Click save
                                when you're done.
                            </DialogDescription>
                            <div className="mt-4 space-y-3">
                                <div className="space-y-1">
                                    <label className="text-sm text-text-secondary">
                                        Display name
                                    </label>
                                    <Input
                                        defaultValue="bellsibub"
                                        placeholder="bellsibub"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm text-text-secondary">
                                        Bio
                                    </label>
                                    <Textarea
                                        defaultValue="I'm a software developer"
                                        placeholder="I'm a software developer"
                                    />
                                </div>
                            </div>
                            <div className="mt-6 flex justify-end gap-3">
                                <DialogClose asChild>
                                    <Button variant="ghost">Cancel</Button>
                                </DialogClose>
                                <Button variant="primary">Save changes</Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </StoryBlock>
            </StoryGroup>
        </div>
    );
}
