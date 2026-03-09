import { useQuery } from '@tanstack/react-query'

export function QueryStory() {
  const { data, status, fetchStatus } = useQuery({
    queryKey: ['sandbox-test'],
    queryFn: () =>
      fetch('https://jsonplaceholder.typicode.com/todos/1').then((r) => r.json()),
  })

  return (
    <div className='space-y-4'>
      <p className='text-text-secondary text-sm'>
        Fetches <code className='text-accent-primary'>https://jsonplaceholder.typicode.com/todos/1</code> via{' '}
        <code className='text-accent-primary'>useQuery</code>.
      </p>
      <div className='rounded border border-accent-primary/20 bg-background-panel p-4 text-sm space-y-1'>
        <p>
          <span className='text-text-secondary'>status:</span>{' '}
          <span className='text-accent-primary'>{status}</span>
          {fetchStatus !== 'idle' && (
            <span className='text-text-secondary ml-2'>({fetchStatus})</span>
          )}
        </p>
        {data && (
          <pre className='mt-2 text-text-primary text-xs whitespace-pre-wrap'>
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
      </div>
    </div>
  )
}
