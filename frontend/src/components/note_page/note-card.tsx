import { StickyNoteIcon, Trash2Icon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export type Note = {
  id: string
  title: string
  body: string
  createdAt: string
}

function formatCreatedAt(value: string) {
  return new Date(value).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function NoteCard({
  note,
  onOpen,
  onDelete,
}: {
  note: Note
  onOpen: () => void
  onDelete: () => void
}) {
  return (
    <Card
      role="button"
      tabIndex={0}
      aria-label={`Buka catatan ${note.title}`}
      onClick={onOpen}
      onKeyDown={(event) => {
        if (event.target !== event.currentTarget) return

        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onOpen()
        }
      }}
      className="cursor-pointer gap-2 px-4 transition-colors outline-none hover:bg-accent/50 focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <StickyNoteIcon className="size-4 shrink-0 text-muted-foreground" />
          <h3 className="font-medium">{note.title}</h3>
        </div>
        <Button
          variant="ghost"
          size="icon-xs"
          aria-label={`Hapus catatan ${note.title}`}
          onClick={(event) => {
            event.stopPropagation()
            onDelete()
          }}
          onKeyDown={(event) => event.stopPropagation()}
          className="text-muted-foreground hover:text-destructive"
        >
          <Trash2Icon />
        </Button>
      </div>
      {note.body.trim() ? (
        <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {note.body}
        </p>
      ) : (
        <p className="text-sm text-muted-foreground/70 italic">
          Belum ada isi catatan.
        </p>
      )}

      <div className="border-t border-border/60 pt-2 text-[11px] text-muted-foreground">
        <time dateTime={note.createdAt}>
          Created_at {formatCreatedAt(note.createdAt)}
        </time>
      </div>
    </Card>
  )
}
