import { useState } from 'react'
import { BookOpenIcon } from 'lucide-react'
import { BookCard, type Book } from '@/components/book_page/book-card'
import { BooksHeader } from '@/components/book_page/books-header'
import type { NewBookInput } from '@/components/book_page/dialogs/create-book-dialog'

const initialBooks: Book[] = [
  {
    title: 'Sang Penjaga Waktu',
    description: 'Sebuah kisah tentang waktu yang tak pernah benar-benar berhenti.',
    date: '12 Jan 2025',
    chapters: 8,
    icon: BookOpenIcon,
  },
  {
    title: 'Ruang Sunyi',
    description: 'Catatan sunyi dari sebuah kota yang tak pernah benar-benar tidur.',
    date: '4 Feb 2025',
    chapters: 5,
    icon: BookOpenIcon,
  },
  {
    title: 'Kode Nusantara',
    description: 'Menelusuri jejak algoritma kuno di jalur rempah kepulauan.',
    date: '18 Feb 2025',
    chapters: 12,
    icon: BookOpenIcon,
  },
  {
    title: 'Notes from the North',
    description:
      'Letters from a winter that lasted far longer than anyone expected.',
    date: '2 Mar 2025',
    chapters: 7,
    icon: BookOpenIcon,
  },
  {
    title: 'The Paper Atlas',
    description:
      'Maps of places that only ever existed on folded sheets of paper.',
    date: '21 Mar 2025',
    chapters: 6,
    icon: BookOpenIcon,
  },
  {
    title: 'Merah di Ujung Senja',
    description: 'Kisah sebuah keluarga di batas antara senja dan malam.',
    date: '9 Apr 2025',
    chapters: 9,
    icon: BookOpenIcon,
  },
  {
    title: 'Lautan Kata',
    description: 'Esai-esai pendek tentang bahasa, jarak, dan kehilangan.',
    date: '27 Apr 2025',
    chapters: 4,
    icon: BookOpenIcon,
  },
  {
    title: 'Aroma Hujan',
    description: 'Memoar tentang rumah, hujan, dan hal-hal yang tinggal.',
    date: '5 Mei 2025',
    chapters: 3,
    icon: BookOpenIcon,
  },
]

function formatToday() {
  return new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>(initialBooks)

  function handleCreateBook({ title, description }: NewBookInput) {
    setBooks((prev) => [
      {
        title,
        description,
        date: formatToday(),
        chapters: 0,
        icon: BookOpenIcon,
      },
      ...prev,
    ])
  }

  return (
    <div className="mx-auto max-w-6xl p-6">
      <BooksHeader count={books.length} onCreate={handleCreateBook} />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {books.map((book, index) => (
          <BookCard key={book.title} book={book} index={index} />
        ))}
      </div>
    </div>
  )
}

