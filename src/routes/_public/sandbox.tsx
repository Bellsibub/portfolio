import { Sandbox } from '@/sandbox/Sandbox'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/sandbox')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Sandbox />
}
