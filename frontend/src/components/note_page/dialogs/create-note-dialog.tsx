import { useState, type FormEvent } from 'react'
import { PlusIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export type NewNoteInput = {
  title: string
}

export function CreateNoteDialog({
  onCreate,
}: {
  onCreate: (note: NewNoteInput) => void
}) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [error, setError] = useState<string | null>(null)

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen)

    if (!nextOpen) {
      setTitle('')
      setError(null)
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedTitle = title.trim()

    if (!trimmedTitle) {
      setError('Nama catatan wajib diisi.')
      return
    }

    onCreate({ title: trimmedTitle })
    handleOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button className="bg-foreground text-background hover:bg-foreground/90" />
        }
      >
        <PlusIcon />
        Catatan Baru
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Catatan Baru</DialogTitle>
          <DialogDescription>
            Beri nama catatanmu. Isinya bisa ditulis nanti.
          </DialogDescription>
        </DialogHeader>

        <form
          id="create-note-form"
          onSubmit={handleSubmit}
          className="grid gap-3"
        >
          <div className="grid gap-1.5">
            <Label htmlFor="new-note-title" className="text-xs">
              Nama
            </Label>
            <Input
              id="new-note-title"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value)
                if (error) setError(null)
              }}
              placeholder="Misalnya: Ide bab pembuka"
              aria-invalid={error ? true : undefined}
              autoFocus
            />
          </div>

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
          <Button type="submit" form="create-note-form">
            Simpan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
