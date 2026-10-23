import { createHashRouter } from 'react-router'
import RootLayout from '@/layouts/root-layout'
import AboutPage from '@/pages/about'
import NotFoundPage from '@/pages/not-found'
import BooksPage from '@/pages/books'

// Hash router: URLs work under file:// when the app is packaged in Electron.
export const router = createHashRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <BooksPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
