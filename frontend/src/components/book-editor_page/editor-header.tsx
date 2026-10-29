import { Link } from 'react-router'
import {
  BookOpenIcon,
  CheckIcon,
  ChevronsLeftIcon,
  SparklesIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { tools, type Tool } from '@/components/book-editor_page/format-tools'
import { ROUTES } from '@/lib/routes'

type EditorHeaderProps = {
  title: string
  onFormat: (tool: Tool) => void
  onOpenAssistant: () => void
}

export function EditorHeader({
  title,
  onFormat,
  onOpenAssistant,
}: EditorHeaderProps) {
  return (
    <header className="flex flex-wrap items-center gap-2 border-b border-border/60 px-3 py-2">
      <Link to={ROUTES.books}>
        <Button variant="ghost" size="icon-sm" aria-label="Back">
          <ChevronsLeftIcon />
        </Button>
      </Link>

      <div className="flex items-center gap-2">
        <div className="flex size-7 items-center justify-center rounded-md bg-foreground text-background">
          <BookOpenIcon className="size-4" />
        </div>
        <div className="leading-tight">
          <p className="text-[13px] font-medium">{title}</p>
        </div>
      </div>

      <Separator />

      <div className="flex items-center gap-0.5">
        {tools.map((tool) => (
          <Button
            key={tool.label}
            variant="ghost"
            size="icon-sm"
            aria-label={tool.label}
            title={tool.label}
            onClick={() => onFormat(tool)}
          >
            <tool.icon />
          </Button>
        ))}
      </div>

      <div className="ml-auto flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="text-xs"
          onClick={onOpenAssistant}
        >
          <SparklesIcon />
          Assistant
        </Button>
        <Button
          size="sm"
          className="bg-foreground text-background hover:bg-foreground/90"
        >
          <CheckIcon />
          Publish
        </Button>
      </div>
    </header>
  )
}

function Separator() {
  return <div className="mx-1 h-6 w-px shrink-0 bg-border" />
}
