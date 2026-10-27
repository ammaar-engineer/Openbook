export type QuizStatus = 'todo' | 'active' | 'done' | 'flagged'

export type Quiz = {
  id: string
  title: string
  preview: string
  questionCount: number
  is_done: boolean
  /** Example: "Sang Penjaga Waktu · Bab 3". `null` means an independent quiz. */
  from_book: string | null
  createdAt: string
}

export type QuizFilter = 'all' | QuizStatus
export type QuizSort = 'recent' | 'oldest' | 'title'
export type QuizView = 'grid' | 'list'

export const quizStatusMeta: Record<
  QuizStatus,
  { label: string; dot: string }
> = {
  todo: { label: 'Belum dikerjakan', dot: 'bg-muted-foreground/40' },
  active: { label: 'Sedang', dot: 'bg-amber-500' },
  done: { label: 'Selesai', dot: 'bg-primary' },
  flagged: { label: 'Ditandai', dot: 'bg-destructive' },
}

export const quizFilterOptions: { value: QuizFilter; label: string }[] = [
  { value: 'all', label: 'Semua' },
  { value: 'todo', label: quizStatusMeta.todo.label },
  { value: 'active', label: quizStatusMeta.active.label },
  { value: 'done', label: quizStatusMeta.done.label },
  { value: 'flagged', label: quizStatusMeta.flagged.label },
]

export const quizSortOptions: { value: QuizSort; label: string }[] = [
  { value: 'recent', label: 'Terbaru' },
  { value: 'oldest', label: 'Terlama' },
  { value: 'title', label: 'Judul A–Z' },
]
