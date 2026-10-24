import { ChevronDownIcon, SearchIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  CreateNoteDialog,
  type NewNoteInput,
} from '@/components/note_page/dialogs/create-note-dialog'

export function NotesHeader({
  count,
  onCreate,
}: {
  count: number
  onCreate: (note: NewNoteInput) => void
}) {
  return (
    <header className="flex flex-wrap items-start justify-between gap-3 pb-4">
      <div>
        <h1 className="text-lg font-semibold">Semua Catatan</h1>
        <p className="text-xs text-muted-foreground">{count} catatan</p>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative w-60">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Cari catatan..." className="pl-8 text-xs" />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={<Button variant="outline" className="text-xs" />}
          >
            Terbaru
            <ChevronDownIcon className="size-3.5" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Terbaru</DropdownMenuItem>
            <DropdownMenuItem>Terlama</DropdownMenuItem>
            <DropdownMenuItem>Judul A–Z</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <CreateNoteDialog onCreate={onCreate} />
      </div>
    </header>
  )
}
