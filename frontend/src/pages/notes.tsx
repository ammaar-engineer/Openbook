import { useState } from 'react'
import { NoteCard, type Note } from '@/components/note_page/note-card'
import { NotesHeader } from '@/components/note_page/notes-header'

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

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>(initialNotes)

  return (
    <div className="mx-auto max-w-6xl p-6">
      <NotesHeader count={notes.length} />

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
