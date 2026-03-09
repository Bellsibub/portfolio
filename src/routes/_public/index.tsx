import {createFileRoute} from '@tanstack/react-router'

export const Route = createFileRoute('/_public/')({
    component: RouteComponent,
})

const unusedVar = "this will trigger eslint"

function RouteComponent() {
    return <div>Hello from '/'</div>
}
