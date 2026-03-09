import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/quests/$slug')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/quests/$slug"!</div>
}
