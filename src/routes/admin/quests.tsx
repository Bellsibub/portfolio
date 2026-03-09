import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/quests')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/quests"!</div>
}
