import { useState, type FormEvent } from 'react'
import { PencilIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import type { Note } from '@/components/note_page/note-card'

export type NoteValues = {
  title: string
  body: string
}

export function NoteDialog({
  note,
  open,
  onOpenChange,
  onSave,
}: {
  note: Note | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (values: NoteValues) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        {note && (
          <NoteDialogBody key={note.id} note={note} onSave={onSave} />
        )}
      </DialogContent>
    </Dialog>
  )
}

function NoteDialogBody({
  note,
  onSave,
}: {
  note: Note
  onSave: (values: NoteValues) => void
}) {
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(note.title)
  const [body, setBody] = useState(note.body)
  const [error, setError] = useState<string | null>(null)

  function startEditing() {
    setTitle(note.title)
    setBody(note.body)
    setError(null)
    setEditing(true)
  }

  function cancelEditing() {
    setError(null)
    setEditing(false)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedTitle = title.trim()

    if (!trimmedTitle) {
      setError('Nama catatan wajib diisi.')
      return
    }

    onSave({ title: trimmedTitle, body })
    setEditing(false)
  }

  if (!editing) {
    return (
      <>
        <DialogHeader>
          <DialogTitle>{note.title}</DialogTitle>
          <DialogDescription className="max-h-72 overflow-y-auto text-sm leading-relaxed whitespace-pre-wrap text-muted-foreground">
            {note.body.trim() || 'Belum ada isi catatan.'}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>Tutup</DialogClose>
          <Button onClick={startEditing} autoFocus>
            <PencilIcon />
            Edit
          </Button>
        </DialogFooter>
      </>
    )
  }

  return (
    <>
      <DialogTitle className="sr-only">Edit catatan</DialogTitle>

      <form id="edit-note-form" onSubmit={handleSubmit} className="grid gap-2">
        <Input
          aria-label="Nama catatan"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value)
            if (error) setError(null)
          }}
          placeholder="Nama catatan"
          aria-invalid={error ? true : undefined}
          autoFocus
          className="h-auto rounded-none border-0 bg-transparent px-0 py-0 text-base leading-snug font-medium focus-visible:ring-0 aria-invalid:ring-0 dark:bg-transparent"
        />

        <Textarea
          aria-label="Isi catatan"
          value={body}
          onChange={(event) => setBody(event.target.value)}
          placeholder="Tulis isi catatan di sini..."
          rows={1}
          className="field-sizing-content max-h-72 min-h-0 resize-none overflow-y-auto rounded-none border-0 bg-transparent px-0 py-0 text-sm leading-relaxed text-muted-foreground focus-visible:ring-0 dark:bg-transparent"
        />

        {error && (
          <p role="alert" className="text-xs text-destructive">
            {error}
          </p>
        )}
      </form>

      <DialogFooter>
        <Button variant="outline" type="button" onClick={cancelEditing}>
          Batal
        </Button>
        <Button type="submit" form="edit-note-form">
          Simpan
        </Button>
      </DialogFooter>
    </>
  )
}
