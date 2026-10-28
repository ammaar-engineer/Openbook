import { createHashRouter } from 'react-router'
import RootLayout from '@/layouts/root-layout'
import EditorLayout from '@/layouts/editor-layout'
import NotFoundPage from '@/pages/not-found'
import BooksPage from '@/pages/books'
import NotesPage from '@/pages/notes'
import QuizzesPage from '@/pages/quizzes'
import AskAiPage from '@/pages/ask-ai'
import BookEditorPage from '@/pages/book-editor'

// Hash router: URLs work under file:// when the app is packaged in Electron.
export const router = createHashRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <AskAiPage /> },
      { path: 'notes', element: <NotesPage /> },
      { path: 'book', element: <BooksPage /> },
      { path: 'quizzes', element: <QuizzesPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
  {
    element: <EditorLayout />,
    children: [{ path: 'book/editor', element: <BookEditorPage /> }],
  },
])
