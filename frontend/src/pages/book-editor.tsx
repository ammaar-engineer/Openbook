import { useEffect, useRef, useState } from 'react'
import { ChapterBar } from '@/components/book-editor_page/chapter-bar'
import { AssistantPanel } from '@/components/book-editor_page/assistant-panel'
import { EditorHeader } from '@/components/book-editor_page/editor-header'
import { MarkdownCanvas } from '@/components/book-editor_page/markdown-canvas'
import {
  BOOK_TITLE,
  CHAPTERS,
  CHAPTER_SEED,
} from '@/components/book-editor_page/content'
import { type Tool } from '@/components/book-editor_page/format-tools'
import {
  createMarkdownEditor,
  type MarkdownEditor,
} from '@/services/markdown-editor'

export default function BookEditorPage() {
  const container = useRef<HTMLDivElement>(null)
  const editor = useRef<MarkdownEditor | null>(null)
  const [chapters, setChapters] = useState(CHAPTERS)
  const [chapter, setChapter] = useState(CHAPTERS[2])
  const [assistantOpen, setAssistantOpen] = useState(true)

  function handleCreateChapter(name: string) {
    const label = `${String(chapters.length + 1).padStart(2, '0')} ${name}`
    setChapters((prev) => [...prev, label])
    setChapter(label)
  }

  useEffect(() => {
    const parent = container.current
    if (!parent) return

    const instance = createMarkdownEditor({
      parent,
      doc: CHAPTER_SEED,
    })

    editor.current = instance
    return () => instance.destroy()
  }, [])

  function handleFormat(tool: Tool) {
    const view = editor.current?.view
    if (view) tool.run(view)
  }

  return (
    <div className="flex h-full flex-col">
      <EditorHeader
        title={BOOK_TITLE}
        onFormat={handleFormat}
        onOpenAssistant={() => setAssistantOpen(true)}
      />

      <ChapterBar
        chapters={chapters}
        active={chapter}
        onSelect={setChapter}
        onCreate={handleCreateChapter}
      />

      <div className="flex min-h-0 flex-1 gap-4 overflow-hidden p-4">
        <MarkdownCanvas title={BOOK_TITLE} editorRef={container} />
        {assistantOpen && (
          <AssistantPanel onClose={() => setAssistantOpen(false)} />
        )}
      </div>
    </div>
  )
}
