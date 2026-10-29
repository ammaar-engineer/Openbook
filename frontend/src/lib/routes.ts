/**
 * Single source of truth for every internal path.
 * `ROUTES` holds absolute paths for links; `ROUTE_SEGMENTS` holds the same
 * paths without a leading slash, as registered under each layout in the router.
 */
export const ROUTES = {
  askAi: '/',
  agents: '/agents', // reserved — the page/route is not registered yet
  books: '/book',
  bookEditor: '/book/editor',
  notes: '/notes',
  quizzes: '/quizzes',
  settings: '/settings',
} as const

const withoutLeadingSlash = (path: string) => path.replace(/^\/+/, '')

export const ROUTE_SEGMENTS = {
  agents: withoutLeadingSlash(ROUTES.agents),
  books: withoutLeadingSlash(ROUTES.books),
  bookEditor: withoutLeadingSlash(ROUTES.bookEditor),
  notes: withoutLeadingSlash(ROUTES.notes),
  quizzes: withoutLeadingSlash(ROUTES.quizzes),
  settings: withoutLeadingSlash(ROUTES.settings),
} as const
