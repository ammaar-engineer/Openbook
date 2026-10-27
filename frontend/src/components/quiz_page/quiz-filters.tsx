import { LayoutGridIcon, ListIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { revealIn } from '@/lib/motion'
import {
  quizFilterOptions,
  type QuizFilter,
  type QuizView,
} from '@/components/quiz_page/quiz'

export function QuizFilters({
  value,
  counts,
  onChange,
  view,
  onViewChange,
}: {
  value: QuizFilter
  counts: Record<QuizFilter, number>
  onChange: (value: QuizFilter) => void
  view: QuizView
  onViewChange: (view: QuizView) => void
}) {
  return (
    <div
      className={cn(
        'flex flex-wrap items-center justify-between gap-2 pb-4',
        revealIn,
      )}
    >
      <div
        role="group"
        aria-label="Filter status paket soal"
        className="flex flex-wrap items-center gap-1.5"
      >
        {quizFilterOptions.map((option) => {
          const active = option.value === value

          return (
            <Button
              key={option.value}
              variant={active ? 'secondary' : 'outline'}
              size="xs"
              aria-pressed={active}
              onClick={() => onChange(option.value)}
              className={cn('text-xs', !active && 'text-muted-foreground')}
            >
              {option.label}
              <span className="text-[10px] text-muted-foreground">
                {counts[option.value]}
              </span>
            </Button>
          )
        })}
      </div>

      <div
        role="group"
        aria-label="Tampilan daftar"
        className="flex items-center gap-0.5 rounded-lg p-0.5 ring-1 ring-foreground/10"
      >
        <Button
          variant={view === 'grid' ? 'secondary' : 'ghost'}
          size="icon-xs"
          aria-label="Tampilan grid"
          aria-pressed={view === 'grid'}
          onClick={() => onViewChange('grid')}
        >
          <LayoutGridIcon />
        </Button>
        <Button
          variant={view === 'list' ? 'secondary' : 'ghost'}
          size="icon-xs"
          aria-label="Tampilan daftar"
          aria-pressed={view === 'list'}
          onClick={() => onViewChange('list')}
        >
          <ListIcon />
        </Button>
      </div>
    </div>
  )
}
