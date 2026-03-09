import {
  Button,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui';
import { StoryBlock, StoryGroup } from '../StoryBlock';

export function DialogStory() {
  return (
    <div className='space-y-10'>
      <StoryGroup title='Default'>
        <StoryBlock label='basic dialog' center>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant='primary'>Open Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Are you sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your account and remove
                your data from our servers.
              </DialogDescription>
              <div className='mt-6 flex justify-end gap-3'>
                <DialogClose asChild>
                  <Button variant='ghost'>Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button variant='danger'>Delete account</Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        </StoryBlock>
      </StoryGroup>

      <StoryGroup title='Form dialog'>
        <StoryBlock label='with inputs' center>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant='ghost'>Edit Profile</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Edit Profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
              <div className='mt-4 space-y-3'>
                <div className='space-y-1'>
                  <label className='text-sm text-text-secondary'>Display name</label>
                  <input
                    className='w-full rounded px-3 py-2 text-sm bg-background-primary border border-accent-primary/30 focus:outline-none focus:ring-2 focus:ring-accent-primary text-text-primary'
                    defaultValue='bellsibub'
                  />
                </div>
                <div className='space-y-1'>
                  <label className='text-sm text-text-secondary'>Bio</label>
                  <textarea
                    className='w-full rounded px-3 py-2 text-sm bg-background-primary border border-accent-primary/30 focus:outline-none focus:ring-2 focus:ring-accent-primary text-text-primary resize-y'
                    rows={3}
                    defaultValue='Full-stack developer & designer.'
                  />
                </div>
              </div>
              <div className='mt-6 flex justify-end gap-3'>
                <DialogClose asChild>
                  <Button variant='ghost'>Cancel</Button>
                </DialogClose>
                <Button variant='primary'>Save changes</Button>
              </div>
            </DialogContent>
          </Dialog>
        </StoryBlock>
      </StoryGroup>
    </div>
  );
}
