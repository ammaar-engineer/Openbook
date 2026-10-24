import { useState } from 'react'
import { NoteCard, type Note } from '@/components/note_page/note-card'
import { NotesHeader } from '@/components/note_page/notes-header'
import type { NewNoteInput } from '@/components/note_page/dialogs/create-note-dialog'
import {
  NoteDialog,
  type NoteValues,
} from '@/components/note_page/dialogs/note-dialog'

const seedNotes: Omit<Note, 'id'>[] = [
  {
    title: 'Waktu yang pura-pura diam',
    body: 'Waktu tidak pernah berhenti; ia hanya berpura-pura diam setiap kali kota menoleh ke belakang. Kota itu sendiri menyimpan jam-jam yang tidak lagi dipakai, dan setiap kali seseorang bertanya, mereka menjawab dengan jam yang berbeda.',
    createdAt: '2025-05-08T09:15:00.000Z',
  },
  {
    title: 'Bab 3 dari sisi penjaga gerbang',
    body: 'Satu kejadian, dua garis waktu, tanpa penjelasan. Biarkan pembaca menyusun urutannya sendiri.',
    createdAt: '2025-05-03T14:40:00.000Z',
  },
  {
    title: 'Rute sebagai jaringan keputusan',
    body: 'Pelayaran Nusantara bukan garis lurus. Setiap pelabuhan mengubah arah, harga, dan cerita.',
    createdAt: '2025-04-29T08:05:00.000Z',
  },
  {
    title: 'Dinding sebagai kebiasaan',
    body: 'Musim dingin di sini tidak datang sebagai cuaca, tapi sebagai kebiasaan.',
    createdAt: '2025-04-21T17:30:00.000Z',
  },
  {
    title: 'Fragmen, bukan kronologi',
    body: 'Paper Atlas dan Notes from the North menyusun bab sebagai fragmen — hanya kedekatan suasana.',
    createdAt: '2025-04-14T11:20:00.000Z',
  },
  {
    title: 'Tiga penulis, satu penolakan',
    body: 'Prameswari, Haiden, Berg — cari titik ketika ketiganya menolak linearitas waktu.',
    createdAt: '2025-04-07T19:45:00.000Z',
  },
  {
    title: 'Senja sebagai keputusan',
    body: 'Senja bukan waktu, tapi keputusan untuk berhenti.',
    createdAt: '2025-03-30T10:10:00.000Z',
  },
  {
    title: 'Bahasa sebagai jarak',
    body: 'Esai pendek dengan tema berulang: bahasa sebagai jarak, jarak sebagai kehilangan.',
    createdAt: '2025-03-22T13:25:00.000Z',
  },
  {
    title: 'Hujan yang kita hafal',
    body: 'Rumah adalah hujan yang kita hafal di luar kepala.',
    createdAt: '2025-03-15T07:50:00.000Z',
  },
]

const initialNotes: Note[] = seedNotes.map((note, index) => ({
  id: `note-${index + 1}`,
  ...note,
}))

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>(initialNotes)
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null)

  const activeNote = notes.find((note) => note.id === activeNoteId) ?? null

  function handleCreateNote({ title }: NewNoteInput) {
    setNotes((prev) => [
      {
        id: crypto.randomUUID(),
        title,
        body: '',
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ])
  }

  function handleSaveNote(values: NoteValues) {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === activeNoteId ? { ...note, ...values } : note,
      ),
    )
  }

  function handleDeleteNote(id: string) {
    setNotes((prev) => prev.filter((note) => note.id !== id))

    if (activeNoteId === id) setActiveNoteId(null)
  }

  return (
    <div className="mx-auto max-w-6xl p-6">
      <NotesHeader count={notes.length} onCreate={handleCreateNote} />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {notes.map((note, index) => (
          <NoteCard
            key={note.id}
            note={note}
            index={index}
            onOpen={() => setActiveNoteId(note.id)}
            onDelete={() => handleDeleteNote(note.id)}
          />
        ))}
      </div>

      <NoteDialog
        note={activeNote}
        open={activeNote !== null}
        onOpenChange={(open) => {
          if (!open) setActiveNoteId(null)
        }}
        onSave={handleSaveNote}
      />
    </div>
  )
}
