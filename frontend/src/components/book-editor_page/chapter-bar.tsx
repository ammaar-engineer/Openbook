import { LayersIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CreateChapterDialog } from '@/components/book-editor_page/dialogs/create-chapter-dialog'

type ChapterBarProps = {
  chapters: string[]
  active: string
  onSelect: (chapter: string) => void
  onCreate: (name: string) => void
}

export function ChapterBar({ chapters, active, onSelect, onCreate }: ChapterBarProps) {
  return (
    <div className="flex items-center gap-2 border-b border-border/60 px-3 py-2">
      <Button variant="ghost" size="sm" className="text-xs">
        <LayersIcon />
        Chapters
      </Button>

      {chapters.map((chapter) =>
        chapter === active ? (
          <span
            key={chapter}
            className="rounded-lg bg-muted px-2.5 py-1 text-xs font-medium text-foreground"
          >
            {chapter}
          </span>
        ) : (
          <Button
            key={chapter}
            variant="ghost"
            size="sm"
            className="text-xs text-muted-foreground"
            onClick={() => onSelect(chapter)}
          >
            {chapter.split(' ')[0]}
          </Button>
        ),
      )}

      <CreateChapterDialog onCreate={onCreate} />
    </div>
  )
}
