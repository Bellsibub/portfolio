import { Input } from '@/components/ui';
import { StoryBlock, StoryGroup } from '../StoryBlock';

export function InputStory() {
  return (
    <div className='space-y-10'>
      <StoryGroup title='States'>
        <StoryBlock label='default'>
          <div className='w-72'>
            <Input placeholder='Placeholder text…' />
          </div>
        </StoryBlock>
        <StoryBlock label='with value'>
          <div className='w-72'>
            <Input defaultValue='bellsibub' />
          </div>
        </StoryBlock>
        <StoryBlock label='error'>
          <div className='w-72'>
            <Input error placeholder='Invalid value…' />
          </div>
        </StoryBlock>
        <StoryBlock label='disabled'>
          <div className='w-72'>
            <Input disabled placeholder='Disabled input' />
          </div>
        </StoryBlock>
      </StoryGroup>

      <StoryGroup title='Types'>
        <StoryBlock label='password'>
          <div className='w-72'>
            <Input type='password' placeholder='Enter password' />
          </div>
        </StoryBlock>
        <StoryBlock label='number'>
          <div className='w-72'>
            <Input type='number' placeholder='0' />
          </div>
        </StoryBlock>
      </StoryGroup>
    </div>
  );
}
