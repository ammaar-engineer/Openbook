import { LayersIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CreateChapterDialog } from '@/components/book-editor_page/dialogs/create-chapter-dialog'
import type { BookChapter } from '@/services/book'

type ChapterBarProps = {
  chapters: BookChapter[]
  activeId: number
  onSelect: (chapterId: number) => void
  onCreate: (name: string) => void
}

export function ChapterBar({ chapters, activeId, onSelect, onCreate }: ChapterBarProps) {
  return (
    <div className="flex items-center gap-2 border-b border-border/60 px-3 py-2">
      <Button variant="ghost" size="sm" className="text-xs">
        <LayersIcon />
        Chapters
      </Button>

      {chapters.map((chapter, index) =>
        chapter.id === activeId ? (
          <span
            key={chapter.id}
            className="rounded-lg bg-muted px-2.5 py-1 text-xs font-medium text-foreground"
          >
            {chapter.name}
          </span>
        ) : (
          <Button
            key={chapter.id}
            variant="ghost"
            size="sm"
            className="text-xs text-muted-foreground"
            title={chapter.name}
            onClick={() => onSelect(chapter.id)}
          >
            {String(index + 1).padStart(2, '0')}
          </Button>
        ),
      )}

      <CreateChapterDialog onCreate={onCreate} />
    </div>
  )
}
