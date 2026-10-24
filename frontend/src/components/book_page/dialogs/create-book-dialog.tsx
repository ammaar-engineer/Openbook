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
import { Textarea } from '@/components/ui/textarea'

export type NewBookInput = {
  title: string
  description: string
}

export function CreateBookDialog({
  onCreate,
}: {
  onCreate: (book: NewBookInput) => void
}) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState<string | null>(null)

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen)

    if (!nextOpen) {
      setTitle('')
      setDescription('')
      setError(null)
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedTitle = title.trim()

    if (!trimmedTitle) {
      setError('Judul buku wajib diisi.')
      return
    }

    onCreate({ title: trimmedTitle, description: description.trim() })
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
        Buat Buku
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Buat Buku Baru</DialogTitle>
          <DialogDescription>
            Beri judul dan deskripsi singkat untuk buku barumu.
          </DialogDescription>
        </DialogHeader>

        <form
          id="create-book-form"
          onSubmit={handleSubmit}
          className="grid gap-3"
        >
          <div className="grid gap-1.5">
            <Label htmlFor="new-book-title" className="text-xs">
              Judul
            </Label>
            <Input
              id="new-book-title"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value)
                if (error) setError(null)
              }}
              placeholder="Misalnya: Lautan Kata"
              aria-invalid={error ? true : undefined}
              autoFocus
            />
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="new-book-description" className="text-xs">
              Deskripsi
            </Label>
            <Textarea
              id="new-book-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Tentang apa buku ini?"
              rows={4}
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
          <Button type="submit" form="create-book-form">
            Buat Buku
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
