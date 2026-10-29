import { createHashRouter } from 'react-router'
import RootLayout from '@/layouts/root-layout'
import EditorLayout from '@/layouts/editor-layout'
import NotFoundPage from '@/pages/not-found'
import BooksPage from '@/pages/books'
import NotesPage from '@/pages/notes'
import QuizzesPage from '@/pages/quizzes'
import AskAiPage from '@/pages/ask-ai'
import BookEditorPage from '@/pages/book-editor'
import SettingsPage from '@/pages/settings'
import { ROUTES, ROUTE_SEGMENTS } from '@/lib/routes'

// Hash router: URLs work under file:// when the app is packaged in Electron.
export const router = createHashRouter([
  {
    path: ROUTES.askAi,
    element: <RootLayout />,
    children: [
      { index: true, element: <AskAiPage /> },
      { path: ROUTE_SEGMENTS.notes, element: <NotesPage /> },
      { path: ROUTE_SEGMENTS.books, element: <BooksPage /> },
      { path: ROUTE_SEGMENTS.quizzes, element: <QuizzesPage /> },
      { path: ROUTE_SEGMENTS.settings, element: <SettingsPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
  {
    element: <EditorLayout />,
    children: [{ path: ROUTE_SEGMENTS.bookEditor, element: <BookEditorPage /> }],
  },
])
