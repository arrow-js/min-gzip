import { html, nextTick } from '@arrow-js/core'
import store from './store'
import * as monaco from 'monaco-editor'
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import * as editorApi from 'monaco-editor/esm/vs/editor/editor.api'
// @ts-ignore
self.MonacoEnvironment = {
  getWorker(_: any, label: string) {
    if (label === 'json') {
      return new jsonWorker()
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return new htmlWorker()
    }
    if (label === 'typescript' || label === 'javascript') {
      return new tsWorker()
    }
    return new editorWorker()
  },
}

monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true)

export default function editor() {
  const el = html`<div id="editor" class="editor"></div>`

  nextTick(async () => {
    await new Promise((r) => setTimeout(r))
    const editor = editorApi.editor.create(document.getElementById('editor')!, {
      language: 'typescript',
      value: store.code,
    })
    editor.getModel()?.onDidChangeContent(() => {
      store.code = editor.getModel()?.getLinesContent().join('\n') ?? ''
    })
  })

  return el
}
