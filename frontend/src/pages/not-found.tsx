import { Link } from 'react-router'

export default function NotFoundPage() {
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">404</h1>
      <p className="text-muted-foreground">This page does not exist.</p>
      <Link to="/" className="text-primary underline underline-offset-4">
        Back to home
      </Link>
    </section>
  )
}
