import { BookOpenIcon, StickyNoteIcon } from 'lucide-react'

// TODO: ganti dengan data quick access dari backend
const quickNotes = [
  'Waktu yang pura-pura diam',
  'Fragmen, bukan kronologi',
  'Senja sebagai keputusan',
]

const quickBooks = [{ title: 'Sang Penjaga Waktu' }, { title: 'Kode Nusantara' }]

export function QuickAccess() {
  return (
    <section className="w-full space-y-2 pt-2">
      <h2 className="text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
        Quick access
      </h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <p className="flex items-center gap-1.5 px-1 text-[11px] text-muted-foreground">
            <StickyNoteIcon className="size-3" />
            Notes
          </p>
          {quickNotes.map((title) => (
            <button
              key={title}
              type="button"
              className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm ring-1 ring-foreground/10 transition-colors hover:bg-accent"
            >
              <StickyNoteIcon className="size-3.5 shrink-0 text-muted-foreground" />
              <span className="truncate">{title}</span>
            </button>
          ))}
        </div>

        <div className="space-y-1.5">
          <p className="flex items-center gap-1.5 px-1 text-[11px] text-muted-foreground">
            <BookOpenIcon className="size-3" />
            Books
          </p>
          {quickBooks.map((book) => (
            <button
              key={book.title}
              type="button"
              className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left ring-1 ring-foreground/10 transition-colors hover:bg-accent"
            >
              <BookOpenIcon className="size-3.5 shrink-0 text-muted-foreground" />
              <span className="min-w-0 flex-1 truncate text-sm">
                {book.title}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
