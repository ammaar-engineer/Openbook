import { useEffect, useRef, useState } from 'react'
import { ChapterBar } from '@/components/book-editor_page/chapter-bar'
import { AssistantPanel } from '@/components/book-editor_page/assistant-panel'
import { EditorHeader } from '@/components/book-editor_page/editor-header'
import { MarkdownCanvas } from '@/components/book-editor_page/markdown-canvas'
import { type Tool } from '@/components/book-editor_page/format-tools'
import { MOCK_BOOK, type Book } from '@/services/book'
import {
  createMarkdownEditor,
  type MarkdownEditor,
} from '@/services/markdown-editor'

const initialChapterId = MOCK_BOOK.book_chapters[0]?.id ?? 0

export default function BookEditorPage() {
  const container = useRef<HTMLDivElement>(null)
  const canvasScroll = useRef<HTMLDivElement>(null)
  const editor = useRef<MarkdownEditor | null>(null)
  const activeIdRef = useRef(initialChapterId)

  // Drafts live in a ref: the editor owns them, so keystrokes must not re-render.
  const contents = useRef<Record<number, string>>(
    Object.fromEntries(
      MOCK_BOOK.book_chapters.map((chapter) => [chapter.id, chapter.content]),
    ),
  )

  const [book, setBook] = useState<Book>(MOCK_BOOK)
  const [activeChapterId, setActiveChapterId] = useState(initialChapterId)
  const [assistantOpen, setAssistantOpen] = useState(true)

  const activeChapter =
    book.book_chapters.find((chapter) => chapter.id === activeChapterId) ??
    book.book_chapters[0]

  // The editor is created once; switching chapters swaps the document instead.
  useEffect(() => {
    const parent = container.current
    if (!parent) return

    const instance = createMarkdownEditor({
      parent,
      doc: contents.current[activeIdRef.current] ?? '',
      onChange: (value) => {
        contents.current[activeIdRef.current] = value
      },
    })

    editor.current = instance
    return () => {
      instance.destroy()
      editor.current = null
    }
  }, [])

  useEffect(() => {
    activeIdRef.current = activeChapterId

    const view = editor.current?.view
    if (!view) return

    canvasScroll.current?.scrollTo({ top: 0 })

    const nextDoc = contents.current[activeChapterId] ?? ''
    if (view.state.doc.toString() === nextDoc) return

    view.dispatch({
      changes: { from: 0, to: view.state.doc.length, insert: nextDoc },
      selection: { anchor: 0 },
      scrollIntoView: true,
    })
    view.focus()
  }, [activeChapterId])

  function handleCreateChapter(name: string) {
    const nextId =
      Math.max(0, ...book.book_chapters.map((chapter) => chapter.id)) + 1
    const number = String(book.book_chapters.length + 1).padStart(2, '0')

    setBook((prev) => ({
      ...prev,
      book_chapters: [
        ...prev.book_chapters,
        { id: nextId, name: `Chapter ${number}: ${name}`, content: '' },
      ],
    }))
    contents.current[nextId] = ''

    setActiveChapterId(nextId)
  }

  function handleFormat(tool: Tool) {
    const view = editor.current?.view
    if (view) tool.run(view)
  }

  return (
    <div className="flex h-full flex-col">
      <EditorHeader
        title={book.title}
        onFormat={handleFormat}
        onOpenAssistant={() => setAssistantOpen(true)}
      />

      <ChapterBar
        chapters={book.book_chapters}
        activeId={activeChapterId}
        onSelect={setActiveChapterId}
        onCreate={handleCreateChapter}
      />

      <div className="flex min-h-0 flex-1 gap-4 overflow-hidden p-4">
        <MarkdownCanvas
          book={book}
          chapter={activeChapter}
          editorRef={container}
          scrollRef={canvasScroll}
        />
        {assistantOpen && (
          <AssistantPanel onClose={() => setAssistantOpen(false)} />
        )}
      </div>
    </div>
  )
}
