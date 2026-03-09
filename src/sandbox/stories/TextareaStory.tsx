import { Textarea } from '@/components/ui';
import { StoryBlock, StoryGroup } from '../StoryBlock';

export function TextareaStory() {
  return (
    <div className='space-y-10'>
      <StoryGroup title='States'>
        <StoryBlock label='default'>
          <div className='w-72'>
            <Textarea placeholder='Write something…' rows={4} />
          </div>
        </StoryBlock>
        <StoryBlock label='with value'>
          <div className='w-72'>
            <Textarea defaultValue={'Line one\nLine two\nLine three'} rows={4} />
          </div>
        </StoryBlock>
        <StoryBlock label='error'>
          <div className='w-72'>
            <Textarea error placeholder='Something went wrong…' rows={4} />
          </div>
        </StoryBlock>
        <StoryBlock label='disabled'>
          <div className='w-72'>
            <Textarea disabled placeholder='Disabled textarea' rows={4} />
          </div>
        </StoryBlock>
      </StoryGroup>
    </div>
  );
}
