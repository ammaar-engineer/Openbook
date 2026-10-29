import type { RefObject } from 'react'

/** The white "paper" sheet that hosts the CodeMirror live-preview editor. */
export function MarkdownCanvas({
  title,
  editorRef,
}: {
  title: string
  editorRef: RefObject<HTMLDivElement | null>
}) {
  return (
    <div className="min-h-0 min-w-0 flex-1 overflow-y-auto">
      <div className="min-h-full rounded-sm bg-card px-6 py-10 shadow-2xl ring-1 ring-foreground/10 md:px-10 lg:px-14 lg:py-12">
        <p className="pb-6 text-[10px] tracking-[0.25em] uppercase">
          {title}
        </p>
        <div ref={editorRef} className="book-page" />
      </div>
    </div>
  )
}
