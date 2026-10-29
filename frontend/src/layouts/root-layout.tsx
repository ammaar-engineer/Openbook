import type { ComponentType, ReactNode } from 'react'
import { NavLink, Outlet } from 'react-router'
import {
  BookOpenIcon,
  BotIcon,
  ChevronDownIcon,
  FeatherIcon,
  ListChecksIcon,
  PanelLeftIcon,
  SettingsIcon,
  SparklesIcon,
  StickyNoteIcon,
} from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Toaster } from '@/components/ui/sonner'
import { cn } from '@/lib/utils'
import { ROUTES } from '@/lib/routes'

type NavItemProps = {
  to: string
  label: string
  icon: ComponentType<{ className?: string }>
  badge?: number
}

function NavItem({ to, label, icon: Icon, badge }: NavItemProps) {
  return (
    <NavLink
      to={to}
      end={to === ROUTES.askAi}
      className={({ isActive }) =>
        cn(
          'flex items-center gap-2 rounded-md px-2 py-1.5 text-[13px] text-muted-foreground transition-colors hover:bg-accent hover:text-foreground',
          isActive && 'bg-accent font-medium text-foreground',
        )
      }
    >
      <Icon className="size-4" />
      <span className="flex-1">{label}</span>
      {badge !== undefined && (
        <span className="text-xs text-muted-foreground">{badge}</span>
      )}
    </NavLink>
  )
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="px-2 pt-3 pb-1 text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
      {children}
    </p>
  )
}

export default function RootLayout() {
  return (
    <TooltipProvider>
      <div className="flex h-svh overflow-hidden bg-background text-foreground">
        <aside className="flex w-56 shrink-0 flex-col border-r border-border/60">
          <div className="flex items-center justify-between px-3 pt-3">
            <div className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-md bg-foreground text-background">
                <FeatherIcon className="size-4" />
              </div>
              <span className="text-sm font-semibold">Openbook</span>
            </div>
            <Button variant="ghost" size="icon-sm" aria-label="Toggle sidebar">
              <PanelLeftIcon />
            </Button>
          </div>

          <nav className="mt-3 flex-1 space-y-0.5 overflow-y-auto px-2">
            <NavItem to={ROUTES.askAi} label="Ask AI" icon={SparklesIcon} />
            <SectionLabel>Library</SectionLabel>
            <NavItem to={ROUTES.books} label="Books" icon={BookOpenIcon} />
            <NavItem to={ROUTES.notes} label="Notes" icon={StickyNoteIcon} />
            <NavItem to={ROUTES.quizzes} label="Quizzes" icon={ListChecksIcon} />
            <SectionLabel>Settings</SectionLabel>
            <NavItem to={ROUTES.agents} label="Agents" icon={BotIcon} />
            <NavItem to={ROUTES.settings} label="Settings" icon={SettingsIcon} />
          </nav>

          <div className="space-y-2 p-3">
            <button
              type="button"
              className="flex w-full items-center gap-2 rounded-lg p-2 text-left ring-1 ring-foreground/10 transition-colors hover:bg-accent"
            >
              <Avatar size="sm" className="size-7">
                <AvatarFallback className="text-[10px]">AW</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1 text-xs leading-tight">
                <p className="truncate font-medium">Amarix</p>
              </div>
              <ChevronDownIcon className="size-3.5 text-muted-foreground" />
            </button>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>

        <Toaster />
      </div>
    </TooltipProvider>
  )
}
