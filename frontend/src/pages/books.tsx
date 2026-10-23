import type { ComponentType } from 'react'
import {
  BookOpenIcon,
  ChevronDownIcon,
  PlusIcon,
  SearchIcon,
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

type Book = {
  title: string
  author: string
  description: string
  format: string
  date: string
  pages: number
  icon: ComponentType<{ className?: string }>
}

const books: Book[] = [
  {
    title: 'Sang Penjaga Waktu',
    author: 'Ayu Prameswari',
    description: 'Sebuah kisah tentang waktu yang tak pernah benar-benar berhenti.',
    format: 'Fiksi',
    date: '12 Jan 2025',
    pages: 248,
    icon: BookOpenIcon,
  },
  {
    title: 'Ruang Sunyi',
    author: 'Dewi Lestari',
    description: 'Catatan sunyi dari sebuah kota yang tak pernah benar-benar tidur.',
    format: 'Puisi',
    date: '4 Feb 2025',
    pages: 184,
    icon: BookOpenIcon,
  },
  {
    title: 'Kode Nusantara',
    author: 'Ranga Wibawa',
    description: 'Menelusuri jejak algoritma kuno di jalur rempah kepulauan.',
    format: 'Sejarah',
    date: '18 Feb 2025',
    pages: 312,
    icon: BookOpenIcon,
  },
  {
    title: 'Notes from the North',
    author: 'Elias Berg',
    description:
      'Letters from a winter that lasted far longer than anyone expected.',
    format: 'Travel',
    date: '2 Mar 2025',
    pages: 208,
    icon: BookOpenIcon,
  },
  {
    title: 'The Paper Atlas',
    author: 'Mira Haiden',
    description:
      'Maps of places that only ever existed on folded sheets of paper.',
    format: 'Esai',
    date: '21 Mar 2025',
    pages: 208,
    icon: BookOpenIcon,
  },
  {
    title: 'Merah di Ujung Senja',
    author: 'Sari Kusuma',
    description: 'Kisah sebuah keluarga di batas antara senja dan malam.',
    format: 'Fiksi',
    date: '9 Apr 2025',
    pages: 264,
    icon: BookOpenIcon,
  },
  {
    title: 'Lautan Kata',
    author: 'Iman Saputra',
    description: 'Esai-esai pendek tentang bahasa, jarak, dan kehilangan.',
    format: 'Esai',
    date: '27 Apr 2025',
    pages: 156,
    icon: BookOpenIcon,
  },
  {
    title: 'Aroma Hujan',
    author: 'Nadia Rahma',
    description: 'Memoar tentang rumah, hujan, dan hal-hal yang tinggal.',
    format: 'Memoar',
    date: '5 Mei 2025',
    pages: 232,
    icon: BookOpenIcon,
  },
]

function BookCard({ book }: { book: Book }) {
  const Icon = book.icon

  return (
    <Card className="justify-between px-4">
      <div className="flex items-start justify-between">
        <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
          <Icon className="size-4 text-muted-foreground" />
        </div>
        <span className="text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
          {book.format}
        </span>
      </div>

      <div>
        <h3 className="font-semibold">{book.title}</h3>
        <p className="text-[11px] text-muted-foreground">oleh {book.author}</p>
        <p className="line-clamp-2 pt-3 text-xs leading-relaxed text-muted-foreground">
          {book.description}
        </p>
      </div>

      <div className="flex items-center justify-between border-t border-border/60 pt-3 text-[11px] text-muted-foreground">
        <span>{book.date}</span>
        <span>{book.pages} pages</span>
      </div>
    </Card>
  )
}

export default function BooksPage() {
  return (
    <div className="mx-auto max-w-6xl p-6">
      <header className="flex flex-wrap items-start justify-between gap-3 pb-5">
        <div>
          <h1 className="text-lg font-semibold">Semua Buku</h1>
          <p className="text-xs text-muted-foreground">{books.length} buku</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative w-60">
            <SearchIcon className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Cari buku..." className="pl-8 text-xs" />
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
            Buat Buku
          </Button>
        </div>
      </header>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {books.map((book) => (
          <BookCard key={book.title} book={book} />
        ))}
      </div>
    </div>
  )
}

