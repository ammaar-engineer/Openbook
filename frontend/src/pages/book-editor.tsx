import { useEffect, useRef, useState } from 'react'
import {
  ArrowUpIcon,
  BookOpenIcon,
  BoldIcon,
  CheckIcon,
  ChevronsLeftIcon,
  CodeIcon,
  EyeIcon,
  Heading1Icon,
  Heading2Icon,
  ItalicIcon,
  LayersIcon,
  LightbulbIcon,
  LinkIcon,
  ListIcon,
  PlusIcon,
  QuoteIcon,
  Redo2Icon,
  SparklesIcon,
  StrikethroughIcon,
  UnderlineIcon,
  Undo2Icon,
  XIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import {
  createMarkdownEditor,
  type MarkdownEditor,
} from '@/services/markdown-editor'
import type { EditorView } from '@codemirror/view'
import { Link } from 'react-router'

const seed = `# Bab Tiga

## Jejak di Pelabuhan

Pelabuhan itu masih basah ketika kapal terakhir bersandar. Lampu-lampu dermaga memantul di atas air gelap, bergetar setiap kali angin membawa aroma **garam** dan **kayu basah**.

Rani melangkah turun dengan mantel yang menempel di pundaknya. Ia menghitung setiap papan di bawah kakinya, seolah angka-angka itu mampu menahan *getar* yang menjalar dari telapak tangan.

> "Kembalilah sebelum waktu menutup pintunya."

Di ujung dermaga, seorang lelaki tua menunggu dengan lentera di tangan. Ia tidak bertanya apa pun; ia hanya menyerahkan sebuah amplop cokelat, lalu menghilang ke dalam kabut.

- Selembar foto lama
- Tulisan tinta biru
- Sebuah alamat di utara

---

Rani menatap foto itu lama sekali. Wajah di dalamnya tersenyum seperti orang yang tahu sesuatu yang belum terjadi.
`

const chapters = ['01 Awal', '02 Kota Bisu', '03 Penjaga Waktu', '04 Muara']

type Tool = {
  label: string
  icon: typeof BoldIcon
  run: (view: EditorView) => void
}

function wrapSelection(view: EditorView, before: string, after = before) {
  const { from, to } = view.state.selection.main
  const text = view.state.sliceDoc(from, to) || 'teks'
  view.dispatch({
    changes: { from, to, insert: `${before}${text}${after}` },
    selection: { anchor: from + before.length, head: from + before.length + text.length },
  })
  view.focus()
}

function prefixLine(view: EditorView, prefix: string) {
  const line = view.state.doc.lineAt(view.state.selection.main.from)
  view.dispatch({ changes: { from: line.from, insert: prefix } })
  view.focus()
}

const tools: Tool[] = [
  { label: 'Bold', icon: BoldIcon, run: (v) => wrapSelection(v, '**') },
  { label: 'Italic', icon: ItalicIcon, run: (v) => wrapSelection(v, '*') },
  { label: 'Underline', icon: UnderlineIcon, run: (v) => wrapSelection(v, '<u>', '</u>') },
  { label: 'Strikethrough', icon: StrikethroughIcon, run: (v) => wrapSelection(v, '~~') },
  { label: 'Heading 1', icon: Heading1Icon, run: (v) => prefixLine(v, '# ') },
  { label: 'Heading 2', icon: Heading2Icon, run: (v) => prefixLine(v, '## ') },
  { label: 'Quote', icon: QuoteIcon, run: (v) => prefixLine(v, '> ') },
  { label: 'List', icon: ListIcon, run: (v) => prefixLine(v, '- ') },
  { label: 'Code', icon: CodeIcon, run: (v) => wrapSelection(v, '`') },
  { label: 'Link', icon: LinkIcon, run: (v) => wrapSelection(v, '[', '](https://)') },
]

export default function BookEditorPage() {
  const container = useRef<HTMLDivElement>(null)
  const editor = useRef<MarkdownEditor | null>(null)

  const [words, setWords] = useState(() => countWords(seed))
  const [chapter, setChapter] = useState(chapters[2])
  const [saved, setSaved] = useState(true)

  // Snapshot history: the editor ships without @codemirror/commands.
  const history = useRef<string[]>([seed])
  const cursor = useRef(0)
  const [canUndo, setCanUndo] = useState(false)
  const [canRedo, setCanRedo] = useState(false)

  useEffect(() => {
    const parent = container.current
    if (!parent) return

    const instance = createMarkdownEditor({
      parent,
      doc: seed,
      onChange: (value) => {
        setWords(countWords(value))
        setSaved(false)
        if (value === history.current[cursor.current]) return
        history.current = [...history.current.slice(0, cursor.current + 1), value].slice(-80)
        cursor.current = history.current.length - 1
        setCanUndo(cursor.current > 0)
        setCanRedo(false)
      },
    })

    editor.current = instance
    return () => instance.destroy()
  }, [])

  function restore(index: number) {
    const value = history.current[index]
    if (value === undefined) return
    cursor.current = index
    setCanUndo(index > 0)
    setCanRedo(index < history.current.length - 1)
    editor.current?.view.dispatch({
      changes: {
        from: 0,
        to: editor.current.view.state.doc.length,
        insert: value,
      },
    })
  }

  const view = () => editor.current?.view

  return (
    <div className="flex h-full flex-col">
      <header className="flex flex-wrap items-center gap-2 border-b border-border/60 px-3 py-2">
      <Link to="/book">
        <Button variant="ghost" size="icon-sm" aria-label="Kembali">
          <ChevronsLeftIcon />
        </Button>
      </Link>

        <div className="flex items-center gap-2">
          <div className="flex size-7 items-center justify-center rounded-md bg-foreground text-background">
            <BookOpenIcon className="size-4" />
          </div>
          <div className="leading-tight">
            <p className="text-[13px] font-medium">Sang Penjaga Waktu</p>
            <p className="text-[10px] text-muted-foreground">
              {saved ? 'Tersimpan otomatis' : 'Menyimpan…'} · {words} kata
            </p>
          </div>
        </div>

        <Separator />

        <div className="flex items-center gap-0.5">
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Urungkan"
            disabled={!canUndo}
            onClick={() => restore(cursor.current - 1)}
          >
            <Undo2Icon />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Ulangi"
            disabled={!canRedo}
            onClick={() => restore(cursor.current + 1)}
          >
            <Redo2Icon />
          </Button>
        </div>

        <Separator />

        <div className="flex items-center gap-0.5">
          {tools.map(({ label, icon: Icon, run }) => (
            <Button
              key={label}
              variant="ghost"
              size="icon-sm"
              aria-label={label}
              title={label}
              onClick={() => {
                const v = view()
                if (v) run(v)
              }}
            >
              <Icon />
            </Button>
          ))}
          <Button variant="ghost" size="sm" className="ml-1 text-xs">
            <PlusIcon />
            Halaman Baru
          </Button>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <EyeIcon />
            Pratinjau
          </Button>
          <Button
            size="sm"
            className="bg-foreground text-background hover:bg-foreground/90"
            onClick={() => {
              setSaved(true)
              restore(cursor.current)
            }}
          >
            <CheckIcon />
            Terbitkan
          </Button>
        </div>
      </header>

      <div className="flex items-center gap-2 border-b border-border/60 px-3 py-2">
        <Button variant="ghost" size="sm" className="text-xs">
          <LayersIcon />
          Chapters
        </Button>
        {chapters.map((item) =>
          item === chapter ? (
            <span
              key={item}
              className="rounded-lg bg-muted px-2.5 py-1 text-xs font-medium text-foreground"
            >
              {item}
            </span>
          ) : (
            <Button
              key={item}
              variant="ghost"
              size="sm"
              className="text-xs text-muted-foreground"
              onClick={() => setChapter(item)}
            >
              {item.split(' ')[0]}
            </Button>
          ),
        )}
        <Button variant="outline" size="sm" className="ml-1 text-xs">
          <PlusIcon />
          Create chapter
        </Button>
      </div>

      <div className="flex min-h-0 flex-1 gap-4 overflow-hidden p-4">
        <div className="min-w-0 flex-1 overflow-y-auto">
          <div className="mx-auto max-w-[720px] rounded-sm bg-white px-14 py-12 shadow-2xl ring-1 ring-black/10">
            <p className="pb-6 text-[10px] tracking-[0.25em] text-neutral-400 uppercase">
              Sang Penjaga Waktu
            </p>
            <div ref={container} className="book-page" />
          </div>
        </div>

        <AssistantPanel />
      </div>
    </div>
  )
}

function Separator() {
  return <div className="mx-1 h-6 w-px shrink-0 bg-border" />
}

function countWords(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length.toLocaleString('id-ID')
}

type Message = { role: 'assistant' | 'user'; body: string }

const seedMessages: Message[] = [
  {
    role: 'assistant',
    body: 'Halo! Saya bisa membantu mengembangkan cerita, memperbaiki tata bahasa, atau membuat ringkasan. Mau mulai dari mana?',
  },
  {
    role: 'user',
    body: 'Bantu lanjutkan adegan di pelabuhan. Suasananya tegang.',
  },
  {
    role: 'assistant',
    body: 'Tentu. Saya perkuat ketegangan lewat detail indra dan jeda pendek:\n\n> "Pelabuhan itu menahan napas. Rubin air pun seolah enggan bergerak, seolah tahu ada sesuatu yang menunggu di ujung dermaga."',
  },
]

const suggestions = ['Lanjutkan', 'Perbaiki', 'Ringkas', 'Ide baru']

function AssistantPanel() {
  const [messages, setMessages] = useState<Message[]>(seedMessages)
  const [draft, setDraft] = useState('')

  function send(text = draft) {
    const body = text.trim()
    if (!body) return
    setMessages((prev) => [...prev, { role: 'user', body }])
    setDraft('')
  }

  return (
    <aside className="hidden w-[340px] shrink-0 flex-col rounded-xl bg-card ring-1 ring-foreground/10 xl:flex">
      <div className="flex items-center justify-between px-4 pt-3 pb-2">
        <div className="flex items-center gap-2">
          <div className="flex size-6 items-center justify-center rounded-md bg-muted">
            <SparklesIcon className="size-3.5 text-muted-foreground" />
          </div>
          <p className="text-[13px] font-medium">AI Asisten Menulis</p>
        </div>
        <Button variant="ghost" size="icon-xs" aria-label="Tutup asisten">
          <XIcon />
        </Button>
      </div>

      <Tabs defaultValue="chat" className="min-h-0 flex-1 px-4">
        <TabsList variant="line" className="w-full justify-start border-b border-border/60">
          <TabsTrigger value="chat">Chat AI</TabsTrigger>
          <TabsTrigger value="notes">Catatan</TabsTrigger>
          <TabsTrigger value="comments">Komentar</TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="flex min-h-0 flex-1 flex-col">
          <div className="min-h-0 flex-1 space-y-3 overflow-y-auto py-4">
            {messages.map((message, index) => (
              <div key={index} className="space-y-1">
                <p className="text-[10px] tracking-wider text-muted-foreground uppercase">
                  {message.role === 'assistant' ? 'Asisten' : 'Kamu'}
                </p>
                <div
                  className={cn(
                    'rounded-lg px-3 py-2 text-xs leading-relaxed whitespace-pre-line',
                    message.role === 'assistant'
                      ? 'bg-foreground text-background'
                      : 'ml-6 bg-muted text-foreground',
                  )}
                >
                  {message.body}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-1.5 pb-2">
            {suggestions.map((item) => (
              <Button
                key={item}
                variant="ghost"
                size="xs"
                className="text-muted-foreground ring-1 ring-foreground/10"
                onClick={() => send(item)}
              >
                {item === 'Ide baru' && <LightbulbIcon />}
                {item}
              </Button>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="notes" className="py-4 text-xs text-muted-foreground">
          Belum ada catatan untuk bab ini.
        </TabsContent>

        <TabsContent value="comments" className="py-4 text-xs text-muted-foreground">
          Belum ada komentar.
        </TabsContent>
      </Tabs>

      <div className="border-t border-border/60 p-3">
        <div className="rounded-xl bg-background p-2 ring-1 ring-foreground/10">
          <textarea
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault()
                send()
              }
            }}
            rows={3}
            placeholder="Minta AI menulis, merangkum, atau memperbaiki teks…"
            className="w-full resize-none bg-transparent px-1 text-xs leading-relaxed outline-none placeholder:text-muted-foreground"
          />
          <div className="flex justify-end">
            <Button
              size="icon-sm"
              aria-label="Kirim"
              disabled={!draft.trim()}
              onClick={() => send()}
              className="rounded-full bg-foreground text-background hover:bg-foreground/90"
            >
              <ArrowUpIcon />
            </Button>
          </div>
        </div>
        <p className="pt-2 text-center text-[10px] text-muted-foreground">
          AI dapat membuat kesalahan. Periksa kembali hasilnya.
        </p>
      </div>
    </aside>
  )
}
