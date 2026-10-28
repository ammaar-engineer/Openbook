import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router/dom'
import { ThemeProvider } from 'next-themes'
import { router } from './router'
import './index.css'
import 'katex/dist/katex.min.css';
import katex from 'katex';
import 'katex/dist/katex.min.css';

// Paksa agar katex terbaca secara global jika pluginnya mencarinya via window.katex
if (typeof window !== 'undefined') {
  (window as any).katex = katex;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
)
