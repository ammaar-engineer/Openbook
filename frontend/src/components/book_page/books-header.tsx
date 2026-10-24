import { ChevronDownIcon, PlusIcon, SearchIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'

export function BooksHeader({ count }: { count: number }) {
  return (
    <header className="flex flex-wrap items-start justify-between gap-3 pb-5">
      <div>
        <h1 className="text-lg font-semibold">Semua Buku</h1>
        <p className="text-xs text-muted-foreground">{count} buku</p>
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
  )
}
