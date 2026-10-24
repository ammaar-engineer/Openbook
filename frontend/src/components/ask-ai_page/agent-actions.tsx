import { BotIcon, LockIcon, ServerIcon, SettingsIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

const actions = [
  { label: 'Settings', icon: SettingsIcon },
  { label: 'Provider', icon: ServerIcon },
  { label: 'Vaults', icon: LockIcon },
  { label: 'Agents', icon: BotIcon },
]

export function AgentActions() {
  return (
    <div className="flex items-center gap-1 rounded-lg p-1 ring-1 ring-foreground/10">
      {actions.map((action) => (
        <Button
          key={action.label}
          variant="ghost"
          size="sm"
          className="text-xs text-muted-foreground"
        >
          <action.icon />
          {action.label}
        </Button>
      ))}
    </div>
  )
}
