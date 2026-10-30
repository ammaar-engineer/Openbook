import type { RefObject } from 'react'
import type { Book, BookChapter } from '@/services/book'

/** The white "paper" sheet that hosts the CodeMirror live-preview editor. */
export function MarkdownCanvas({
  book,
  chapter,
  editorRef,
  scrollRef,
}: {
  book: Book
  chapter: BookChapter | undefined
  editorRef: RefObject<HTMLDivElement | null>
  scrollRef: RefObject<HTMLDivElement | null>
}) {
  return (
    <div ref={scrollRef} className="min-h-0 min-w-0 flex-1 overflow-y-auto">
      <div className="min-h-full rounded-sm bg-card px-6 py-10 shadow-2xl ring-1 ring-foreground/10 md:px-10 lg:px-14 lg:py-12">
        <div className="flex items-baseline justify-between gap-4 pb-6">
          <p className="text-[10px] tracking-[0.25em] uppercase">{book.title}</p>
          <p className="shrink-0 text-[10px] text-muted-foreground">
            {chapter?.name}
          </p>
        </div>
        <div ref={editorRef} className="book-page" />
      </div>
    </div>
  )
}
