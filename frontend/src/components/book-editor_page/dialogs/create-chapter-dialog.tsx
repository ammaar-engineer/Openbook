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

export function CreateChapterDialog({
  onCreate,
}: {
  onCreate: (name: string) => void
}) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [error, setError] = useState<string | null>(null)

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen)

    if (!nextOpen) {
      setName('')
      setError(null)
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedName = name.trim()

    if (!trimmedName) {
      setError('Chapter name is required.')
      return
    }

    onCreate(trimmedName)
    handleOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger render={<Button variant="outline" size="sm" className="ml-1 text-xs" />}>
        <PlusIcon />
        Create chapter
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Chapter</DialogTitle>
          <DialogDescription>
            Name this chapter. The chapter number is added automatically.
          </DialogDescription>
        </DialogHeader>

        <form id="create-chapter-form" onSubmit={handleSubmit} className="grid gap-3">
          <div className="grid gap-1.5">
            <Label htmlFor="new-chapter-name" className="text-xs">
              Chapter name
            </Label>
            <Input
              id="new-chapter-name"
              value={name}
              onChange={(event) => {
                setName(event.target.value)
                if (error) setError(null)
              }}
              placeholder="e.g. Footprints at the Harbour"
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
            Cancel
          </DialogClose>
          <Button type="submit" form="create-chapter-form">
            Create Chapter
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
