import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_public')({
  component: PublicLayout,
})

function PublicLayout() {
  return (
    <div>
      {/* shared public UI: header, footer, nav, etc. */}
      <Outlet />
    </div>
  )
}
