import { EditorState } from '@codemirror/state'
import { markdown } from '@codemirror/lang-markdown'
import { EditorView } from '@codemirror/view'
import {
  collapseOnSelectionFacet,
  editorTheme,
  livePreviewPlugin,
  markdownStylePlugin,
  mouseSelectingField,
  setMouseSelecting,
  mathPlugin,
  blockMathField
} from 'codemirror-live-markdown'
import {html} from '@codemirror/lang-html'
import {LanguageDescription} from '@codemirror/language'
import {markdownLanguage} from '@codemirror/lang-markdown'

export type MarkdownEditorOptions = {
  /** Element that will host the editor DOM. */
  parent: HTMLElement
  /** Initial document content. */
  doc: string
  /** Called on every document change with the latest content. */
  onChange?: (value: string) => void
}

export type MarkdownEditor = {
  view: EditorView
  getValue: () => string
  destroy: () => void
}

/**
 * Create a CodeMirror 6 editor with Obsidian-style live preview Markdown.
 * Call `destroy()` on unmount to release the view and its listeners.
 */
export function createMarkdownEditor({
  parent,
  doc,
  onChange,
}: MarkdownEditorOptions): MarkdownEditor {
  const view = new EditorView({
    state: EditorState.create({
      doc,
      extensions: [
        markdown({
          base: markdownLanguage,
          codeLanguages: [
            LanguageDescription.of({ // harus dibenerin nih buat fitur underline. Atau ada solusi lain
              name: 'html',
              alias: ['html', 'HTML'],
              support: html(),
            })
          ]
        }),
        mathPlugin,
        blockMathField,
        collapseOnSelectionFacet.of(true),
        mouseSelectingField,
        livePreviewPlugin,
        markdownStylePlugin,
        editorTheme,
        EditorView.lineWrapping,
        EditorView.updateListener.of((update) => {
          if (update.docChanged) onChange?.(update.state.doc.toString())
        }),
      ],
    }),
    parent,
  })

  let destroyed = false

  function setSelecting(selecting: boolean) {
    if (destroyed) return
    view.dispatch({ effects: setMouseSelecting.of(selecting) })
  }

  // Freeze decoration rebuilds while the user drag-selects to avoid flicker.
  const startSelecting = () => setSelecting(true)
  const stopSelecting = () => {
    requestAnimationFrame(() => setSelecting(false))
  }

  view.contentDOM.addEventListener('mousedown', startSelecting)
  document.addEventListener('mouseup', stopSelecting)
  // Release the drag state when the pointer is released outside the window.
  window.addEventListener('blur', stopSelecting)

  return {
    view,
    getValue: () => view.state.doc.toString(),
    destroy: () => {
      destroyed = true
      view.contentDOM.removeEventListener('mousedown', startSelecting)
      document.removeEventListener('mouseup', stopSelecting)
      window.removeEventListener('blur', stopSelecting)
      view.destroy()
    },
  }
}
