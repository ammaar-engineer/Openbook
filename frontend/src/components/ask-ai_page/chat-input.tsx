import { useState } from 'react'
import { ArrowUpIcon, ChevronDownIcon, PaperclipIcon, SparklesIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function ChatInput() {
  const [message, setMessage] = useState('')

  function send() {
    if (!message.trim()) return
    // TODO: sambungkan ke backend/agent
    setMessage('')
  }

  return (
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
        placeholder="Needs help?"
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
  )
}
