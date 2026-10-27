import { useState } from 'react'
import { InboxIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { QuizCard } from '@/components/quiz_page/quiz-card'
import { QuizFilters } from '@/components/quiz_page/quiz-filters'
import { QuizzesHeader } from '@/components/quiz_page/quizzes-header'
import {
  type Quiz,
  type QuizFilter,
  type QuizView,
} from '@/components/quiz_page/quiz'

const initialQuizzes: Quiz[] = [
  {
    id: 'quiz-1',
    title: 'Latihan Bab 3 — Sang Penjaga Waktu',
    preview: 'Latar tempat yang paling dominan pada kutipan Bab Tiga adalah...',
    questionCount: 5,
    is_done: true,
    createdAt: '2025-05-12T09:20:00.000Z',
    from_book: null
  },
  {
    id: 'quiz-2',
    title: 'Kuis Cepat — Tokoh & Watak',
    preview: 'Siapa yang menjaga jam kota tetap berjalan setiap malam?',
    questionCount: 10,
    is_done: true,
    createdAt: '2025-05-10T14:05:00.000Z',
    from_book: null,
  },
  {
    id: 'quiz-3',
    title: 'Uji Pemahaman — Latar & Setting',
    preview:
      'Jelaskan bagaimana dermaga berfungsi sebagai latar batin tokoh.',
    questionCount: 8,
    is_done: true,
    from_book: null,
    createdAt: '2025-05-08T08:45:00.000Z',
  },
  {
    id: 'quiz-4',
    title: 'Latihan Bab 2 — Ruang Sunyi',
    preview: 'Kalimat pembuka Bab Dua menandai perubahan suasana dengan...',
    questionCount: 5,
    is_done: true,
    from_book: null,
    createdAt: '2025-05-06T19:30:00.000Z',
  },
  {
    id: 'quiz-5',
    title: 'Majas & Diksi — Cek Cepat',
    preview: '"Sunyi" pada paragraf ketiga bermakna harfiah.',
    questionCount: 6,
    from_book: null,
    is_done: true,
    createdAt: '2025-05-04T11:10:00.000Z',
  },
  {
    id: 'quiz-6',
    title: 'Try Out Tengah Semester',
    preview: 'Tokoh utama dalam kutipan tersebut digambarkan sebagai...',
    questionCount: 20,
    is_done: true,
    from_book: null,
    createdAt: '2025-05-02T16:40:00.000Z',
  },
  {
    id: 'quiz-7',
    title: 'Latihan Bab 1 — Kafe Pukul Lima',
    preview: 'Ruang kafe disebut "hangat" terutama karena...',
    questionCount: 5,
    is_done: true,
    from_book: null,
    createdAt: '2025-04-28T07:55:00.000Z',
  },
  {
    id: 'quiz-8',
    title: 'Esai Reflektif — Waktu & Ingatan',
    preview: 'Waktu berjalan lebih lambat di dermaga. Apa maksud penulis?',
    questionCount: 5,
    from_book: null,
    is_done: true,
    createdAt: '2025-04-25T13:15:00.000Z',
  },
  {
    id: 'quiz-9',
    title: 'Paket Remedial Bab 1–3',
    preview: 'Urutan peristiwa yang benar pada tiga bab pertama adalah...',
    questionCount: 10,
    is_done: true,
    from_book: null,
    createdAt: '2025-04-20T10:25:00.000Z',
  },
]

export default function QuizzesPage() {
  const [quizzes] = useState<Quiz[]>(initialQuizzes)
  const [filter, setFilter] = useState<QuizFilter>('all')
  const [view, setView] = useState<QuizView>('grid')

  const visibleQuizzes = quizzes

  const counts: Record<QuizFilter, number> = {
    all: quizzes.length,
    todo: 0,
    active: 0,
    done: 0,
    flagged: 0,
  }

  function resetFilters() {
    setFilter('all')
  }

  return (
    <div className="mx-auto flex min-h-full max-w-6xl flex-col p-6">
      <QuizzesHeader />

      <QuizFilters
        value={filter}
        counts={counts}
        onChange={setFilter}
        view={view}
        onViewChange={setView}
      />

      {visibleQuizzes.length > 0 ? (
        <div
          className={
            view === 'grid'
              ? 'grid gap-3 sm:grid-cols-2 lg:grid-cols-3'
              : 'flex flex-col gap-2'
          }
        >
          {visibleQuizzes.map((quiz, index) => (
            <QuizCard
              key={quiz.id}
              quiz={quiz}
              index={index}
              layout={view}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border py-16 text-center">
          <InboxIcon className="size-6 text-muted-foreground" />
          <div className="space-y-1">
            <p className="text-sm font-medium">Tidak ada paket soal</p>
            <p className="text-xs text-muted-foreground">
              Coba filter yang lain.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="text-xs"
            onClick={resetFilters}
          >
            Reset filter
          </Button>
        </div>
      )}

      <div className="flex-1" />
    </div>
  )
}
