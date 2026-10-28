import { useState } from 'react'
import { ArrowUpIcon, LightbulbIcon, SparklesIcon, XIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

type Message = { role: 'assistant' | 'user'; body: string }

const seedMessages: Message[] = [
  {
    role: 'assistant',
    body: 'Halo! Saya bisa membantu mengembangkan cerita, memperbaiki tata bahasa, atau membuat ringkasan. Mau mulai dari mana?',
  },
  {
    role: 'user',
    body: 'Bantu lanjutkan adegan di pelabuhan. Suasananya tegang.',
  },
  {
    role: 'assistant',
    body: 'Tentu. Saya perkuat ketegangan lewat detail indra dan jeda pendek:\n\n> "Pelabuhan itu menahan napas. Rubin air pun seolah enggan bergerak, seolah tahu ada sesuatu yang menunggu di ujung dermaga."',
  },
]

const suggestions = ['Continue', 'Fix', 'Summarize', 'New idea']

export function AssistantPanel({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>(seedMessages)
  const [draft, setDraft] = useState('')

  function send(text = draft) {
    const body = text.trim()
    if (!body) return
    setMessages((prev) => [...prev, { role: 'user', body }])
    setDraft('')
  }

  return (
    <aside className="hidden h-full min-h-0 w-[340px] shrink-0 flex-col overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10 xl:flex">
      <div className="flex shrink-0 items-center justify-between px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="flex size-6 items-center justify-center rounded-md bg-muted">
            <SparklesIcon className="size-3.5 text-muted-foreground" />
          </div>
          <p className="text-[13px] font-medium">AI Writing Assistant</p>
        </div>
        <Button
          variant="ghost"
          size="icon-xs"
          aria-label="Close assistant"
          onClick={onClose}
        >
          <XIcon />
        </Button>
      </div>

      <Tabs defaultValue="chat" className="min-h-0 flex-1 gap-0 px-4">
        <TabsList
          variant="line"
          className="w-full shrink-0 justify-start border-b border-border/60"
        >
          <TabsTrigger value="chat">AI Chat</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="comments">Comments</TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="flex min-h-0 flex-1 flex-col gap-2">
          <div className="min-h-0 flex-1 space-y-3 overflow-y-auto py-3">
            {messages.map((message, index) => (
              <div key={index} className="space-y-1">
                <p className="text-[10px] tracking-wider text-muted-foreground uppercase">
                  {message.role === 'assistant' ? 'Assistant' : 'You'}
                </p>
                <div
                  className={cn(
                    'rounded-lg px-3 py-2 text-xs leading-relaxed whitespace-pre-line',
                    message.role === 'assistant'
                      ? 'bg-foreground text-background'
                      : 'ml-6 bg-muted text-foreground',
                  )}
                >
                  {message.body}
                </div>
              </div>
            ))}
          </div>

          <div className="flex shrink-0 flex-wrap gap-1.5 pb-1">
            {suggestions.map((item) => (
              <Button
                key={item}
                variant="ghost"
                size="xs"
                className="text-muted-foreground ring-1 ring-foreground/10"
                onClick={() => send(item)}
              >
                {item === 'New idea' && <LightbulbIcon />}
                {item}
              </Button>
            ))}
          </div>
        </TabsContent>

        <TabsContent
          value="notes"
          className="min-h-0 flex-1 overflow-y-auto py-4 text-xs text-muted-foreground"
        >
          No notes for this chapter yet.
        </TabsContent>

        <TabsContent
          value="comments"
          className="min-h-0 flex-1 overflow-y-auto py-4 text-xs text-muted-foreground"
        >
          No comments yet.
        </TabsContent>
      </Tabs>

      <div className="shrink-0 border-t border-border/60 p-3">
        <div className="rounded-xl bg-background p-2 ring-1 ring-foreground/10">
          <textarea
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault()
                send()
              }
            }}
            rows={3}
            placeholder="Ask AI to write, summarize, or fix your text…"
            className="w-full resize-none bg-transparent px-1 text-xs leading-relaxed outline-none placeholder:text-muted-foreground"
          />
          <div className="flex justify-end">
            <Button
              size="icon-sm"
              aria-label="Send"
              disabled={!draft.trim()}
              onClick={() => send()}
              className="rounded-full bg-foreground text-background hover:bg-foreground/90"
            >
              <ArrowUpIcon />
            </Button>
          </div>
        </div>
        <p className="pt-2 text-center text-[10px] text-muted-foreground">
          AI can make mistakes. Double-check the results.
        </p>
      </div>
    </aside>
  )
}
