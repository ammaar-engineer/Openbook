import { revealIn } from '@/lib/motion'
import { cn } from '@/lib/utils'

export function QuizzesHeader() {
  return (
    <header className={cn('pb-5', revealIn)}>
      <h1 className="text-lg font-semibold">Quiz Bank</h1>
    </header>
  )
}
