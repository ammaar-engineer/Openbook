import { Link } from 'react-router'
import { cn } from '@/lib/utils'
import { revealDelay, revealIn } from '@/lib/motion'
import { ROUTES } from '@/lib/routes'

export default function NotFoundPage() {
  return (
    <section className="space-y-4">
      <h1
        className={cn('text-2xl font-semibold', revealIn)}
        style={revealDelay(0)}
      >
        404
      </h1>
      <p
        className={cn('text-muted-foreground', revealIn)}
        style={revealDelay(1)}
      >
        This page does not exist.
      </p>
      <Link
        to={ROUTES.askAi}
        className={cn(
          'inline-block text-primary underline underline-offset-4',
          revealIn,
        )}
        style={revealDelay(2)}
      >
        Back to home
      </Link>
    </section>
  )
}
