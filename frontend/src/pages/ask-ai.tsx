import { SparklesIcon } from 'lucide-react'
import { AgentActions } from '@/components/ask-ai_page/agent-actions'
import { ChatInput } from '@/components/ask-ai_page/chat-input'
import { QuickAccess } from '@/components/ask-ai_page/quick-access'
import { cn } from '@/lib/utils'
import { revealDelay, revealIn } from '@/lib/motion'

export default function AskAiPage() {
  return (
    <div className="mx-auto flex min-h-full max-w-2xl flex-col items-center justify-center gap-6 p-6">
      <div
        className={cn(
          'flex size-12 items-center justify-center rounded-xl bg-card ring-1 ring-foreground/10',
          revealIn,
        )}
        style={revealDelay(0)}
      >
        <SparklesIcon className="size-5" />
      </div>

      <div
        className={cn('space-y-2 text-center', revealIn)}
        style={revealDelay(1)}
      >
        <h1 className="text-3xl font-semibold tracking-tight">Hi, Amarix</h1>
        <p className="text-sm text-muted-foreground">
          Mulai percakapan baru dengan agent. Tulis ide, tempel tautan, atau
          minta bantuan menulis.
        </p>
      </div>

      <div
        className={cn('w-full', revealIn)}
        style={revealDelay(2)}
      >
        <ChatInput />
      </div>

      <div
        className={cn('flex justify-center', revealIn)}
        style={revealDelay(3)}
      >
        <AgentActions />
      </div>

      <div
        className={cn('w-full', revealIn)}
        style={revealDelay(4)}
      >
        <QuickAccess />
      </div>
    </div>
  )
}
