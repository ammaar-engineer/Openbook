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
    <div className="min-w-0 flex-1 overflow-y-auto">
      <div className="mx-auto min-h-full max-w-[720px] rounded-sm bg-card px-14 py-12 shadow-2xl ring-1 ring-foreground/10">
        <p className="pb-6 text-[10px] tracking-[0.25em] uppercase">
          {title}
        </p>
        <div ref={editorRef} className="book-page" />
      </div>
    </div>
  )
}
