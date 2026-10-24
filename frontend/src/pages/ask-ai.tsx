import { useState } from 'react'
import {
  ArrowUpIcon,
  BotIcon,
  ChevronDownIcon,
  LockIcon,
  PaperclipIcon,
  ServerIcon,
  SettingsIcon,
  SparklesIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const actions = [
  { label: 'Settings', icon: SettingsIcon },
  { label: 'Provider', icon: ServerIcon },
  { label: 'Vaults', icon: LockIcon },
  { label: 'Agents', icon: BotIcon },
]

export default function AskAiPage() {
  const [message, setMessage] = useState('')

  function send() {
    if (!message.trim()) return
    // TODO: sambungkan ke backend/agent
    setMessage('')
  }

  return (
    <div className="mx-auto flex min-h-full max-w-2xl flex-col items-center justify-center gap-6 p-6">
      <div className="flex size-12 items-center justify-center rounded-xl bg-card ring-1 ring-foreground/10">
        <SparklesIcon className="size-5" />
      </div>

      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">Hi, Amarix</h1>
        <p className="text-sm text-muted-foreground">
          Mulai percakapan baru dengan agent. Tulis ide, tempel tautan, atau
          minta bantuan menulis.
        </p>
      </div>

      <div className="w-full rounded-xl bg-card p-3 ring-1 ring-foreground/10">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              send()
            }
          }}
          rows={3}
          placeholder="Tulis pesan untuk agent..."
          className="w-full resize-none bg-transparent px-1 text-sm outline-none placeholder:text-muted-foreground"
        />

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="text-xs">
              <PaperclipIcon />
              Lampirkan
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger
                render={<Button variant="ghost" size="sm" className="text-xs" />}
              >
                <SparklesIcon />
                Quill 2.0
                <ChevronDownIcon className="size-3" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem>Quill 2.0</DropdownMenuItem>
                <DropdownMenuItem>Quill 1.5</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Button
            size="icon"
            onClick={send}
            disabled={!message.trim()}
            aria-label="Kirim pesan"
            className="rounded-full bg-foreground text-background hover:bg-foreground/90"
          >
            <ArrowUpIcon />
          </Button>
        </div>
      </div>

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
    </div>
  )
}
