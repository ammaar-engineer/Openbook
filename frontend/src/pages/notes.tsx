import { useState } from 'react'
import {
  ChevronDownIcon,
  PlusIcon,
  SearchIcon,
  StickyNoteIcon,
  Trash2Icon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'

type Note = {
  title: string
  body: string
}

const initialNotes: Note[] = [
  {
    title: 'Waktu yang pura-pura diam',
    body: 'Waktu tidak pernah berhenti; ia hanya berpura-pura diam setiap kali kota menoleh ke belakang. Kota itu sendiri menyimpan jam-jam yang tidak lagi dipakai, dan setiap kali seseorang bertanya, mereka menjawab dengan jam yang berbeda.',
  },
  {
    title: 'Bab 3 dari sisi penjaga gerbang',
    body: 'Satu kejadian, dua garis waktu, tanpa penjelasan. Biarkan pembaca menyusun urutannya sendiri.',
  },
  {
    title: 'Rute sebagai jaringan keputusan',
    body: 'Pelayaran Nusantara bukan garis lurus. Setiap pelabuhan mengubah arah, harga, dan cerita.',
  },
  {
    title: 'Dinding sebagai kebiasaan',
    body: 'Musim dingin di sini tidak datang sebagai cuaca, tapi sebagai kebiasaan.',
  },
  {
    title: 'Fragmen, bukan kronologi',
    body: 'Paper Atlas dan Notes from the North menyusun bab sebagai fragmen — hanya kedekatan suasana.',
  },
  {
    title: 'Tiga penulis, satu penolakan',
    body: 'Prameswari, Haiden, Berg — cari titik ketika ketiganya menolak linearitas waktu.',
  },
  {
    title: 'Senja sebagai keputusan',
    body: 'Senja bukan waktu, tapi keputusan untuk berhenti.',
  },
  {
    title: 'Bahasa sebagai jarak',
    body: 'Esai pendek dengan tema berulang: bahasa sebagai jarak, jarak sebagai kehilangan.',
  },
  {
    title: 'Hujan yang kita hafal',
    body: 'Rumah adalah hujan yang kita hafal di luar kepala.',
  },
]

function NoteCard({
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

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>(initialNotes)

  return (
    <div className="mx-auto max-w-6xl p-6">
      <header className="flex flex-wrap items-start justify-between gap-3 pb-4">
        <div>
          <h1 className="text-lg font-semibold">Semua Catatan</h1>
          <p className="text-xs text-muted-foreground">{notes.length} catatan</p>
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

          <Button className="bg-foreground text-background hover:bg-foreground/90">
            <PlusIcon />
            Catatan Baru
          </Button>
        </div>
      </header>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {notes.map((note) => (
          <NoteCard
            key={note.title}
            note={note}
            onDelete={() =>
              setNotes((prev) => prev.filter((item) => item !== note))
            }
          />
        ))}
      </div>
    </div>
  )
}
