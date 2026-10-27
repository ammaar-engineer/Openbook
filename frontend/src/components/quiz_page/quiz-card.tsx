import { BookOpenIcon } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { revealDelay, revealIn } from '@/lib/motion'
import {
  quizStatusMeta,
  type Quiz,
  type QuizView,
} from '@/components/quiz_page/quiz'

function QuizStatusLabel({ quiz }: { quiz: Quiz }) {
  const meta = quizStatusMeta[quiz.is_done ? 'done' : 'todo']

  return (
    <span className="flex shrink-0 items-center gap-1.5">
      <span className={cn('size-1.5 rounded-full', meta.dot)} aria-hidden />
      {meta.label}
    </span>
  )
}

function QuizSource({ quiz }: { quiz: Quiz }) {
  return (
    <span className="flex min-w-0 items-center gap-1.5">
      <BookOpenIcon className="size-3 shrink-0" />
      <span className="truncate">{quiz.from_book ?? 'Independent quiz'}</span>
    </span>
  )
}

export function QuizCard({
  quiz,
  index = 0,
  layout = 'grid',
}: {
  quiz: Quiz
  index?: number
  layout?: QuizView
}) {
  return (
    <Card
      className={cn(
        'px-4 transition-transform hover:-translate-y-0.5',
        layout === 'grid'
          ? 'min-h-44'
          : 'flex-row flex-wrap items-center gap-3 py-3',
        revealIn,
      )}
      style={revealDelay(index)}
    >
      <div className="min-w-0 flex-1 space-y-2">
        <h3 className="leading-snug font-semibold">{quiz.title}</h3>
        <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground italic">
          {quiz.preview}
        </p>
      </div>

      {layout === 'grid' ? (
        <>
          <div className="mt-auto flex items-center justify-between gap-2 pt-6 text-[11px] text-muted-foreground">
            <QuizStatusLabel quiz={quiz} />
            <span className="shrink-0">{quiz.questionCount} soal</span>
          </div>

          <div className="flex items-center gap-1.5 border-t border-border/60 pt-3 text-[11px] text-muted-foreground">
            <QuizSource quiz={quiz} />
          </div>
        </>
      ) : (
        <>
          <div className="hidden max-w-56 text-[11px] text-muted-foreground sm:block">
            <QuizSource quiz={quiz} />
          </div>
          <div className="hidden text-[11px] text-muted-foreground md:block">
            <QuizStatusLabel quiz={quiz} />
          </div>
          <span className="shrink-0 text-[11px] text-muted-foreground">
            {quiz.questionCount} soal
          </span>
        </>
      )}
    </Card>
  )
}
