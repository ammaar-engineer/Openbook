import type { ComponentType } from 'react'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { revealDelay, revealIn } from '@/lib/motion'

export type Book = {
  title: string
  description: string
  date: string
  chapters: number
  icon: ComponentType<{ className?: string }>
}

export function BookCard({ book, index = 0 }: { book: Book; index?: number }) {
  const Icon = book.icon

  return (
    <Card
      className={cn(
        'justify-between px-4 transition-transform hover:-translate-y-0.5',
        revealIn,
      )}
      style={revealDelay(index)}
    >
      <div className="flex items-start justify-between">
        <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
          <Icon className="size-4 text-muted-foreground" />
        </div>
      </div>

      <div>
        <h3 className="font-semibold">{book.title}</h3>
        <p className="line-clamp-2 pt-3 text-xs leading-relaxed text-muted-foreground">
          {book.description}
        </p>
      </div>

      <div className="flex items-center justify-between border-t border-border/60 pt-3 text-[11px] text-muted-foreground">
        <span>{book.date}</span>
        <span>{book.chapters} chapters</span>
      </div>
    </Card>
  )
}
