import type { EditorView } from '@codemirror/view'
import {
  BoldIcon,
  CodeIcon,
  Heading1Icon,
  Heading2Icon,
  ItalicIcon,
  LinkIcon,
  ListIcon,
  QuoteIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from 'lucide-react'

export type Tool = {
  label: string
  icon: typeof BoldIcon
  run: (view: EditorView) => void
}

function wrapSelection(view: EditorView, before: string, after = before) {
  const { from, to } = view.state.selection.main
  const text = view.state.sliceDoc(from, to) || 'text'
  view.dispatch({
    changes: { from, to, insert: `${before}${text}${after}` },
    selection: {
      anchor: from + before.length,
      head: from + before.length + text.length,
    },
  })
  view.focus()
}

function prefixLine(view: EditorView, prefix: string) {
  const line = view.state.doc.lineAt(view.state.selection.main.from)
  view.dispatch({ changes: { from: line.from, insert: prefix } })
  view.focus()
}

export const tools: Tool[] = [
  { label: 'Bold', icon: BoldIcon, run: (v) => wrapSelection(v, '**') },
  { label: 'Italic', icon: ItalicIcon, run: (v) => wrapSelection(v, '*') },
  // { label: 'Underline', icon: UnderlineIcon, run: (v) => wrapSelection(v, '<u>', '</u>') },
  { label: 'Strikethrough', icon: StrikethroughIcon, run: (v) => wrapSelection(v, '~~') },
  { label: 'Heading 1', icon: Heading1Icon, run: (v) => prefixLine(v, '# ') },
  { label: 'Heading 2', icon: Heading2Icon, run: (v) => prefixLine(v, '## ') },
  { label: 'Quote', icon: QuoteIcon, run: (v) => prefixLine(v, '> ') },
  { label: 'List', icon: ListIcon, run: (v) => prefixLine(v, '- ') },
  { label: 'Code', icon: CodeIcon, run: (v) => wrapSelection(v, '`') },
  { label: 'Link', icon: LinkIcon, run: (v) => wrapSelection(v, '[', '](https://)') },
]

export function countWords(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length.toLocaleString('en-US')
}
