import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import type { Note } from '@/components/note_page/note-card'
import { createMarkdownEditor } from '@/services/markdown-editor'

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
          <NoteDialogBody
            key={note.id}
            note={note}
            onSave={onSave}
            onClose={() => onOpenChange(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}

function NoteDialogBody({
  note,
  onSave,
  onClose,
}: {
  note: Note
  onSave: (values: NoteValues) => void
  onClose: () => void
}) {
  const [title, setTitle] = useState(note.title)
  const [error, setError] = useState<string | null>(null)

  const editorContainer = useRef<HTMLDivElement>(null)
  const body = useRef(note.body)

  useEffect(() => {
    const parent = editorContainer.current
    if (!parent) return

    const editor = createMarkdownEditor({
      parent,
      doc: body.current,
      onChange: (value) => {
        body.current = value
      },
    })

    return () => editor.destroy()
  }, [])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedTitle = title.trim()

    if (!trimmedTitle) {
      setError('Nama catatan wajib diisi.')
      return
    }

    onSave({ title: trimmedTitle, body: body.current })
    onClose()
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle className="sr-only">Edit catatan</DialogTitle>
      </DialogHeader>

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

        <div
          ref={editorContainer}
          aria-label="Isi catatan"
          className="max-h-72 min-h-16 overflow-y-auto text-sm leading-relaxed"
        />

        {error && (
          <p role="alert" className="text-xs text-destructive">
            {error}
          </p>
        )}
      </form>

      <DialogFooter>
        <DialogClose render={<Button variant="outline" type="button" />}>
          Batal
        </DialogClose>
        <Button type="submit" form="edit-note-form">
          Simpan
        </Button>
      </DialogFooter>
    </>
  )
}
