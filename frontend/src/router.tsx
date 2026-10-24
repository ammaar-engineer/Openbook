import { createHashRouter } from 'react-router'
import RootLayout from '@/layouts/root-layout'
import NotFoundPage from '@/pages/not-found'
import BooksPage from '@/pages/books'
import NotesPage from '@/pages/notes'
import AskAiPage from '@/pages/ask-ai'

// Hash router: URLs work under file:// when the app is packaged in Electron.
export const router = createHashRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <BooksPage /> },
      { path: 'notes', element: <NotesPage /> },
      { path: 'ask-ai', element: <AskAiPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
