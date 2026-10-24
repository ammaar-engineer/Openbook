import { StickyNoteIcon, Trash2Icon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export type Note = {
  title: string
  body: string
}

export function NoteCard({
  note,
  onDelete,
}: {
  note: Note
  onDelete: () => void
}) {
  return (
    <Card className="gap-2 px-4">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <StickyNoteIcon className="size-4 shrink-0 text-muted-foreground" />
          <h3 className="font-medium">{note.title}</h3>
        </div>
        <Button
          variant="ghost"
          size="icon-xs"
          aria-label={`Hapus catatan ${note.title}`}
          onClick={onDelete}
          className="text-muted-foreground hover:text-destructive"
        >
          <Trash2Icon />
        </Button>
      </div>
      <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
        {note.body}
      </p>
    </Card>
  )
}
