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

export type NewQuizInput = {
  title: string
  preview: string
}

export function CreateQuizDialog({
  onCreate,
}: {
  onCreate: (quiz: NewQuizInput) => void
}) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [preview, setPreview] = useState('')
  const [error, setError] = useState<string | null>(null)

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen)

    if (!nextOpen) {
      setTitle('')
      setPreview('')
      setError(null)
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedTitle = title.trim()

    if (!trimmedTitle) {
      setError('Judul paket wajib diisi.')
      return
    }

    onCreate({ title: trimmedTitle, preview: preview.trim() })
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
        Buat Paket
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Buat Paket Soal</DialogTitle>
          <DialogDescription>
            Buat paket soal baru. Soalnya bisa ditambahkan nanti.
          </DialogDescription>
        </DialogHeader>

        <form
          id="create-quiz-form"
          onSubmit={handleSubmit}
          className="grid gap-3"
        >
          <div className="grid gap-1.5">
            <Label htmlFor="new-quiz-title" className="text-xs">
              Judul paket
            </Label>
            <Input
              id="new-quiz-title"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value)
                if (error) setError(null)
              }}
              placeholder="Misalnya: Latihan Bab 4"
              aria-invalid={error ? true : undefined}
              autoFocus
            />
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="new-quiz-preview" className="text-xs">
              Kutipan soal
            </Label>
            <Textarea
              id="new-quiz-preview"
              value={preview}
              onChange={(event) => setPreview(event.target.value)}
              placeholder="Kutipan singkat soal pertama..."
              rows={3}
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
          <Button type="submit" form="create-quiz-form">
            Buat Paket
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
