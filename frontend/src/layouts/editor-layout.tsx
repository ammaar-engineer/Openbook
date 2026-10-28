import { Outlet } from 'react-router'
import { Toaster } from '@/components/ui/sonner'

/** Full-bleed layout for writing surfaces — no sidebar. */
export default function EditorLayout() {
  return (
    <div className="h-svh overflow-hidden bg-background text-foreground">
      <Outlet />
      <Toaster />
    </div>
  )
}
